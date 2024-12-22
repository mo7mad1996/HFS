import toast from "react-hot-toast";

// assets
import logo from "@/assets/images/HFSLOGO.png";
import membership from "@/assets/images/pages_assets/membership.png";
import dashboard from "@/assets/images/pages_assets/dashboard.png";
import wallet from "@/assets/images/pages_assets/wallet.png";
import network from "@/assets/images/pages_assets/network.png";
import transactions from "@/assets/images/pages_assets/transactions.png";
import sidebar_bg from "@/assets/images/pages_assets/sidebar_bg.png";

//
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "@/Context";
import { motion } from "framer-motion";

// css
import css from "./style.module.css";

import useApi from "@/api";

function Sidebar() {
  const api = useApi();
  const { sidebarOpen, setSidebarOpen } = useContext(Context);
  const sidebarRef = useRef(null);
  const activeLinkRef = useRef(null);
  const navigate = useNavigate();

  const [links] = useState([
    { name: "Dashboard", path: "/Dashboard", icon: dashboard },
    { name: "Membership", path: "/Membership", icon: membership },
    { name: "Wallet", path: "/wallet", icon: wallet },
    { name: "Network", path: "/Network", icon: network },
    { name: "Transactions", path: "/Transactions", icon: transactions },
    { name: "TANK", path: "/tank", icon: transactions },
    { name: "Profile", path: "/profile", icon: transactions },
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth < 600 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSidebarOpen]);

  const handleLinkClick = (e, path) => {
    navigate(path);

    if (activeLinkRef.current) {
      activeLinkRef.current.classList.remove("active");
    }
    e.currentTarget.classList.add("active");
    activeLinkRef.current = e.currentTarget;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goToTS = async () => {
    api
      .get("/sync-user")
      .then((res) => {
        const token = encodeURIComponent(res.data.token);

        window.location.href = `https://tradingsociety.net/redirect?token=${token}`;
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message);
      });
  };

  return (
    <Box
      ref={sidebarRef}
      sx={{
        width: sidebarOpen ? "260px" : "0",
        transition: "width 400ms",
        height: "100vh",
        backgroundImage: `url(${sidebar_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        position: { xs: "fixed", sm: "sticky" },
        left: "0",
        top: "0",
        bottom: "0",
        backgroundColor: "#141017",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        zIndex: "99999",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          width: "88px",
          height: "60px",
          mx: "auto",
          mt: "30px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <Box
          component="img"
          src={logo}
          sx={{ width: "100%", height: "100%" }}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {links.map((link) => (
          <Box
            key={link.name}
            component={motion.div}
            sx={{ cursor: "pointer" }}
            onClick={(e) => handleLinkClick(e, link.path)}
            initial={{
              scale: 1,
              x: 0,
              background: `linear-gradient(0deg, transparent, transparent)`,
            }}
            whileHover={{
              scale: 1.1,
              x: 20,
              background:
                "linear-gradient(124.86deg, #63ccec 7.03%, #e44896 92.97%)",
              borderRadius: "10px",
            }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                height: "53px",
                textAlign: "center",
                width: "60%",
                mx: "auto",
              }}
            >
              <Box sx={{ width: "20px", height: "20px" }}>
                <Box
                  component="img"
                  src={link.icon}
                  sx={{ width: "100%", height: "100%" }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                {link.name}
              </Typography>
            </Box>
          </Box>
        ))}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            height: "53px",
            textAlign: "center",
            fontSize: "15px",
            fontWeight: "700",
            color: "#c1b4dd",
            mx: "auto",
            cursor: "pointer",
          }}
          // href="https://tradingsociety.net/"
          // href="https://api.hfssociety.com/api/v1/sync-user"
          target="_blank"
          onClick={goToTS}
        >
          Trading society
        </Box>

        <Button
          sx={{
            width: "154px",
            height: "25px",
            margin: "auto",
            p: "1em",
            background: "linear-gradient(90deg, #E14696 0%, #46DFFC 100%)",
            color: "#fff",
            fontSize: "15px",
            fontWeight: "700",
            mt: 2,
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Sidebar;
