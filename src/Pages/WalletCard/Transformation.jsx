/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";

import {
  Card,
  Modal,
  Button,
  Box,
  CardContent,
  Typography,
  CardActions,
  TextField,
} from "@mui/material";

// css
import css from "./style.module.css";

// api
import useApi from "@/api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Transformation({ getWallet }) {
  // setup
  const api = useApi();
  const { register, handleSubmit } = useForm();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // methods
  const submit = async (payload) => {
    try {
      setLoading(true);

      const res = await api.post("/internal-transfer", payload);

      const data = res.data.message;
      toast.success(data);
      getWallet();
      handleClose();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => setOpen(false);

  return (
    <Box className={css.form}>
      <Box component="h4">Transformation</Box>

      <div className={css.coolinput}>
        <label htmlFor="input123" className={css.text}>
          Receiver Member ID:
        </label>
        <input
          type="text"
          id="input123"
          placeholder="Receiver Member ID"
          name="input"
          className={css.input}
          {...register("receiver_id_code")}
        />
      </div>
      <div className={css.coolinput}>
        <label htmlFor="input321" className={css.text}>
          Amount:
        </label>
        <input
          type="text"
          id="input321"
          placeholder="Amount here..."
          name="input"
          className={css.input}
          {...register("amount")}
        />
      </div>
      <Button type="button" onClick={() => setOpen(true)}>
        Send
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "grid",
            placeContent: "center",
            height: "100%",
            pointerEvents: "none",
          }}
          component="form"
          onSubmit={handleSubmit(submit)}
        >
          <Card
            sx={{ minWidth: "500px", pointerEvents: "auto" }}
            onClick={(e) => e.stopPropagation()}
            className={css.form}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Please enter your password?
              </Typography>
              <TextField
                type="password"
                id="password"
                placeholder="password Please..."
                className={css.input}
                {...register("password")}
                fullWidth
              />
            </CardContent>

            <CardActions>
              <Box sx={{ width: "100%", display: "flex", gap: 3 }}>
                <Button
                  variant="contained"
                  disabled={loading}
                  loading={loading.toString()}
                  // sx={{ mx: 3 }}
                  type="submit"
                  fullWidth
                >
                  Send
                </Button>
                <Button onClick={handleClose} fullWidth>
                  Cancel
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </Box>
  );
}
