/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  IconButton,
  //   InputAdornment,
  Box,
  //   TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import { Context } from "@/Context";

import useApi from "@/api";

const CustomCard = () => {
  // setup
  const api = useApi();
  const [loading, setLoading] = useState(false);

  let [amount, setAmount] = useState(0);
  const [wallet, setWallet] = useState("");
  const [isWalletVisible, setIsWalletVisible] = useState(false);
  const [numberInWallet, setNumberInWallet] = useState(0);
  let { baseUrl } = useContext(Context);
  //   const [setMessage] = useState("");

  async function getWallet() {
    try {
      setLoading(true);
      let res = await api.get(`/current-balance`);

      const data = res.data.message;

      setWallet(data);
      if (wallet) {
        setNumberInWallet(wallet?.split(" ").splice(5, 6)[0]);
      }
    } catch (err) {
      console.error("Error fetching wallet balance:", err);
    } finally {
      setLoading(false);
    }
  }

  async function getWithdrawal(amount) {
    let res = await api.post(`/withdrawa`, {
      transaction_type: "withdrawal",
      amount: amount,
    });

    if (numberInWallet < amount) {
      Swal.fire({
        title: "not enough",
        icon: "error",
      });

      return;
    }

    if (res.data.status) {
      Swal.fire({
        title: res?.data?.message,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "please set amount!",
        icon: "error",
      });
    }
  }

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <Box>
      <Box
        className=""
        sx={{
          width: "100%",
          height: "auto",

          mt: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            width: 400,
            height: 200,
            m: 2,
            boxShadow: 3,
            textAlign: "center",
            borderRadius: "15px",
            background: "linear-gradient(90deg, #4dd9f8 0%, #d94f9c 56%)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: "#fff", fontSize: "20px" }}
            >
              Wallet Balance
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                color: "#fff",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
                justifyContent: "center",
                fontSize: "25px",
              }}
            >
              {isWalletVisible ? wallet.split(" ").splice(5, 6) : "*****"}
              <IconButton
                onClick={() => setIsWalletVisible(!isWalletVisible)}
                sx={{ ml: 1 }}
              >
                {isWalletVisible ? (
                  <VisibilityOff style={{ fontSize: "15px" }} />
                ) : (
                  <Visibility style={{ fontSize: "15px" }} />
                )}
              </IconButton>
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>

        <Box sx={{ ml: "30px" }}>
          <Typography>Withdrawal Request</Typography>
          <input
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            type="text"
            style={{
              border: "1px solid #fff",
              borderRadius: "12px",
              height: "50px",
              width: "300px",
              padding: "10px",
              fontSize: "18px",
              marginBlock: "10px",
            }}
          />
          <Button
            onClick={() => {
              getWithdrawal(amount);
            }}
            sx={{
              display: "block",
              ml: "auto",
              background: "linear-gradient(90deg, #4dd9f8 0%, #d94f9c 56%) ",
              color: "#fff",
              mt: "10px",
            }}
          >
            set Request
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomCard;
