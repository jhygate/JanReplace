import re


def reformat_swift_text(input_text):
    transformations = [
        # Replace "--------------- EVENT DETAILS -------------------"
        # (r"((-|—)+)( *)EVENT DETAILS( *)((-|—)+)", "+++ EVENT DETAILS +++"),

        # Replace ".-------------------"
        # (r"\.((-|—)+)", "."),

        # Delete all ":70E::ADTX//" fields
        # (r":\d{2}\w::\w{4}\/\/", ""),

        # Delete "INFORMATION SOURCE: AGENT, [REDACTED], LONDON"
        # (r"INFORMATION SOURCE: AGENT, \[REDACTED\], LONDON\r?\n", ""),

        # Replace "--------------- ACTION TO BE TAKEN -------------------"
        # (r"((-|—)+)( *)ACTION TO BE TAKEN( *)((-|—)+)", """+++ INSTRUCTION REQUIREMENTS +++\n.\nMINIMUM TO EXERCISE:\nMULTIPLE TO EXERCISE:\n.\nANY RESPONSE RECEIVED THAT IS NOT IN THE CORRECT MULTIPLE, AS STIPULATED UNDER THE FULL EVENT TERMS, WILL BE ROUNDED DOWN AND APPLIED TO THE NEAREST WHOLE MULTIPLE. THE DIFFERENCE BETWEEN THE QUANTITY INSTRUCTED VERSUS THE AMOUNT APPLIED WILL REMAIN UNINSTRUCTED."""),

        # Delete fields starting with specific text
        (r"BY SENDING AN INSTRUCTION, YOU AUTHORISE US TO DISCLOSE YOUR NAME AND ACCOUNT NUMBER\r?\n", ""),

        
    ]

    for pattern, replacement in transformations:
        new_text = re.sub(pattern, replacement, input_text, flags=re.DOTALL)
        if new_text != input_text:
            matches = re.findall(pattern, input_text, flags=re.DOTALL)
            for match in matches:
                print(f"Replaced: \n {match}\n\n with  \n\n{replacement} ")
                print("---------------------")
            input_text = new_text

    return input_text


# Example usage
if __name__ == "__main__":
    with open("input_text.txt", "r") as input_file:
        input_text = input_file.read()
    
    reformatted_text = reformat_swift_text(input_text)
    
    with open("output_text.txt", "w") as output_file:
        output_file.write(reformatted_text)