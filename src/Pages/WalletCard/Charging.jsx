/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";

import { Button, Box } from "@mui/material";
import Swal from "sweetalert2";

// css
import css from "./style.module.css";

// api
import useApi from "@/api";

export default function Charging({ getWallet }) {
  // setup
  const api = useApi();

  let [amount, setAmount] = useState(0);

  async function getWithdrawal(amount) {
    try {
      let res = await api.post(`/charging-credit`, {
        code: amount,
      });

      const data = res.data.message;

      Swal.fire({
        title: data,
        icon: "success",
      });

      getWallet();
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    }
  }

  return (
    <Box
      className={css.form}
      component="form"
      onSubmit={() => {
        getWithdrawal(amount);
      }}
    >
      <Box component="h4">Charging</Box>

      <div className={css.coolinput}>
        <label htmlFor="input" className={css.text}>
          Name:
        </label>
        <input
          type="text"
          id="input"
          placeholder="Code here..."
          name="input"
          className={css.input}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <Button type="submit">Charge</Button>
    </Box>
  );
}
