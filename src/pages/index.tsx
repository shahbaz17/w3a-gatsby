import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Web3Auth } from "@web3auth/modal";

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};
const headingAccentStyles = {
  color: "#663399",
};
const buttonStyle = {
  color: "#232129",
  backgroundColor: "#fff",
  border: "1px solid #232129",
  fontFamily: "system-ui, sans-serif",
  fontWeight: 600,
  fontSize: 16,
  padding: "12px 24px",
  borderRadius: 4,
  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
  textDecoration: "none",
  marginTop: 24,
  marginBottom: 12,
  display: "inline-block",
  position: "relative" as "relative",
  top: -2,
};

const IndexPage: React.FC<PageProps> = () => {
  const [web3auth, setWeb3auth] = React.useState<Web3Auth | null>(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<any | null>(null);
  const [privateKey, setPrivateKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId:
            "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ", // Get your Client ID from the Web3Auth Dashboard
          web3AuthNetwork: "sapphire_mainnet", // Web3Auth Network
          chainConfig: {
            chainNamespace: "other",
            chainId: "0x1",
            rpcTarget: "https://s.altnet.rippletest.net:51234",
            displayName: "XRPL",
            blockExplorer: "https://testnet.xrpl.org",
            ticker: "XRP",
            tickerName: "XRP",
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const signIn = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.connect();
  };

  const signOut = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setLoggedIn(false);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const userInfo = await web3auth.getUserInfo();
    setUserInfo(userInfo);
    console.log(userInfo);
  };

  const getPrivateKey = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const provider = await web3auth.provider;
    const privateKey = await provider?.request({
      method: "private_key",
    });
    setPrivateKey(privateKey as string);
    console.log(privateKey);
  };

  return (
    <main style={pageStyles}>
      {loggedIn ? (
        <>
          <button style={buttonStyle} onClick={() => getUserInfo()}>
            Get User Info
          </button>
          {userInfo && (
            <div>
              <h2>User Info:</h2>
              <pre>{JSON.stringify(userInfo, null, 2)}</pre>
            </div>
          )}

          <button style={buttonStyle} onClick={() => getPrivateKey()}>
            Get Pk
          </button>
          {privateKey && (
            <div>
              <h2>Private Key:</h2>
              <pre>{privateKey}</pre>
            </div>
          )}

          <button style={buttonStyle} onClick={() => signOut()}>
            Sign Out
          </button>
        </>
      ) : (
        <button style={buttonStyle} onClick={() => signIn()}>
          Sign In
        </button>
      )}

      <img
        alt="Gatsby G Logo"
        src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
      />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
