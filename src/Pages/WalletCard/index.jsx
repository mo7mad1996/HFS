/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";

// components
import { Box } from "@mui/material";
import Balance from "./Balance";
import Charging from "./Charging";
import WithDraw from "./WithDraw";

// css
import css from "./style.module.css";

// api
import useApi from "@/api";

// component
export default function CustomCard() {
  // setup
  const api = useApi();
  const [loading, setLoading] = useState(false);

  const [wallet, setWallet] = useState("");
  const [numberInWallet, setNumberInWallet] = useState(0);

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

  return (
    <Box className={css.page_container}>
      <Balance getWallet={getWallet} wallet={wallet} />
      <Charging getWallet={getWallet} />
      <WithDraw />
    </Box>
  );
}
