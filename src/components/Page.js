import React, { useState, useEffect } from "react";
import Sidebar from "./panels/sidebar";
import Sidebar2 from "./panels/sidebar2";
import Tables from "./panels/Tables";
import "./panels/sidebar.css";
import CardScroll from "./Cards";
import moment from "moment";
import axios from "axios";

const Page = (props) => {
  const [pageData, setdata] = useState([]);
  const [totalBalance, setTotal] = useState([]);

  //Getting data
  useEffect(() => {
    if (props.isConnected) {
      axios
        .get(
          `https://zvyztoofq8.execute-api.us-east-1.amazonaws.com/dev/` +
            // props.walletAddress
            "0x14791697260e4c9a71f18484c9f997b308e59325"
        )
        .then(function (res) {
          if (res.data) {
            let {
              quaredBalance,
              ethereumBalance,
              smartchainBalance,
              quaredPoolBalance_round,
              ethereumPoolBalance_round,
              smartchainPoolBalance_round,
            } = res.data;
            let total =
              +quaredBalance +
              +ethereumBalance +
              +smartchainBalance +
              +quaredPoolBalance_round +
              +ethereumPoolBalance_round +
              +smartchainPoolBalance_round;
            let transactions = res.data.transactions.map((transaction) => {
              let d = new Date(transaction.timestamp * 1000);
              return {
                ...transaction,
                timestamp: moment(d).format("MMMM Do YYYY, h:mm:ss a"),
              };
            });
            setdata({
              ...res.data,
              transactions: transactions,
            });
            setTotal(total.toFixed(2));
          }
        });
    }
  }, [props.walletAddress]);

  return (
    <>
      <div className="w-auto md:mx-40">
        <div className="md:grid md:grid-cols-2 md:mt-20 md:mx-20 gap-4">
          <div className=" md:block hidden">
            <Sidebar
              isConnected={props.isConnected}
              totalBalance={totalBalance}
              data={pageData}
            />
          </div>
          {Object.keys(pageData).length > 0 && (
            <div className="md:hidden block overflow-x-scroll flex dark:bg-gray-800 flex-row mt-10">
              <CardScroll
                title={"Total Balance"}
                isConnected={props.isConnected}
                balance={totalBalance}
                priceEur={pageData.priceEur}
              />
              <CardScroll
                title={"Quared"}
                isConnected={props.isConnected}
                balance={pageData.quaredBalance}
                priceEur={pageData.priceEur}
              />
              <CardScroll
                title={"Ethereum"}
                isConnected={props.isConnected}
                balance={pageData.ethereumBalance}
                priceEur={pageData.priceEur}
              />
              <CardScroll
                title={"Smart Chain"}
                isConnected={props.isConnected}
                balance={pageData.smartchainBalance}
                priceEur={pageData.priceEur}
              />
            </div>
          )}
          <Sidebar2 />
        </div>
        <div className="md:my-20 w-100 py-10 container rounded-lg shadow-custom dark:bg-gray-800 md:ml-10 md:mr-20">
          <div className="px-8">
            <div className=" flex justify-left ">
              <span className="font-medium text-left text-lg mb-2 dark:bg-gray-800 dark:text-white">
                Transaction
              </span>
            </div>
            <div className="pb-3">
              <Tables
                walletAddress={props.walletAddress}
                tableData={pageData.transactions ? pageData.transactions : []}
                isConnected={props.isConnected}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
