/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import {
  Pagination,
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
import { Context } from "@/Context";
import useApi from "@/api";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function AllTransactions() {
  const api = useApi();
  const [transactions, setTransactions] = useState([]);
  const [tab, setFilterType] = useState("all");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  let { baseUrl } = useContext(Context);
  //   All Transactions
  async function getAllTransactions() {
    try {
      let res = await api.get(`/all-tarnsactions?page=${page}`);
      setPages(res.data.tarnsactions.last_page);
      setTransactions(res?.data.tarnsactions?.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  async function getWithdrawals() {
    try {
      let res = await api.get(`/all-withdrawal-tarnsactions?page=${page}`);
      setPages(res.data.transactions.last_page);
      setTransactions(res?.data?.transactions?.data);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    }
  }

  // Deposits
  async function getDeposits() {
    try {
      let res = await api.get(`/all-deposit-tarnsactions?page=${page}`);
      setPages(res.data.transactions.last_page);
      setTransactions(res?.data?.transactions?.data);
    } catch (error) {
      console.error("Error fetching deposits:", error);
    }
  }

  // All Accepted Transactions
  async function allAcceptedTarnsactions() {
    try {
      let res = await api.get(`/all-accetptd-tarnsactions?page=${page}`);
      setTransactions(res.data.transactions.data);
      setPages(res.data.transactions.last_page);
    } catch (error) {
      console.error("Error fetching accepted transactions:", error);
    }
  }

  // All Rejected Transaction
  async function allRejectedTarnsactions() {
    try {
      let res = await api.get(`/all-rejected-tarnsactions?page=${page}`);
      setTransactions(res.data.transactions.data);
      setPages(res.data.transactions.last_page);
    } catch (error) {
      console.error("Error fetching accepted transactions:", error);
    }
  }

  // All Pending Transactions
  async function allPendingTransactions() {
    try {
      let res = await api.get(`/all-pending-tarnsactions?page=${page}`);
      setTransactions(res.data.transactions.data);
      setPages(res.data.transactions.last_page);
    } catch (error) {
      console.error("Error fetching accepted transactions:", error);
    }
  }

  const handleFilterChange = (type, updatePagination = true) => {
    setFilterType(type);

    if (updatePagination) {
      setPage(1);
      setPages(1);
    }

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
    handleFilterChange(tab, false);
  }, [page]);

  return (
    <Box sx={{ p: "50px" }}>
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
                <Typography variant="h6">receive member ID</Typography>
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
              transactions.map((row) => {
                const date = new Date(row?.created_at);

                const formattedDateTime = `${date.getFullYear()}-${(
                  date.getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}-${date
                  .getDate()
                  .toString()
                  .padStart(2, "0")} ${date
                  .getHours()
                  .toString()
                  .padStart(2, "0")}:${date
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}:${date
                  .getSeconds()
                  .toString()
                  .padStart(2, "0")}`;
                return (
                  <TableRow key={row.id}>
                    <TableCell>{row?.transaction_type}</TableCell>
                    <TableCell>{row?.receive_member_id}</TableCell>
                    <TableCell>{row?.status}</TableCell>
                    <TableCell>{row?.amount}</TableCell>
                    <TableCell>{formattedDateTime}</TableCell>
                  </TableRow>
                );
              })
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

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Pagination
          sx={{ margin: "30px auto", width: "max-content" }}
          // color="white"
          count={pages}
          page={page}
          onChange={(e, n) => setPage(n)}
        />
      </ThemeProvider>
    </Box>
  );
}

export default AllTransactions;
