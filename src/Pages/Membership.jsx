/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { Context } from "@/Context";
import useApi from "@/api";

// assets
import check_icon from "@/assets/images/layout/check_icon.png";
import x_mark_icon from "@/assets/images/layout/x_mark_icon.png";
import home_bg from "@/assets/images/pages_assets/home_bg.png";

// component
function CardComponent({
  name,
  price,
  billing_period,
  features,
  cv,
  x,
  y,
  id,
}) {
  // config
  const api = useApi();

  let { baseUrl } = useContext(Context);
  async function subscribe(id) {
    try {
      let res = await api.post("/subscribe", { package_id: id });

      Swal.fire({
        title: "Good job!",
        text: res.data.message,
        icon: "success",
      });
    } catch (error) {
      console.error(
        "Error in subscription:",
        error.response?.data?.message || error.message
      );
      Swal.fire({
        title: "Insufficient funds",
        text: error.response?.data?.message,
        icon: "error",
      });
    }
  }

  let childVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      x: x,
      y: y,
    },

    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      staggerChildren: 0.2,
    },
  };
  return (
    <Box
      component={motion.div}
      variants={childVariants}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 1 }}
      className="subs-card"
      sx={{
        width: { xs: "320px", xl: "400px" },
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "20px 2.3em",
        borderRadius: "15px",
        background: "#130E144D",

        backdropFilter: "blur(26px)",
      }}
    >
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <Typography sx={{ fontSize: { xs: "14px", xl: "20px" } }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: "14px" }}>
          {price}{" "}
          <Typography component="span" sx={{ fontSize: "8px" }}>
            / {billing_period}
          </Typography>
        </Typography>

        <Typography sx={{ fontSize: "9px", fontWeight: "700" }}>
          {cv} CV
        </Typography>
      </Box>
      <Box
        sx={{
          mt: "30px",
          display: "flex",
          width: "100%",
          flexDirection: "column",
        }}
      >
        {[...Object.keys(features)].map((card, index) => {
          // const isLastItem = index === features.length - 1;
          return (
            <Box
              key={card}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                position: "relative",
                color: "#CACACA",
              }}
            >
              <Box
                sx={{ width: ".6em" }}
                component="img"
                src={features[card] ? check_icon : x_mark_icon}
              />
              <Typography
                sx={{
                  width: "100%",
                  fontSize: "16px",
                  position: "relative",
                  color: "white",
                  py: 1.1,
                  // borderBottom: isLastItem ? "" : "1px solid #cacaca",
                }}
              >
                {card}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box
        component={motion.div}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.5 }}
        sx={{
          textAlign: "center",
          mt: "30px",
          mb: "20px",
          // backgroundColor: "#fff",
          width: "100%",
          height: "22px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          className="btn-gradient"
          sx={{
            fontSize: ".9em",
            fontFamily: "SF Pro Display",
            width: "80%",
            padding: ".3em",
            background: "#FFFFFF",
            borderRadius: 2,
          }}
          onClick={() => {
            subscribe(id);
          }}
        >
          <span>Purchase NOW</span>
        </Button>
      </Box>
    </Box>
  );
}

function Membership() {
  const api = useApi();
  const [cardsList, setCardsList] = useState([]);

  let containerVariant = {
    hidden: {
      opacity: 0,
      x: -200,
    },

    visible: {
      opacity: 1,
      x: 0,
      staggerChildren: 0.2,
    },
  };

  const getPackages = async () => {
    try {
      const res = await api.get("/packages");

      const data = res.data;

      setCardsList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPackages();
  });

  return (
    <Box
      sx={{
        backgroundImage: `url(${home_bg})`,
        backgroundSize: "cover",
        height: "100%",
      }}
    >
      <Box className="container" sx={{ width: "90%" }}>
        <Box
          component={motion.div}
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          sx={{
            display: "flex",
            justifyContent: { xs: "center", xl: "space-evenly" },
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {cardsList.map((card, index) => (
            <CardComponent {...card} key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Membership;
