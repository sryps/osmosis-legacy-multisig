import StackableContainer from "../layout/StackableContainer";
import CopyAndPaste from "./CopyAndPaste";

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
      <h2>JsonTransactionCosmosForm <CopyAndPaste copyText={JSON.stringify(props.tx, null, 1)} /></h2>
      <StackableContainer lessPadding lessMargin>
        {props.tx.msgs && (
          
            <div><pre>{JSON.stringify(convertKelprTransaction(props.tx), null, 1)}</pre></div>

        )}
      <style jsx>{`
            font-size: 13px;
            padding: 0;
            margin: 0;
            hash-view {
                display: flex;
            }
      `}</style>
        </StackableContainer>
    </StackableContainer>
  );
};
export default JsonCosmosTransaction;
