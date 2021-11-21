/**
 * check if address is valid
 * @param {String} address 
 */
const checkAddressOsmoValid = (address) => {
    // check by length of address
    // 43 is the length of osmosis address
    if(address.length === 43){
        return true;
    }

    return false;
}

/**
 * check if validator address is valid
 * @param {String} address 
 */
const checkValidatorAddressOsmoValid = (address) => {
    // 50 is the length of osmosis validator
    if(address.length === 50){
        return true;
    }

    return false;
}

export {checkAddressOsmoValid, checkValidatorAddressOsmoValid};