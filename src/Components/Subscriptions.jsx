/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import check_icon from "@/assets/check_icon.png";
import x_mark_icon from "@/assets/x_mark_icon.png";
import { useState } from "react";

function CardComponent({ title, price, cardItems }) {
  return (
    <Box
      sx={{
        width: "auto",
        backgroundColor: "transparent",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "10px",
        gap: "30px",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "12px" }}>{title}</Typography>
        <Typography sx={{ fontSize: "14px" }}>
          {price}{" "}
          <Typography component="span" sx={{ fontSize: "8px" }}>
            / Monthly
          </Typography>
        </Typography>
      </Box>
      <Box
        sx={{
          mt: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
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
              <Box
                sx={{ width: "7px", height: "7px" }}
                component="img"
                src={card.icon}
              />

              <Typography
                sx={{
                  width: "100%",
                  "&::after": !isLastItem && {
                    content: '""',
                    position: "absolute",
                    bottom: "-10px",
                    border: "1px solid #fff",
                    width: "100%",
                    left: "20px",
                    fontSize: "11px",
                    borderColor: "#CACACA",
                  },
                }}
              >
                {card.title}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ textAlign: "center", ml: "30px" }}>
        <Typography>Affiliate program with extra Bonus 25 CV</Typography>
        <Button
          sx={{
            width: "146px",
            height: "22px",
            backgroundColor: "#FFFFFF",
            my: "50px",
            color: "#000",
            borderRadius: "5px",
            fontSize: "10px",
          }}
        >
          Purchase NOW
        </Button>
      </Box>
    </Box>
  );
}

function Subscriptions() {
  const [cardLists] = useState([
    {
      title: "Essential",
      price: "99",
      items: [
        { icon: check_icon, title: "Trade alert" },
        { icon: check_icon, title: "Beginner course" },
        { icon: check_icon, title: "Basics course" },
        { icon: check_icon, title: "Live trading" },
        { icon: x_mark_icon, title: "Live sessions" },
        { icon: x_mark_icon, title: "Advance course" },
        { icon: x_mark_icon, title: "Expert course" },
        { icon: x_mark_icon, title: "Expert plus course" },
        { icon: x_mark_icon, title: "All scanner" },
        { icon: x_mark_icon, title: "private sessions with selected coach" },
      ],
    },
    {
      title: "Basic",
      price: "399",
      items: [
        { icon: check_icon, title: "Trade alert" },
        { icon: check_icon, title: "Beginner course" },
        { icon: check_icon, title: "Basics course" },
        { icon: x_mark_icon, title: "Live trading" },
        { icon: check_icon, title: "Live sessions" },
        { icon: x_mark_icon, title: "Advance course" },
        { icon: x_mark_icon, title: "Expert course" },
        { icon: x_mark_icon, title: "Expert plus course" },
        { icon: x_mark_icon, title: "All scanner" },
        { icon: x_mark_icon, title: "private sessions with selected coach" },
      ],
    },
    {
      title: "Premium",
      price: "749",
      items: [
        { icon: check_icon, title: "Trade alert" },
        { icon: check_icon, title: "Beginner course" },
        { icon: check_icon, title: "Basics course" },
        { icon: check_icon, title: "Live trading" },
        { icon: check_icon, title: "Live sessions" },
        { icon: check_icon, title: "Advance course" },
        { icon: x_mark_icon, title: "Expert course" },
        { icon: x_mark_icon, title: "Expert plus course" },
        { icon: check_icon, title: "One scanner" },
        { icon: x_mark_icon, title: "private sessions with selected coach" },
      ],
    },
    {
      title: "Pro",
      price: "1499",
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
        { icon: check_icon, title: "private sessions with selected coach" },
      ],
    },
    {
      title: "Premium",
      price: "749",
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
        { icon: check_icon, title: "private sessions with selected coach" },
      ],
    },
  ]);

  return (
    <Box>
      <Box className="container" sx={{ width: "85%" }}>
        <Box
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >
          {cardLists.map((card, index) => (
            <CardComponent
              key={index}
              title={card.title}
              price={card.price}
              cardItems={card.items}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Subscriptions;
