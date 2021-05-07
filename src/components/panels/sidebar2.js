import React, { useState } from "react";
import { ethers } from "ethers";
import ReactModal from "react-modal";
import Notifications, { notify } from "react-notify-toast";
// require('dotenv').config()

const Sidebar2 = (props) => {
  const WrongNetwork = () => {
    notify.show(
      <div className="flex flex-row">
        <div>
          <span>Your Web3 Client is connected to the wrong network!</span>
        </div>
      </div>,
      "error",
      5000
    );
  };
  // Button for Handling Swap Functionality
  const Swap = async () => {
    if (amount < 0.001) {
      notify.show(
        <div className="flex flex-row">
          <div>
            <span>Swap amount must be more than 0.001</span>
          </div>
        </div>,
        "error",
        5000
      );
      return;
    }
    console.log(window.ethereum.selectedAddress);
    if (window.ethereum.selectedAddress) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const abi = ["function swapBurn(uint256 amount, uint16 chainId)"];
      const network = await provider.getNetwork();
      let chainId = "";
      switch (toNetwork) {
        case "quared":
          chainId = 0;
          break;
        case "ethereum":
          chainId = 1;
          break;
        case "smartchain":
          chainId = 2;
          break;
      }
      if (fromNetwork == "smartchain") {
        console.log("gfun times");
      }
      switch (fromNetwork) {
        case "quared":
          switch (toNetwork) {
            case "ethereum": {
              window.open(
                `https://DTWallet.io/receive/0xcfa10c1AB8A52cbF8c7E1B40E8Eb7a7D58454777/${amount}`, //the addresss should be made an environment variable
                "_blank"
              );
              break;
            }
            case "smartchain":
              {
                window.open(
                  `https://DTWallet.io/receive/0xcfa10c1AB8A52cbF8c7E1B40E8Eb7a7D58454777/${amount}`, // as aove
                  "_blank"
                );
                break;
              }
              break;
          }
        case "ethereum": {
          if (network.name != "rinkeby") {
            console.log(network.name);
            WrongNetwork();
            return;
          } else {
            let contract = new ethers.Contract(
              "0xB0166465d5983734B5Ac1255cCB9DB007AbcE328",
              abi,
              signer
            ); //env var
            let contractSigner = contract.connect(signer);
            // console.log(this.DTX_value)
            try {
              let swap = await contract.swapBurn(
                ethers.utils.parseUnits(amount, 18),
                chainId
              );
              let confirmedSwap = await swap.wait();
              if (confirmedSwap) {
                setModal(true);
              }
            } catch (e) {
              notify.show(
                <div className="flex flex-row">
                  {" "}
                  <div>
                    {" "}
                    <span>{e.error.message}</span>{" "}
                  </div>{" "}
                </div>,
                "error",
                5000
              );
            }
            return;
          }
          break;
        }
        case "smartchain": {
          if (network.name != "bnbt") {
            console.log(network.name);
            WrongNetwork();
            return;
          } else {
            console.log("were doing stuff");
            let contract = new ethers.Contract(
              "0x72EA1Fb2b20C07a1AAbA39e77a5F8Ea0e2928a64",
              abi,
              signer
            ); //env var
            let contractSigner = contract.connect(signer);
            try {
              let swap = await contract.swapBurn(
                ethers.utils.parseUnits(amount, 18),
                chainId
              );
              let confirmedSwap = await swap.wait();
            } catch (e) {
              notify.show(
                <div className="flex flex-row">
                  {" "}
                  <div>
                    {" "}
                    <span>{e.error.message}</span>{" "}
                  </div>{" "}
                </div>,
                "error",
                5000
              );
            }
            return;
          }
          break;
        }
      }
    }

    console.log("Swap button clicked");
    console.log(toNetwork);
    console.log(fromNetwork);
    console.log(amount);
  };

  const [toNetwork, setToNetwork] = useState("quared");
  const [fromNetwork, setFromNetwork] = useState("ethereum");
  const [amount, setAmount] = useState("");
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="">
        <div
          className="max-w-100  h-full  overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
          style={{ boxShadow: "0px 5.50528px 50.0317px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="mt-10 text-center mx-10 mt-5 mb-2 rounded-2xl">
            <div>
              <form>
                <fieldset
                  className="border-1 rounded-md h-12"
                  style={{ "border-color": "#5A46D6" }}
                >
                  <legend className="text-left text-sm font-medium dark:text-white">
                    From
                  </legend>

                  <div className="border-2 select-dropdown w-full h-100 border-0 group focus:border-red-500 wrapper ">
                    <select
                      id="select1"
                      onChange={(e) => {
                        setFromNetwork(e.target.value);
                      }}
                      name="indication_subject[]"
                      value={fromNetwork}
                      className="outline-none w-full border-0 bg-white h-full group-focus:text-yellow-300 dark:bg-gray-800 dark:text-white"
                    >
                      <option
                        className="bg-indigo-100 text-indigo-600"
                        value="quared"
                        disabled={toNetwork === "quared" ? true : false}
                      >
                        Quared
                      </option>
                      <option
                        className="bg-indigo-100 text-indigo-600"
                        value="ethereum"
                        disabled={toNetwork === "ethereum" ? true : false}
                      >
                        Ethereum
                      </option>
                      <option
                        className="bg-indigo-100 text-indigo-600"
                        value="smartchain"
                        disabled={toNetwork === "smartchain" ? true : false}
                      >
                        Smart Chain{" "}
                      </option>
                    </select>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
          <div className="text-center">
            <svg
              width="8"
              height="20"
              viewBox="0 0 8 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="4.33772"
                y1="14.3223"
                x2="4.33772"
                y2="0.582697"
                stroke="#5A46D6"
                stroke-width="1.19175"
              />
              <path
                d="M4.44258 19.8763C4.39632 19.9536 4.28431 19.9536 4.23805 19.8763L0.851355 14.2164C0.803823 14.137 0.861049 14.0361 0.953619 14.0361L7.72702 14.0361C7.81959 14.0361 7.87682 14.137 7.82928 14.2164L4.44258 19.8763Z"
                fill="#5A46D6"
              />
            </svg>
            <svg
              width="8"
              height="21"
              viewBox="0 0 8 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="3.84978"
                y1="6.30759"
                x2="3.84978"
                y2="20.0472"
                stroke="#5A46D6"
                stroke-width="1.19175"
              />
              <path
                d="M3.74492 0.753729C3.79118 0.67642 3.90319 0.67642 3.94945 0.753729L7.33615 6.41354C7.38368 6.49298 7.32645 6.59391 7.23388 6.59391L0.46048 6.59391C0.36791 6.59391 0.310683 6.49298 0.358216 6.41354L3.74492 0.753729Z"
                fill="#5A46D6"
              />
            </svg>
          </div>
          <div className="text-center mx-10  mb-2 rounded-2xl">
            <div>
              <form>
                <fieldset
                  className="border-1 rounded-md h-12"
                  style={{ "border-color": "#5A46D6" }}
                >
                  <legend className="text-left text-sm font-medium dark:text-white">
                    To
                  </legend>

                  <div className="border-2  w-full h-100 border-0 group focus:border-red-500 wrapper">
                    <select
                      id="select2"
                      name="indication_subject[]"
                      onChange={(e) => {
                        setToNetwork(e.target.value);
                      }}
                      value={toNetwork}
                      className="outline-none w-full border-0 bg-white h-full group-focus:text-yellow-300 dark:bg-gray-800 dark:text-white"
                    >
                      <option
                        className="bg-indigo-100 text-indigo-600 ml-2"
                        value="quared"
                        disabled={fromNetwork === "quared" ? true : false}
                      >
                        Quared
                      </option>
                      <option
                        className="bg-indigo-100 text-indigo-600 ml-2"
                        value="ethereum"
                        disabled={fromNetwork === "ethereum" ? true : false}
                      >
                        Ethereum
                      </option>
                      <option
                        className="bg-indigo-100 text-indigo-600 ml-2"
                        value="smartchain"
                        disabled={fromNetwork === "smartchain" ? true : false}
                      >
                        Smart Chain{" "}
                      </option>
                    </select>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>

          <div className="text-center  mx-10 ml-11 my-10 rounded-xl">
            <div className="absolute   text-sm -mt-2 ml-3 font-medium bg-white dark:bg-gray-800 dark:text-white">
              Amount
            </div>
            <div
              className="overflow-hidden flex  outline-none "
              style={{ height: "3.7rem" }}
            >
              <input
                type="number"
                className="px-6 py-2 w-full rounded outline-none bg-white text-indigo-600 dark:bg-gray-800 dark:text-white"
                placeholder="Enter the Amount"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                style={{ "border-color": "#5A46D6" }}
              />
            </div>
          </div>
          <div className="text-center  mx-10  my-2 rounded-xl">
            <button
              className="swap-btn border-transparent w-100 px-5 py-2 outline-none rounded b color text-white font-bold text-lg"
              onClick={Swap}
            >
              Swap
            </button>
          </div>

          <div className="text-center mx-auto my-auto">
            <span className="text-sm text-center dark:bg-gray-800 dark:text-white">
              Estimated time for completion: 6 cycles
            </span>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={modal}
        contentLabel="Transaction successful"
        onRequestClose={() => setModal(false)}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            color: "lightsteelblue",
            width: "200px",
            height: "150px",
            textAlign: "center",
          },
        }}
      >
        <p>Transaction Successful</p>
        <button onClick={() => setModal(false)}>Close</button>
      </ReactModal>
    </>
  );
};

export default Sidebar2;

// display: flex;
// flex-direction: column;
// align-items: flex-start;
// padding: 0px 0px 0px 9.53398px;

// position: absolute;
// width: 357px;
// height: 69px;
// left: 727px;
// top: 499.65px;

// border: 2px solid #5A46D6;
// box-sizing: border-box;
// border-radius: 8px;
