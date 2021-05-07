import React, { useState, useEffect } from "react";

const Sidebar = (props) => {
  const Datetime = new Date();

  const [selectorone, setselectorone] = useState(false);

  const get_date = (date) => {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();
    var mmChars = mm.split("");
    var ddChars = dd.split("");
    return (
      yyyy +
      "-" +
      (mmChars[1] ? mm : "0" + mmChars[0]) +
      "-" +
      (ddChars[1] ? dd : "0" + ddChars[0])
    );
  };

  console.log("Connected", props.isConnected);

  return (
    <>
      <div
        className="md:overflow-x-hidden overflow-x-scroll   w-full md:scale-100  flex md:flex-col flex-row md:gap-0 gap-5 "
        style={{ boxShadow: "0px 5.50528px 50.0317px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="rounded-2xl   w-100 px-4  py-3  bg-white  shadow-custom dark:bg-gray-800">
          <div className=" flex flex-grow md:flex-row flex-col items-center justify-between">
            <span className="text-md font-bold text-gray-800 dark:text-white">
              Total Balance
            </span>
            <span
              onClick={() => {
                setselectorone(!selectorone);
              }}
              className=" px-4 py-2 text-xs text-white text-opacity-70 text-thin uppercase color rounded-xl  dark:text-white"
            >
              <span className={selectorone ? "text-white font-bold" : ""}>
                EUR
              </span>
              |
              <span className={!selectorone ? "text-white font-bold" : ""}>
                DTC
              </span>
            </span>
          </div>
          <span className="text-xs font-light text-gray-400 font-medium dark:text-white">
            Today {get_date(Datetime)}
          </span>
          <div className="flex text-center md:mb-5 mx-5 text-2xl">
            {selectorone &&
              (props.isConnected ? (
                <p className="flex-shrink mt-4 text-gray-600 font-bold">
                  Ξ {(props.totalBalance * props.data.priceEur).toFixed(2)} EUR
                </p>
              ) : (
                <p className="font-medium text-lg text-center my-8 text-gray-300">
                  Please login with metamask
                </p>
              ))}
            {!selectorone &&
              (props.isConnected ? (
                <p className="flex-shrink mt-4 text-gray-600 dark:text-white font-bold">
                  Ξ {props.totalBalance} DTC
                </p>
              ) : (
                <p className="font-medium text-lg text-center my-8 text-gray-300">
                  Please login with metamask
                </p>
              ))}
          </div>
        </div>
        <div className="rounded-2xl   w-100 px-4 mt-2 py-3  bg-white md:shadow-custom dark:bg-gray-800">
          <div className="flex md:flex-row flex-col items-center justify-between">
            <span className="text-md font-bold text-gray-800 dark:text-white">
              Other Balance
            </span>
          </div>
          <span className="text-xs font-light text-gray-400 font-medium ">
            Today {get_date(Datetime)}
          </span>
          <div></div>
          {!props.isConnected ? (
            <p className="font-medium text-lg text-center my-8 text-gray-300">
              Please login with metamask
            </p>
          ) : (
            <div>
              <div
                id="style-11"
                className="flex flex-col mx-0 mt-5 text-gray-700 dark:text-white  h-50"
              >
                <div className="my-2">
                  <span className=" text-lg font-bold "> Quared</span>
                  <div className=" text-sm">
                    {selectorone
                      ? "€ " +
                        (
                          props.data.quaredBalance * props.data.priceEur
                        ).toFixed(3)
                      : (props.data.quaredBalance * 1).toFixed(3) + " DTC"}
                    <span className="text-primary dark:text-white font-medium">
                      (
                      {selectorone
                        ? "€ " +
                          (
                            props.data.quaredPoolBalance_round *
                            props.data.priceEur
                          ).toFixed(3)
                        : (props.data.quaredPoolBalance_round * 1).toFixed(3) +
                          " DTC"}
                      pending)
                    </span>
                  </div>
                </div>
                <div className="my-2 md:block hidden ">
                  <span className=" text-lg font-bold "> Ethereum</span>
                  <div className=" text-sm">
                    {selectorone
                      ? "€ " +
                        (
                          props.data.ethereumBalance * props.data.priceEur
                        ).toFixed(3)
                      : (props.data.ethereumBalance * 1).toFixed(3) + " DTC"}
                    <span className="text-primary dark:text-white font-medium">
                      (
                      {selectorone
                        ? "€ " +
                          (
                            props.data.ethereumPoolBalance_round *
                            props.data.priceEur
                          ).toFixed(3)
                        : (props.data.ethereumPoolBalance_round * 1).toFixed(
                            3
                          ) + " DTC"}
                      pending)
                    </span>
                  </div>
                </div>

                <div className="my-2 md:block hidden">
                  <span className=" text-lg font-bold "> Smart Chain</span>
                  <div className=" text-sm">
                    {selectorone
                      ? "€ " +
                        (
                          props.data.smartchainBalance * props.data.priceEur
                        ).toFixed(3)
                      : (props.data.smartchainBalance * 1).toFixed(3) + " DTC"}
                    <span className="text-primary dark:text-white font-medium">
                      (
                      {selectorone
                        ? "€ " +
                          (
                            props.data.smartchainPoolBalance_round *
                            props.data.priceEur
                          ).toFixed(3)
                        : (props.data.smartchainPoolBalance_round * 1).toFixed(
                            3
                          ) + " DTC"}
                      pending)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

// max-w-sm h-full mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800
