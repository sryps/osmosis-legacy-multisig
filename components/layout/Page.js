import Head from "../head";
import StackableContainer from "./StackableContainer";

const Page = (props) => {
  return (
    <div className="page">
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
            <a href="https://github.com/notional-labs/cosmoshub-legacy-multisig">
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
      `}</style>
      <style global jsx>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          color: white;
          min-height: 100vh;
          background-image: url("https://lh3.googleusercontent.com/1JWuhZ50Iaxuse6jP7kHo5Xj160SEsOKJfQCEJUVudGoEKREghu3ut0GgoBgE6jhLaf6dnRPxXtuSYDachvRCcjnNihQTpybCrRTF7sxSGZGz2_nTLAv4TgW5YHzNvUbHllPaiuYhBxbYFsEphPh-TlxX3nUjOG1IkETV-wO03wtaI4xGcoG_Y8OUULrlD_yujaGAsnQf8NUsxjsj129SNhr7h5lIe8sbnDxhPx7EwUvagFiLBh0RBGLpV_3M4KMEllzjzlVK3YyIttFQOb6QAssNa8nWdeF6bysem4-2mizWvFRgbvGmIh6aVgGJVohVHo5zzLpxYNAEi4k_WQ2v4Rdgd2c_CyV0z3L8m1kYecWlZWMpmHQgkhvE4ySye3lmwUgnFKkrpz51744JRK4M8oH7OV8ZfqmnBTt9suIk7gNfqfmhezTvURhS7kCz-wkmh2cFISjbrs3R5c3_SU6AFKaWrgWxeE-kmo3YXByTfBMPjIL83Jizn-AceXXA9ttG8XtIzOTe5ByzXlUVHD_4esmMgSEy21ASCBM3KuvszUYVPz_I-aaImliJTHrSwjaN2cI1hI6Jg335WAUi5Y1CG7w5KRDqpA59T8ceJHW8Fz5uyrxkXziVVPryzFGcPYyllNzCNv67lxeVgNi6wOAZJ-x4SrjdOr74kbcIhmIFWbcI7YgsNxuyMxiE9cpvYdgYyM-0JUQnT5ym5uWsemf4OCh=w584-h630-no?authuser=0"), url("https://app.osmosis.zone/public/assets/main/osmosis-logo-main.svg"),url("https://app.osmosis.zone/public/assets/backgrounds/osmosis-home-bg-pattern.svg?fbclid=IwAR19OkrUiYrMc-aEVJrzHR4KLQrGIeQ0LIaR6Az6JmROPHdviV5wi38x9cg"),linear-gradient(280deg, #050628, #15163C);
          background-position:  left bottom, left top;
          background-repeat: no-repeat, no-repeat,repeat, repeat;
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
