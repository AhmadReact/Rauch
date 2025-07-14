import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OrderTable from "./OrderTable";
import Link from "next/link";

export default function BillingHistory({ customer }) {
  if (customer?.hasOwnProperty("orders")) {
    const url = `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/invoice/download/${customer.company_id}?order_hash=`;
    const invoiceUrl = `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/invoice/download/${customer.company_id}?invoice_hash=`;

    const sortDetails = (customerBillingData) => {
      let billingDetails = [
        ...customerBillingData.invoice,
        ...customerBillingData.credit_amount,
        ...(customerBillingData.invoice.invoice_item || []),
      ];

      billingDetails.sort((a, b) => {
        return a.created_at < b.created_at ? 1 : -1;
      });

      return billingDetails;
    };
    //   const binaryConverter=(binaryData)=>{
    //     let hexadecimalString = Array.from(binaryData, function(byte) {
    //       return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    //     }).join('');
    // return hexadecimalString;
    //   }
    function binaryConverter(s) {
      var v,
        i,
        f = 0,
        a = [];
      s += "";
      f = s.length;

      for (i = 0; i < f; i++) {
        a[i] = s
          .charCodeAt(i)
          .toString(16)
          .replace(/^([\da-f])$/, "0$1");
      }

      return a.join("");
    }
    const billingAmount = (billingDetail) => {
      let subtotal;
      let downloadLink;

      if (billingDetail && billingDetail["subtotal"]) {
        subtotal = (
          <td>
            <strong>-${billingDetail["subtotal"]}</strong>
          </td>
        );
        if (billingDetail["order"]) {
          downloadLink = (
            <td>
              <Link
                className="text-[#33cccc] bg-[#e8f7fa] py-[7px] px-[20px] italic"
                target={"_blank"}
                href={`${url}${billingDetail["order"]["hash"]}`}
              >
                Download
              </Link>
            </td>
          );
        } else {
          downloadLink = (
            <td>
              <Link
                className="text-[#33cccc] bg-[#e8f7fa] py-[7px] px-[20px] italic"
                target={"_blank"}
                href={`${invoiceUrl}${binaryConverter(
                  "invoice=" + billingDetail["id"]
                )}`}
              >
                Download
              </Link>
            </td>
          );
        }
      } else {
        subtotal = (
          <td>
            <strong>${billingDetail["amount"]}</strong>
          </td>
        );
        if (billingDetail && billingDetail["invoice"]) {
          downloadLink = (
            <td>
              <Link
                className="text-[#33cccc] bg-[#e8f7fa] py-[7px] px-[20px] italic"
                target={"_blank"}
                href={`${invoiceUrl}${binaryConverter(
                  "invoice=" + billingDetail["invoice"]["id"]
                )}`}
              >
                Download
              </Link>
            </td>
          );
        } else {
          downloadLink = <td></td>;
        }
      }
      return [subtotal, downloadLink];
    };

    return (
      <>
        <p className="text-[#33383dd2] text-[35px] font-normal py-4">
          Billing History
        </p>
        <div>
          <TableContainer sx={{ marginTop: "10px" }} component={Paper}>
            <Table aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortDetails(customer) &&
                  sortDetails(customer).map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        {row.created_at_formatted_with_time}
                      </TableCell>
                      <TableCell>{row["type_description"]}</TableCell>
                      <TableCell>{"NA"}</TableCell>
                      <TableCell>
                        {billingAmount(row) && billingAmount(row)[0]}
                      </TableCell>
                      <TableCell>
                        {billingAmount(row) && billingAmount(row)[1]}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div style={{ marginTop: "50px" }}>
          <p className="text-[#33383dd2] text-[35px] font-normal">Order</p>
          <OrderTable customer={customer} />
        </div>
      </>
    );
  } else {
    return (
      <div className="overlay">
        <div className="loaderImage-container">
          {/* <img width={80} height={80} src={LoadingSpinner} /> */}
        </div>
      </div>
    );
  }
}
