import copy from "copy-to-clipboard";
import {pubkeyToAddress} from "@cosmjs/amino";
import StackableContainer from "../layout/StackableContainer";

const ComponentsAddress = (props) => {
    let rows = [];
    console.log(props.pubkeys.length)
    console.log(props.pubkeys[0])
    for (var i = 0; i < props.pubkeys.length; i++){
        rows.push(pubkeyToAddress(props.pubkeys[i], "osmo"));
    }

    return(
        <StackableContainer>
        <button className="remove" >
          ✕
        </button>
        <style>{`
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
          }`}
            </style>
        <h2>Components Address :</h2>
        {/* TODO : Duc do that, show each element of row array and add a close, show button */}
            {rows.map(item => <StackableContainer rows />)} 
        <style jsx>{`
          span {
            text-align: left;
        `}</style>
      </StackableContainer>
    )
}

export default ComponentsAddress ;