/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import { Context } from "@/Context";

function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [setFilterType] = useState("all");
  let { baseUrl } = useContext(Context);
  //   All Transactions
  async function getAllTransactions() {
    try {
      let res = await axios.get(
        `${baseUrl}/all-tarnsactions`, // تأكد من تصحيح الاسم
        {
          headers: {
            Authorization: `Bearer 5|YPN5XVpoTXraDLaEjcIAMX6i08OrlrnagNvsXr1X080d0e24`,
          },
        }
      );
      setTransactions(res?.data.tarnsactions?.data); // تأكد من صحة هذا السطر حسب هيكل البيانات
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  //   Withdrawals

  async function getWithdrawals() {
    try {
      let res = await axios.get(`${baseUrl}/all-withdrawal-tarnsactions`, {
        headers: {
          Authorization: `Bearer 5|YPN5XVpoTXraDLaEjcIAMX6i08OrlrnagNvsXr1X080d0e24`,
        },
      });
      setTransactions(res?.data?.transactions?.data);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    }
  }

  // Deposits
  async function getDeposits() {
    try {
      let res = await axios.get(`${baseUrl}/all-deposit-tarnsactions`, {
        headers: {
          Authorization: `Bearer 5|YPN5XVpoTXraDLaEjcIAMX6i08OrlrnagNvsXr1X080d0e24`,
        },
      });
      setTransactions(res.data.transactions.data);
    } catch (error) {
      console.error("Error fetching deposits:", error);
    }
  }

  // All Accepted Transactions
  async function allAcceptedTarnsactions() {
    try {
      let res = await axios.get(`${baseUrl}/all-accetptd-tarnsactions`, {
        headers: {
          Authorization: `Bearer 5|YPN5XVpoTXraDLaEjcIAMX6i08OrlrnagNvsXr1X080d0e24`,
        },
      });
      setTransactions(res.data.transactions.data);
    } catch (error) {
      console.error("Error fetching accepted transactions:", error);
    }
  }

  // All Rejected Transaction
  async function allRejectedTarnsactions() {
    try {
      let res = await axios.get(`${baseUrl}/all-rejected-tarnsactions`, {
        headers: {
          Authorization: `Bearer 5|YPN5XVpoTXraDLaEjcIAMX6i08OrlrnagNvsXr1X080d0e24`,
        },
      });
      setTransactions(res.data.transactions.data);
    } catch (error) {
      console.error("Error fetching accepted transactions:", error);
    }
  }

  // All Pending Transactions
  async function allPendingTransactions() {
    try {
      let res = await axios.get(`${baseUrl}/all-pending-tarnsactions`, {
        headers: {
          Authorization: `Bearer 5|YPN5XVpoTXraDLaEjcIAMX6i08OrlrnagNvsXr1X080d0e24`,
        },
      });
      setTransactions(res.data.transactions.data);
    } catch (error) {
      console.error("Error fetching accepted transactions:", error);
    }
  }

  const handleFilterChange = (type) => {
    setFilterType(type);
    switch (type) {
      case "all":
        getAllTransactions();
        break;
      case "withdrawals":
        getWithdrawals();
        break;
      case "deposits":
        getDeposits();
        break;
      case "accepted":
        allAcceptedTarnsactions();
        break;
      case "rejected":
        allRejectedTarnsactions();
        break;
      case "pending":
        allPendingTransactions();
        break;
      default:
        getAllTransactions();
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <Box>
      <Box
        className="btns-filter"
        sx={{ display: "flex", gap: "20px", flexWrap: "wrap", width: "100%" }}
      >
        <Button onClick={() => handleFilterChange("all")}>
          Transactions History
        </Button>
        <Button onClick={() => handleFilterChange("deposits")}>
          All Deposits
        </Button>
        <Button onClick={() => handleFilterChange("withdrawals")}>
          Withdrawals History
        </Button>
        <Button onClick={() => handleFilterChange("accepted")}>
          All Accepted Transactions
        </Button>
        <Button onClick={() => handleFilterChange("rejected")}>
          All Rejected Transactions
        </Button>
        <Button onClick={() => handleFilterChange("pending")}>
          All Pending Transactions
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Transaction Type</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Amount</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Date</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.length > 0 ? (
              transactions.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row?.transaction_type}</TableCell>
                  <TableCell>{row?.status}</TableCell>
                  <TableCell>{row?.amount}</TableCell>
                  <TableCell>{row?.created_at}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography>No transactions available.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AllTransactions;
