import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Page from "./components/Page";
import Notifications, { notify } from "react-notify-toast";

function App() {
  const metamask = window.ethereum;
  const [isConnected, setConnectedStatus] = useState(false);
  const [walletAddress, setWallet] = useState("");
  const [balance, setbalance] = useState(-10);
  const [status, setStatus] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => false);

  // if (metamask) {
  //   metamask.on("connect", (accounts) => {
  //     console.log(accounts[0]);
  //   });
  // }

  const connectWallet = async () => {
    if (window.ethereum) {
      //check if Metamask is installed
      try {
        const address = await window.ethereum.enable(); //connect Metamask
        const obj = {
          connectedStatus: true,
          status: "",
          address: address,
        };
        notify.show(
          <div className="flex flex-row">
            <div>
              <span>Connected Successfully to wallet</span>
            </div>
          </div>,
          "success",
          5000
        );
        return obj;
      } catch (error) {

        return {
          connectedStatus: false,
          status: "🦊 Connect to Metamask using the button on the top right.",
        };
      }
    } else {
      notify.show(
        <div className="flex flex-row">
          <div>
            <span>Error connecting to metamask</span>
          </div>
        </div>,
        "error",
        5000
      );
      return {
        connectedStatus: false,
        status:
          "🦊 You must install Metamask into your browser: https://metamask.io/download.html",
      };
    }
  };

  function hex_to_ascii(str1) {
    var hex = str1.toString();
    var str = "";
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str + 1;
  }

  useEffect(() => {}, [walletAddress]);


  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setConnectedStatus(walletResponse.connectedStatus);
    setStatus(walletResponse.status);
    if (isConnected) {
      setWallet(walletAddress);
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [walletAddress, "latest"],
      });
      setbalance(hex_to_ascii(balance.split("0x")[1]));
    }
    console.log(balance);
    console.log(walletAddress);
  };

  useEffect(async () => {
    if (window.ethereum) {
      //if Metamask installed
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        }); //get Metamask wallet
        if (accounts.length) {
          //if a Metamask account is connected
          setConnectedStatus(true);
          setWallet(accounts[0]);
        } else {
          setConnectedStatus(false);
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      } catch {
        setConnectedStatus(false);
        setStatus(
          "🦊 Connect to Metamask using the top right button. " + walletAddress
        );
      }
    }
  },[walletAddress]);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="overflow-x-hidden bg-white dark:bg-black">
        <Navbar
          isConnected={isConnected}
          connectWalletPressed={connectWalletPressed}
          setIsDarkMode={setIsDarkMode}
          isDarkMode={isDarkMode}
        />
        <Notifications options={{ top: "50px" }} />
        <Page
          isConnected={isConnected}
          balance={balance}
          walletAddress={walletAddress}
        />
      </div>
    </div>
  );
}

export default App;
