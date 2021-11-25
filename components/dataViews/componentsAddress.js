import copy from "copy-to-clipboard";
import {pubkeyToAddress} from "@cosmjs/amino";
import StackableContainer from "../layout/StackableContainer";
import React, { useState } from "react";
import Button from "../inputs/Button";

const ComponentsAddress = (props) => {
    let rows = [];
    console.log(props.pubkeys.length)
    console.log(props.pubkeys[0])
    for (var i = 0; i < props.pubkeys.length; i++){
      rows.push(pubkeyToAddress(props.pubkeys[i], "osmo"));
    }
    const [showTxForm, setShowTxForm] = useState(false);
    const [showCreate, setShowCreate] = useState(true);
    return(
      <StackableContainer>
        {showCreate ? (  
         <StackableContainer lessPadding fullHeight>
          <Button label="Show Component Addresses" onClick={() => {
                    setShowTxForm(true);
                    setShowCreate(false);
                  }} />
         </StackableContainer>) : null  }
         { showTxForm ? (
        <div>
        <h2>Components Address :</h2>
        {/* TODO : Duc do that, add a close, show button */}
        {rows.map(item => (
          <StackableContainer lessPadding lessMargin >
            {item}
          </StackableContainer >
        ))} 
          <button className="remove" onClick={() => {
                    setShowTxForm(false);
                    setShowCreate(true);
                  }}>
           ✕
          </button>
        </div>) : null }        
        <style jsx>{`
          
          span {
            text-align: left;
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
    )
}

export default ComponentsAddress ;