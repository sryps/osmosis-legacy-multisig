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
        <h2>Components Address :</h2>
        {/* TODO : Duc do that, show each element of row array  */}
            {rows.map(item => <StackableContainer rows />)} 
        <style jsx>{`
          span {
            text-align: center;
          }
        `}</style>
      </StackableContainer>
    )
}

export default ComponentsAddress;