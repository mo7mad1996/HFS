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
import useApi from "@/api";

function AllTransactions() {
  const api = useApi();
  const [transactions, setTransactions] = useState([]);
  const [setFilterType] = useState("all");
  let { baseUrl } = useContext(Context);
  //   All Transactions
  async function getAllTransactions() {
    try {
      let res = await api.get("/all-tarnsactions");
      setTransactions(res?.data.tarnsactions?.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  async function getWithdrawals() {
    try {
      let res = await api.get("/all-withdrawal-tarnsactions");
      setTransactions(res?.data?.transactions?.data);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    }
  }

  // Deposits
  async function getDeposits() {
    try {
      let res = await api.get("/all-deposit-tarnsactions");
      setTransactions(res.data.transactions.data);
    } catch (error) {
      console.error("Error fetching deposits:", error);
    }
  }

  // All Accepted Transactions
  async function allAcceptedTarnsactions() {
    try {
      let res = await axios.get("/all-accetptd-tarnsactions");
      setTransactions(res.data.transactions.data);
    } catch (error) {
      console.error("Error fetching accepted transactions:", error);
    }
  }

  // All Rejected Transaction
  async function allRejectedTarnsactions() {
    try {
      let res = await axios.get("/all-rejected-tarnsactions");
      setTransactions(res.data.transactions.data);
    } catch (error) {
      console.error("Error fetching accepted transactions:", error);
    }
  }

  // All Pending Transactions
  async function allPendingTransactions() {
    try {
      let res = await axios.get("/all-pending-tarnsactions");
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
