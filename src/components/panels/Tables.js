import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./tables.css";
const columns = [
  { id: "name", label: "From", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "To",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Hash",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Amount",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size };
}

const rows = [
  createData("aJKBDSJjkbajkBDSJKBDjiWA", "IN", 1324171354, 3287263),
  createData("aJKBDSJjkbajkBDSJKBDjiWA", "CN", 1403500365, 9596961),
  createData("aJKBDSJjkbajkBDSJKBDjiWA", "IT", 60483973, 301340),
  createData("aJKBDSJjkbajkBDSJKBDjiWA States", "US", 327167434, 9833520),
  createData("aJKBDSJjkbajkBDSJKBDjiWA", "CA", 37602103, 9984670),
  createData("aJKBDSJjkbajkBDSJKBDjiWA", "AU", 25475400, 7692024),
  createData("aJKBDSJjkbajkBDSJKBDjiWA", "DE", 83019200, 357578),
  createData("aJKBDSJjkbajkBDSJKBDjiWA", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("aJKBDSJjkbajkBDSJKBDjiWA", "JP", 126317000, 377973),
  createData("aJKBDSJjkbajkBDSJKBDjiWA", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("aJKBDSJjkbajkBDSJKBDjiWA", "RU", 146793744, 17098246),
  createData("aJKBDSJjkbajkBDSJKBDjiWA", "NG", 200962417, 923768),
  createData("aJKBDSJjkbajkBDSJKBDjiWA", "BR", 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});
export default function StickyHeadTable(props) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="dark:bg-gray-900 dark:border-gray-800 dark:text-white ">
              FROM
            </th>
            <th className="dark:bg-gray-900 dark:border-gray-800 dark:text-white ">
              TO
            </th>
            <th className="dark:bg-gray-900 dark:border-gray-800 dark:text-white  md:text-center">
              HASH
            </th>
            <th className="dark:bg-gray-900 dark:border-gray-800 dark:text-white text-center ">
              Date/Time
            </th>
            <th className="dark:bg-gray-900 dark:border-gray-800 dark:text-white text-right ">
              AMOUNT<span className="font-light">(EUR)</span>
            </th>
          </tr>
        </thead>
        <tbody
          className="md:overflow-y-hidden overflow-y-scroll"
          style={{ height: "30rem" }}
        >
          {props.tableData.length > 0 &&
            props.tableData.map((i, c) => (
              <tr>
                <td className="md:bg-white">
                  {" "}
                  {i["fromNetwork"].slice(0, 10)}
                </td>
                <td className="md:bg-white"> {i["toNetwork"].slice(0, 10)}</td>
                <td className="md:hidden md:bg-white block">
                  {i["txhash"].slice(0, 15)}...
                </td>
                <td className="md:block hidden md:bg-white ">
                  {i["txhash"].slice(0, 32)}...
                </td>
                <td className="md:text-center md:bg-white">{i["timestamp"]}</td>
                <td className="md:text-right md:bg-white">
                  {i["value_round"]}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      {!props.walletAddress && (
        <div className="font-medium text-lg text-center my-8 text-gray-300">
          Login To metamask Wallet
        </div>
      )}
      {!props.tableData.length && props.walletAddress && (
        <div className="font-medium text-lg text-center my-8 text-gray-300">
          No Transactions Made
        </div>
      )}
    </>
  );
}
