import axios from "axios";
import { coins } from "@cosmjs/launchpad";
import React from "react";
import { withRouter } from "next/router";
import {JSONObject} from "core-js/fn/object"
import Button from "../../components/inputs/Button";
import Input from "../../components/inputs/Input";
import TextAreaInput from "../../components/inputs/TextArea";

import StackableContainer from "../layout/StackableContainer";

class TransactionFormAny extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toAddress: "",
      amount: 0,
      memo: "",
      gas: 200000,
      processing: false,
      addressError: "",
      tx: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  convertCLITransaction = (tx_json_parsed) => {
    let msgValue = {}
    let msg = tx_json_parsed.body.messages[0]
    msgValue["type"] = msg["@type"]
    msgValue["value"] = {}
    for(const key in msg){
      if(key === "type") continue;
      msgValue["value"][key] = msg[key];
    }

    let fee = tx_json_parsed.auth_info.fee;
    msgValue["fee"] = {}
    msgValue["fee"]["gas"] = fee.gas_limit;
    msgValue["fee"]["amount"] = fee.amount;

    return msgValue;
  }

  createTransaction = () => { 
    let tx_json_parsed = JSON.parse(this.state.tx);
    var msgValue;
    var type;
    var fee;
    if("msgs" in tx_json_parsed){
      msgValue = tx_json_parsed.msgs[0].value;
      type = tx_json_parsed.msgs[0].type; 
      fee = tx_json_parsed.fee
    }else{
      let msg = this.convertCLITransaction(tx_json_parsed);
      msgValue = msg.value;
      type = msg.type;
      fee = msg.fee;
    }

    console.log(msgValue)

    msgValue.fromAddress = msgValue.from_address;
    msgValue.toAddress = msgValue.to_address;

    msgValue.delegatorAddress = this.props.address;

    console.log(msgValue)

    if(type === 'cosmos-sdk/MsgWithdrawDelegationReward' || type === '/cosmos.staking.v1beta1.MsgWithdrawDelegationReward'){
      type = '/cosmos.staking.v1beta1.MsgWithdrawDelegationReward';
      msgValue.validatorAddress = msgValue.validator_address;

      delete msgValue.validator_address;
    }
    else if(type === 'cosmos-sdk/MsgDelegate' || type === '/cosmos.staking.v1beta1.MsgDelegate'){
      type = '/cosmos.staking.v1beta1.MsgDelegate';
      msgValue.validatorAddress = msgValue.validator_address;
        
      delete msgValue.validator_address;
    }
    else if(type === 'cosmos-sdk/MsgSend' || type === '/cosmos.bank.v1beta1.MsgSend'){
      type = '/cosmos.bank.v1beta1.MsgSend'
    } 
    else if(type === 'cosmos-sdk/MsgUndelegate' || type === '/cosmos.staking.v1beta1.MsgUndelegate'){
      type = '/cosmos.staking.v1beta1.MsgUndelegate'
      msgValue.validatorAddress = msgValue.validator_address;

      delete msgValue.validator_address;
    }
    else if(type === 'cosmos-sdk/MsgBeginRedelegate' || type === '/cosmos.staking.v1beta1.MsgBeginRedelegate'){
      type = '/cosmos.staking.v1beta1.MsgBeginRedelegate'
      msgValue.validatorAddress = msgValue.validator_address;
      msgValue.validatorSrcAddress = msgValue.validator_src_address
      msgValue.validatorDstAddress = msgValue.validator_dst_address

      delete msgValue.validator_src_address, msgValue.validator_dst_address, msgValue.validator_address
    }
    else {
      this.setState({ addressError: "Use a valid transaction" });
    }

    const msg = {
      value: msgValue,
      typeUrl : type,
    };

    return {
      accountNumber: this.props.accountOnChain.accountNumber,
      sequence: this.props.accountOnChain.sequence,
      chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
      msgs: [msg],
      fee: fee,
      memo: this.state.memo,
    };
  };
  
  handleCreate = async () => {
    if (this.state.tx.length != 43) {
      this.setState({ processing: true });
      const tx = this.createTransaction();
      console.log(tx);
      const dataJSON = JSON.stringify(tx);
      const res = await axios.post("/api/transaction", { dataJSON });
      const { transactionID } = res.data;
      this.props.router.push(
        `${this.props.address}/transaction/${transactionID}`
      );
    } else {
      this.setState({ addressError: "Use a valid osmosis address" });
    }
  };

  render() {
    return (
      <StackableContainer lessPadding>
        <button className="remove" onClick={this.props.closeForm}>
          ✕
        </button>
        <h2>Import transaction</h2>
        <div className="form-item">
          <TextAreaInput
            label="Transactions"
            name="tx"
            value={this.state.tx}
            onChange={this.handleChange}
            error={this.state.addressError}
            placeholder="paste your transaction here"
          />
        </div>
        <Button label="Create Transaction" onClick={this.handleCreate} />
        <style jsx>{`
          p {
            margin-top: 15px;
          }
          .form-item {
            margin-top: 1.5em;
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
  }
}

export default withRouter(TransactionFormAny);
