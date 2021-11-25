import StackableContainer from "../layout/StackableContainer";
import CopyAndPaste from "./CopyAndPaste";
import React from "react";

const addressConversion = ["validator_address", "delegator_address", "from_address", "to_address", "validator_src_address", "validator_dst_address"]
const addressExtraction = ["validatorAddress", "delegatorAddress", "fromAddress", "toAddress", "validatorSrcAddress", "validatorDstAddress"]

const convertKelprTransaction = (transaction) => {
  let cosmos_tx = {};
  let body = {};
  let auth_info = {};
  let msgValue = {};
  let msg = transaction.msgs[0]
  msgValue["@type"] = msg["typeUrl"]

  for(const key in msg.value){
    if(key === "type") continue;
    msgValue[key] = msg.value[key];

    for(let i = 0; i < addressConversion.length; i++){
      if(!(addressExtraction[i]==key)) continue;
      msgValue[addressConversion[i]] = msgValue[addressExtraction[i]];
      
      delete msgValue[addressExtraction[i]];
    }
  }
  body["messages"] = [msgValue];
  body["memo"] = transaction.memo;
  body["timeout_height"] = "0";
  body["extension_options"]= [];
  body["non_critical_extension_options"] = [];

  console.log(body)
  auth_info["signer_infos"] = [];
  auth_info["fee"] = {}
  auth_info["fee"]["amount"] = transaction.fee.amount;
  auth_info["fee"]["gas_limit"] = transaction.fee.gas;
  auth_info["fee"]["payer"] = "";
  auth_info["fee"]["granter"] = "";

  cosmos_tx["body"] = body;
  cosmos_tx["auth_info"] = auth_info;
  cosmos_tx["signatures"] = [];

  return cosmos_tx
}


const JsonCosmosTransaction = (props) => {
   return (
     
    <StackableContainer lessPadding fullHeight>
      
      <div className="hash-view">
      <h2>JsonCosmosTransaction</h2>
      <div className="button-view">
        <CopyAndPaste copyText={JSON.stringify(convertKelprTransaction(props.tx), null, 1)} />
        </div>
      </div>
      <StackableContainer lessPadding lessMargin className="context">
        {props.tx.msgs && (
           <div className="context"><pre>{JSON.stringify(convertKelprTransaction(props.tx), null, 1)}</pre></div>
        )}
        <button className="remove">
          ✕
        </button>
        </StackableContainer>
        <style jsx>{`
            padding: 0;
            margin: 0;
            hash-view {
                display: flex;
            }.hash-view {
              display: flex;
              font-size:20px;

            }.button-view{
              margin-left:auto;
            }.context{
              font-size:12px;
            }
            button.remove {
              background: rgba(255, 255, 255, 0.2);
              width: 30px;
              height: 30px;
              border-radius: 50%;
              border: none;
              color: white;
              position: absolute;
              right: 10px;
              top: 10px;
            }
      `}</style>
    </StackableContainer>
  );
};
export default JsonCosmosTransaction;
