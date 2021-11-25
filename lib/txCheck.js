const addressExtraction = ["validator_address", "delegator_address", "from_address", "to_address", "validator_src_address", "validator_dst_address"]
const addressConversion = ["validatorAddress", "delegatorAddress", "fromAddress", "toAddress", "validatorSrcAddress", "validatorDstAddress"]

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

const checkMsg = (msgValue) => {
    // check batch address to see if they are legit
    for (const address of addressExtraction) {
        if(!(address in msgValue)) continue;
  
        if(address.includes("validator"))
          if(!checkValidatorAddressOsmoValid(msgValue[address])){
            throw new Error("Invalid field " + address + ". Please Check Again!");
          }else{
            continue;
          }
  
  
        if(!checkAddressOsmoValid(msgValue[address])){
          //pop up invalid form to user
          throw new Error("Invalid field " + address + ". Please Check Again!");
        }
    }
}

export {
    checkAddressOsmoValid, 
    checkValidatorAddressOsmoValid, 
    checkMsg,
    addressExtraction,
    addressConversion,
}