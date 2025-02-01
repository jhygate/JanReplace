document.getElementById('inputText').addEventListener('input', () => {
    const inputText = document.getElementById('inputText');
    const inputLineNumbers = document.getElementById('inputLineNumbers');
    updateLineNumbers(inputText.value, inputLineNumbers);
});

document.getElementById('convertButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const logList = document.getElementById('logList');
    const outputLineNumbers = document.getElementById('outputLineNumbers');
    const outputTextElement = document.getElementById('outputText');

    logList.innerHTML = ''; // Clear previous log entries

    // Define regex replacements using RegExp
    const replacements = [
        { find: /\.((-|—)+)/g, replace: "" },
        { find: /((-|—)+)( *)EVENT DETAILS( *)((-|—)+)/g, replace: "+++ EVENT DETAILS +++" },
        { find: /INFORMATION SOURCE:.*(\r?\n)?/g, replace: "" },
        { find: /\.\n\./g, replace: "." },
        { find: /:\d{2}\w::\w{4}\/\//g, replace: "" },
        { find: /-*\s*ACTION TO BE TAKEN\s*-*/g, replace: `+++ INSTRUCTION REQUIREMENTS +++
.
MINIMUM TO EXERCISE:
MULTIPLE TO EXERCISE:
.
ANY RESPONSE RECEIVED THAT IS NOT IN THE CORRECT MULTIPLE, AS STIPULATED UNDER
THE FULL EVENT TERMS, WILL BE ROUNDED DOWN AND APPLIED TO THE NEAREST WHOLE
MULTIPLE. THE DIFFERENCE BETWEEN THE QUANTITY INSTRUCTED VERSUS THE AMOUNT
APPLIED WILL REMAIN UNINSTRUCTED.` },
        { find: /THE\s+ABOVE\s+IS\s+GUIDANCE\s+ONLY\.\s+YOU\s+ARE\s+SOLELY\s+RESPONSIBLE\s+TO\s+DETERMINE\s+WHETHER\s+TO\s+SEND\s+ONE\s+INSTRUCTION\s+PER\s+BENEFICIAL\s+OWNER\s+OR\s+NOT\.\s+WE\s+WILL\s+FORWARD\s+BUT\s+NOT\s+VALIDATE\s+ANY\s+INSTRUCTION\s+RECEIVED\s+REGARDLESS\s+IF\s+YOU\s+SENT\s+IT\s+SEPARATELY\s+PER\s+BENEFICIAL\s+OWNER\s+OR\s+NOT\./gs, replace: "" },
        { find: /ELECTRONIC\s+INSTRUCTIONS:.*?70E:INST:\s+YOUR\s+CONTACT\s+NAME\s+AND\s+PHONE\s+NUMBER[^.]*\./gs, replace: "" },
        { find: /^\s*[\r\n]/gm, replace: "" }   , 
        { find: /\s*\.\s*(\n\s*\.\s*)+/gs, replace: ".\n" }
    ];

    let convertedText = inputText;

    // Apply replacements
    replacements.forEach(({ find, replace }) => {
        const matches = [...convertedText.matchAll(find)];
        if (matches.length > 0) {
            matches.forEach(match => {
                // Add to log with line number
                const logItem = document.createElement('li');
                logItem.textContent = `Replaced "${match[0]}" with "${replace}"`;
                logList.appendChild(logItem);
            });
        }
        // Replace text in the entire input
        convertedText = convertedText.replace(find, replace);
    });

    // Update the output text and line numbers
    outputTextElement.value = convertedText;
    updateLineNumbers(convertedText, outputLineNumbers);
});