export const ExtractNumberIncludingThousandSeparators = (value) => {
    if (!value) return null;

    let regexGroupForPrefix = "^(?:Rp|Rp.)?(?:\\s*)?(?:0*)";
    let regexGroupForMainValue = "(\\d+|\\d{1,3}(?:\\.\\d{3})+)";
    let regexGroupForSuffix = "(?:,00)?$";

    // Use Regex to find the number with thousand separator included
    let regex = new RegExp(regexGroupForPrefix + regexGroupForMainValue + regexGroupForSuffix);
    let result = value.match(regex);

    // Return null if no match found
    if(result == null) return null;

    // Return only the main value with thousand separator if any
    return result[1];
}

export const ParseToNumber = (value) => {
    if (!value) return null;
    
    // Remove thousand separators
    value =  value.replace(/\./g, "");

    // Try to parse to number
    try {
        return +value;
    }
    catch(e) {
        return null;
    }
}