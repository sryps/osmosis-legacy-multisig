import StackableContainer from "../layout/StackableContainer";

const JsonCosmosTransaction = (props) => {
   return (
    <StackableContainer lessPadding fullHeight>
      <h2>JsonTransactionCosmosForm</h2>
      <StackableContainer lessPadding lessMargin>
        {props.tx.msgs && (
            <div><pre>{JSON.stringify(props.tx, null, 1)}</pre></div>
        )}
        </StackableContainer>
      <style jsx>{`
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .meta-data div {
          margin-top: 10px;
          background: rgba(255, 255, 255, 0.03);
          padding: 6px 10px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          font-size: 12px;

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
        .meta-data li pre {
          font-size: 12px;
          padding: 3px 19px;
        }
      `}</style>
    </StackableContainer>
  );
};
export default JsonCosmosTransaction;
