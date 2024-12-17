/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { CardContent, Typography, IconButton, Box } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// css
import css from "./style.module.css";

// api

export default function Balance({ getWallet, wallet }) {
  // setup
  // const [wallet, setWallet] = useState("");
  const [isWalletVisible, setIsWalletVisible] = useState(false);

  //
  useEffect(() => {
    getWallet();
  }, []);

  return (
    <Box className={`${css.card} ${css.item1} `}>
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
          {isWalletVisible ? wallet?.split(" ").splice(5, 6) : "*****"}
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
    </Box>
  );
}
