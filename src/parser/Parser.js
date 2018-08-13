import { TrimWhiteSpaces, TrimLeadingZeroes, RemoveThousandSeparators, RemoveCurrencyPrefix, CheckThousandSeparatorsValidity, CheckAndRemoveDecimalValue } from './ParserPipes';

const Parse = (value) => {
    if (!value) return null;

    // Parse value
    try {
        value = ParseForPossibleCanonicalEquivalents(value);
    }
    catch(e) {
        return null;
    }

    // Value can't be empty string
    if(value.trim() == "") return null;

    // Check if value is a valid javascript number
    if(isNaN(value)) return null;

    // Parse to number
    let result = +value;

    // Check if result has decimal value
    if(result %1 != 0) return null;

    return result;
}

const ParseForPossibleCanonicalEquivalents = (value) => {
    // Functions to parse value
    let pipes = [
        TrimWhiteSpaces,
        TrimLeadingZeroes,
        CheckAndRemoveDecimalValue,
        CheckThousandSeparatorsValidity,
        RemoveThousandSeparators
    ];

    // Run the value through functions
    for(let pipe of pipes)
    {
        value = pipe(value);
    }

    // If value is still not a number, check for currency prefix
    if(isNaN(value)) 
    {
        value = RemoveCurrencyPrefix(value);
    }

    return value;
}

// End of Pipes
export default {
    Parse
}