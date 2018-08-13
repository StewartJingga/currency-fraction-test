const ALLOWED_PREFIX_FORMATS = [
    "Rp", "Rp ", "Rp.", "Rp. ",
    "RP", "RP ", "RP.", "RP. ",
    "IDR", "IDR ", 
];

/**
  * Returns a modified value that has been trimmed.
  * @param value A string value.
  */
export const TrimWhiteSpaces = (value) => {
    return value.trim();
}

/**
  * Returns a modified value that has leading zeroes trimmed.
  * @param value A string value.
  */
export const TrimLeadingZeroes = (value) => {
    return value.trimLeft('0');
}


/**
  * Check if value has valid decimal separator format.
  * Returns a modified value with decimal separators replaced with ".".
  * @param value A string value.
  */
 export const CheckAndRemoveDecimalValue = (value) => {
    let list = value.split(",");

    // Check if decimal separators is more than one
    if(list.length > 2) throw "Invalid Decimal Format";

    // Has decimal value
    if(list.length > 1) { 
        // Check if decimal value is empty string
        if(list[1] == "") throw "Invalid Decimal Format";
        // Check if decimal value is not 0 or a repetition of 0
        if(list[1].replace(/0/g, "") != "") throw "Invalid Decimal Format";
    }

    return list[0];
}

/**
  * Check if value has valid thousand separator placements.
  * @param value A string value.
  */
 export const CheckThousandSeparatorsValidity = (value = "a") => {
    let list = value.split(".");

    if(list.length > 1) {
        for(let i = 1; i < list.length; i++)
        {
            if(i == (list.length - 1)) { // Last value in array
                // Check for 
            }
            if(list[i].length != 3) throw "Invalid Thousand Separator Placements";
        }
    }

    return value;
}

/**
  * Returns a modified value with no thousand separators.
  * @param value A string value.
  */
export const RemoveThousandSeparators = (value) => {
    return value.replace(".", "");
}

/**
  * Returns a modified value with currency prefix removed.
  * @param value A string value.
  */
export const RemoveCurrencyPrefix = (value) => {
    for(let i = 2; i <= 4; i++)
    {
        let substring = value.substr(0, i);
        if(ALLOWED_PREFIX_FORMATS.indexOf(substring) > -1)
        {
            value = value.substring(i, value.length);
            break;
        }
    }

    return value;
}