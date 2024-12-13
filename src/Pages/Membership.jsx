/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
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
function CardComponent({ title, price, cardItems, cv, x, y, id }) {
  // config
  const api = useApi();

  let { baseUrl } = useContext(Context);
  async function subscribe(id) {
    try {
      let res = await api.post(`${baseUrl}/subscribe`, { package_id: id });

      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
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
          {title}
        </Typography>
        <Typography sx={{ fontSize: "14px" }}>
          {price}{" "}
          <Typography component="span" sx={{ fontSize: "8px" }}>
            / Monthly
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
        {cardItems.map((card, index) => {
          const isLastItem = index === cardItems.length - 1;
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                position: "relative",
                color: "#CACACA",
              }}
            >
              <Box sx={{ width: ".6em" }} component="img" src={card.icon} />
              <Typography
                sx={{
                  width: "100%",
                  fontSize: "16px",
                  position: "relative",
                  color: "white",
                  py: 1.1,
                  borderBottom: isLastItem ? "" : "1px solid #cacaca",
                }}
              >
                {card.title}
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
  const [cardLists] = useState([
    {
      id: "1",
      title: "Essential",
      price: "99",
      cv: "25",
      items: [
        { icon: check_icon, title: "Trade alert" },
        { icon: check_icon, title: "Beginner course" },
        { icon: check_icon, title: "Basics course" },
        { icon: check_icon, title: "Live trading" },
        { icon: x_mark_icon, title: "Live sessions" },
        { icon: x_mark_icon, title: "Advance course" },
        { icon: x_mark_icon, title: "Expert course" },
        { icon: x_mark_icon, title: "Expert plus course" },
        { icon: x_mark_icon, title: "Scanners" },
        { icon: x_mark_icon, title: "private sessions with selected coach" },
        { icon: x_mark_icon, title: "Affiliate program" },
        { icon: x_mark_icon, title: "Affiliate program with extra Bonus" },
      ],

      x: -200,
      y: 0,
    },
    {
      id: 2,
      title: "Basic",
      price: "399",
      cv: "100",
      items: [
        { icon: check_icon, title: "Trade alert" },
        { icon: check_icon, title: "Beginner course" },
        { icon: check_icon, title: "Basics course" },
        { icon: x_mark_icon, title: "Live trading" },
        { icon: check_icon, title: "Live sessions" },
        { icon: x_mark_icon, title: "Advance course" },
        { icon: x_mark_icon, title: "Expert course" },
        { icon: x_mark_icon, title: "Expert plus course" },
        { icon: x_mark_icon, title: "Scanners" },
        { icon: x_mark_icon, title: "private sessions with selected coach" },
        { icon: x_mark_icon, title: "Affiliate program" },
        { icon: x_mark_icon, title: "Affiliate program with extra Bonus" },
      ],

      x: 0,
      y: -200,
    },

    {
      id: 3,
      title: "Premium",
      price: "749",
      cv: "200",
      items: [
        { icon: check_icon, title: "Trade alert" },
        { icon: check_icon, title: "Beginner course" },
        { icon: check_icon, title: "Basics course" },
        { icon: check_icon, title: "Live trading" },
        { icon: check_icon, title: "Live sessions" },
        { icon: check_icon, title: "Advance course" },
        { icon: x_mark_icon, title: "Expert course" },
        { icon: x_mark_icon, title: "Expert plus course" },
        { icon: check_icon, title: "One Scanners" },
        { icon: x_mark_icon, title: "private sessions with selected coach" },
        { icon: x_mark_icon, title: "Affiliate program" },
        { icon: x_mark_icon, title: "Affiliate program with extra Bonus" },
      ],

      x: 200,
      y: 0,
    },

    {
      id: 4,
      title: "Pro",
      price: "1499",
      cv: "500",
      items: [
        { icon: check_icon, title: "Trade alert" },
        { icon: check_icon, title: "Beginner course" },
        { icon: check_icon, title: "Basics course" },
        { icon: check_icon, title: "Live trading" },
        { icon: check_icon, title: "Live sessions" },
        { icon: check_icon, title: "Advance course" },
        { icon: check_icon, title: "Expert course" },
        { icon: x_mark_icon, title: "Expert plus course" },
        { icon: check_icon, title: "All scanners" },
        { icon: check_icon, title: "4 private sessions with selected coach" },
        { icon: check_icon, title: "Affiliate program" },
        { icon: check_icon, title: "Affiliate program with extra Bonus" },
      ],

      x: -200,
      y: 0,
    },

    {
      id: 5,
      title: "Premium",
      price: "749",
      cv: "600",
      items: [
        { icon: check_icon, title: "Trade alert" },
        { icon: check_icon, title: "Beginner course" },
        { icon: check_icon, title: "Basics course" },
        { icon: check_icon, title: "Live trading" },
        { icon: check_icon, title: "Live sessions" },
        { icon: check_icon, title: "Advance course" },
        { icon: check_icon, title: "Expert course" },
        { icon: check_icon, title: "Expert plus course" },
        { icon: check_icon, title: "All scanners" },
        { icon: check_icon, title: "4 private sessions with selected coach" },
        { icon: check_icon, title: "Affiliate program" },
        { icon: check_icon, title: "Affiliate program with extra Bonus" },
      ],

      x: 200,
      y: 0,
    },
  ]);

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
          {cardLists.map((card, index) => (
            <CardComponent
              key={index}
              title={card.title}
              price={card.price}
              cardItems={card.items}
              cv={card.cv}
              x={card.x}
              y={card.y}
              id={card.id}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Membership;
