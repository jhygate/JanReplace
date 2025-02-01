function updateLineNumbers(text, lineNumbersElement) {
    const lines = text.split('\n');
    const lineNumberContent = lines.map((_, index) => `${index + 1}`).join('\n');
    lineNumbersElement.textContent = lineNumberContent;
}

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

    // Define regex replacements
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
APPLIED WILL REMAIN UNINSTRUCTED.` }, // New replacement rule
        { find: /THE\s+ABOVE\s+IS\s+GUIDANCE\s+ONLY\.\s+YOU\s+ARE\s+SOLELY\s+RESPONSIBLE\s+TO\s+DETERMINE\s+WHETHER\s+TO\s+SEND\s+ONE\s+INSTRUCTION\s+PER\s+BENEFICIAL\s+OWNER\s+OR\s+NOT\.\s+WE\s+WILL\s+FORWARD\s+BUT\s+NOT\s+VALIDATE\s+ANY\s+INSTRUCTION\s+RECEIVED\s+REGARDLESS\s+IF\s+YOU\s+SENT\s+IT\s+SEPARATELY\s+PER\s+BENEFICIAL\s+OWNER\s+OR\s+NOT\./g, replace: "" } // New replacement rule




    ];

    // (r"((-|—)+)( *)EVENT DETAILS( *)((-|—)+)", "+++ EVENT DETAILS +++"),

    let convertedText = inputText;
    const lines = inputText.split('\n'); // Split input into lines

    // Apply replacements line by line
    const outputLines = lines.map((line, index) => {
        let updatedLine = line;

        replacements.forEach(({ find, replace }) => {
            const matches = [...updatedLine.matchAll(find)];
            if (matches.length > 0) {
                matches.forEach(match => {
                    // Add to log with line number
                    const logItem = document.createElement('li');
                    logItem.textContent = `Line ${index + 1}: Replaced "${match[0]}" with "${replace}"`;
                    logList.appendChild(logItem);
                });
            }
            // Replace text in the current line
            updatedLine = updatedLine.replace(find, replace);
        });

        return updatedLine;
    });

    // Update the output text and line numbers
    const outputText = outputLines.join('\n');
    outputTextElement.value = outputText;
    updateLineNumbers(outputText, outputLineNumbers);
});
