import React, { useState } from "react";
import { StargateClient } from "@cosmjs/stargate";
import { useRouter } from "next/router";

import Button from "../../../components/inputs/Button";
import { getMultisigAccount } from "../../../lib/multisigHelpers";
import HashView from "../../../components/dataViews/HashView";
import MultisigHoldings from "../../../components/dataViews/MultisigHoldings";
import MultisigMembers from "../../../components/dataViews/MultisigMembers";
import Page from "../../../components/layout/Page";
import StackableContainer from "../../../components/layout/StackableContainer";
import TransactionForm from "../../../components/forms/TransactionForm";
import TransactionFormAny from "../../../components/forms/TransactionFormAny";

import TransactionList from "../../../components/dataViews/TransactionList";

export async function getServerSideProps(context) {
  let holdings;

  try {
    const client = await StargateClient.connect(
      process.env.NEXT_PUBLIC_NODE_ADDRESS
    );
    const multisigAddress = context.params.address;

    const accountOnChain = await getMultisigAccount(multisigAddress, client);
    if(accountOnChain.pubkey.type != "tendermint/PubKeyMultisigThreshold"){
      return {
        props: { error: "This is not a multisig address"}
      }
    }

    holdings = await client.getBalance(
      multisigAddress,
      process.env.NEXT_PUBLIC_DENOM
    );

    return {
      props: { accountOnChain, holdings: holdings.amount / 1000000 },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { error: error.message},
    };
  }
}

const multipage = (props) => {
  const [showTxForm, setShowTxForm] = useState(false);
  const [showTxForm1, setShowTxForm1] = useState(false);
  const [showCreate, setShowCreate] = useState(true);

  const router = useRouter();
  const { address } = router.query;
  return (
    <Page>
      <StackableContainer base>
        <StackableContainer>
          <label>Multisig Address</label>
          <h1>
            <HashView hash={address} />
          </h1>
        </StackableContainer>
        {props.error && (
          <StackableContainer>
            <div className="multisig-error">
              <p>
                This multisig address's pubkeys are INVALID or UNAVAILABLE, and so it
                cannot be used with this tool.
              </p>
              <p>
                You can recreate it with this tool here, or sign and broadcast a
                transaction with the tool you used to create it. Either option
                will make the pubkeys accessible and will allow this tool to use
                this multisig fully.
              </p>
            </div>
          </StackableContainer>
        )}
        <br/>
        <div>
          <MultisigHoldings holdings={props.holdings} />
        </div>
        {showTxForm ? (
          <TransactionForm
            address={address}
            accountOnChain={props.accountOnChain}
            holdings={props.holdings}
            closeForm={() => {
              setShowTxForm(false);
              setShowCreate(true);
            }}
          />
        ) : (
          <div></div>
        )}
        {showTxForm1 ? (
          <TransactionFormAny
            address={address}
            accountOnChain={props.accountOnChain}
            holdings={props.holdings}
            closeForm={() => {
              setShowTxForm1(false);
              setShowCreate(true);
            }}
          />
        ) : (
          <div></div>
        )}

        {showCreate ? (
          <div className="interfaces">
            <div className="col-1">
              <StackableContainer lessPadding>
                <h2>New transaction</h2>
                <p>
                  Once a transaction is created, it can be signed by the
                  multisig members, and then broadcast.
                </p>
                <Button
                  label="Create Transaction"
                  onClick={() => {
                    setShowTxForm(true);
                    setShowCreate(false);
                  }}
                />
              </StackableContainer>
            </div>
            <div className="col-2">
              <StackableContainer lessPadding>
                <h2>Import transaction</h2>
                <p>
                  Import an already generated transaction
                </p>
                <br/>
                <Button
                  label="Import Transaction"
                  onClick={() => {
                    setShowTxForm1(true);
                    setShowCreate(false);
                  }}
                />
              </StackableContainer>
            </div>
          </div>
        ):(
          <div></div>
        )}
      </StackableContainer>
      <style jsx>{`
        .interfaces {
          display: flex;
          justify-content: space-between;
          margin-top: 50px;
        }
        .col-1 {
          flex: 1;
          padding-right: 50px;
        }
        .col-2 {
          flex: 1;
        }
        label {
          font-size: 12px;
          font-style: italic;
        }
        p {
          margin-top: 15px;
        }
        .multisig-error p {
          max-width: 550px;
          color: red;
          font-size: 16px;
          line-height: 1.4;
        }
        .multisig-error p:first-child {
          margin-top: 0;
        }
      `}</style>
    </Page>
  );
};

export default multipage;
