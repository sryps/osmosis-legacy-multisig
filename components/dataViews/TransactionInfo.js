import HashView from "./HashView";
import StackableContainer from "../layout/StackableContainer";

const uatomToAtom = (uatom) => {
  return uatom / 1000000;
};

class TransactionInfo extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    const props = this.props;
    if (props.tx.msgs[0].typeUrl == "/cosmos.bank.v1beta1.MsgSend"){
      return(
        <StackableContainer lessPadding lessMargin>
      <ul className="meta-data">
        {props.tx.msgs && (
          <li>
            <label>Amount:</label>
            <div>{uatomToAtom(props.tx.msgs[0].value.amount[0].amount)} OSMO</div>
          </li>
        )}
        {props.tx.msgs && (
          <li>
            <label>To:</label>
            <div title={props.tx.msgs[0].value.toAddress}>
              <HashView hash={props.tx.msgs[0].value.toAddress} />
            </div>
          </li>
        )}
        {props.tx.fee && (
          <li>
            <label>Gas:</label>
            <div>{props.tx.fee.gas} UOSMO</div>
          </li>
        )}
        {props.tx.memo && (
          <li>
            <label>Memo:</label>
            <div>{props.tx.memo}</div>
          </li>
        )}
      </ul>
      <style jsx>{`
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .meta-data li {
          margin-top: 10px;
          background: rgba(255, 255, 255, 0.03);
          padding: 6px 10px;
          border-radius: 8px;
          display: flex;
          align-items: center;
        }
        .meta-data li:first-child {
          margin-top: 0;
        }
        .meta-data label {
          font-size: 12px;
          background: rgba(255, 255, 255, 0.1);
          padding: 3px 6px;
          border-radius: 5px;
          display: block;
        }
        .meta-data li div {
          padding: 3px 6px;
        }
      `}</style>
    </StackableContainer>
      )
    }else{
      return(
        <StackableContainer lessPadding lessMargin>
        <ul className="meta-data">
          <h2>Transaction Info</h2>
          {props.tx.msgs && (
            <li>
              <label>MsgType</label>
              <div><pre>{JSON.stringify(props.tx.msgs[0].typeUrl, null, 1)}</pre></div>
            </li>
          )}
          {props.tx.msgs && (
            <li>
              <label>Msg Value:</label>
              <div><pre>{JSON.stringify(props.tx.msgs[0].value, null, 1).replace("{\n", "").replace("\n}", "")}</pre></div>
            </li>
          )}
          {props.tx.fee && (
            <li>
              <label>Fee:</label>
              <div><pre>{JSON.stringify(props.tx.fee, null, 1).replace("{\n", "").replace("\n}", "")}</pre></div>
            </li>
          )}
          {props.tx.memo && (
            <li>
              <label>Memo:</label>
              <div>{props.tx.memo}</div>
            </li>
          )}
        </ul>
        <style jsx>{`
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .meta-data li {
            margin-top: 10px;
            background: rgba(255, 255, 255, 0.03);
            padding: 6px 10px;
            border-radius: 8px;
            display: dynamic;
            align-items: left;
            font-size: 12px;
          }
          .meta-data li:first-child {
            margin-top: 0;
          }
          .meta-data label {
            font-size: 14px;
            background: rgba(255, 255, 255, 0.1);
            padding: 3px 6px;
            border-radius: 5px;
            display: block;
          }
          .meta-data li div {
            padding: 3px 6px;
          }
        `}</style>
      </StackableContainer>
      )
    }
  }
}

export default TransactionInfo;

