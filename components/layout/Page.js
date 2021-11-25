import Head from "../head";
import StackableContainer from "./StackableContainer";

const Page = (props) => {
  return (
    
    <div className="page">
      <div className="logo">
        <a href="/"><img src="https://app.osmosis.zone/public/assets/main/osmosis-logo-main.svg" /></a>
      </div>
      <Head title={props.title || "Osmosis Multisig Manager"} />
      <div className="container">
        {props.rootMultisig && (
          <div className="nav">
            <StackableContainer base lessPadding lessMargin>
              <p>
                <a href={`/multi/${props.rootMultisig}`}>
                  ← Back to multisig account
                </a>
              </p>
            </StackableContainer>
          </div>
        )}
        {props.children}
      </div>
      <div className="footer-links">
        <StackableContainer base lessPadding lessMargin>
          <p>
            <a href="https://github.com/notional-labs/cosmoshub-legacy-multisig/tree/osmosis-modification">
              View on github
            </a>
          </p>
        </StackableContainer>
      </div>
      <style jsx>{`
        .page {
          display: flex;
          justify-content: center;
          padding: 100px 0;
        }
        .container {
          position: relative;
        }
        .nav {
          position: absolute;
          top: -40px;
          left: 0;
          display: flex;
        }
        a,
        a:visited {
          color: white;
        }
        .footer-links {
          position: fixed;
          bottom: 20px;
          right: 20px;
        }
        .logo
        {
          position: fixed;
          top: 15px;
          left: 15px;
        }
       
      `}</style>
      <style global jsx>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          color: white;
          min-height: 100vh;
          background-image: url("https://i.imgur.com/v4EIRIW.png"), url("https://app.osmosis.zone/public/assets/backgrounds/osmosis-home-bg-pattern.svg?fbclid=IwAR19OkrUiYrMc-aEVJrzHR4KLQrGIeQ0LIaR6Az6JmROPHdviV5wi38x9cg"),linear-gradient(280deg, #050628, #15163C);
          background-position:  left bottom;
          background-repeat: no-repeat,repeat, repeat;
          font-size: 16px;
          margin: 0;
        }
        * {
          box-sizing: border-box;
        }
        *:focus {
          outline: none;
        }
        button {
          cursor: pointer;
        }
        h1 {
          margin: 0;
          font-weight: 400;
          line-height: 1.15;
          font-size: 1.4em;
          text-align: center;
        }
        h2 {
          font-size: 1.25em;
          font-weight: 400;
          margin: 0;
        }
        h3 {
          font-size: 1em;
          font-style: italic;
          font-weight: bold;
          margin: 0;
        }
        p {
          max-width: 350px;
          margin: 0;
          font-size: 12px;
          font-style: italic;
          line-height: 14px;
        }
        
      `}</style>
    </div>
  );
};

export default Page;
