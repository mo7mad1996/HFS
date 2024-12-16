import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid2,
  Divider,
} from "@mui/material";
import { useState } from "react";
import logo from "@/assets/images/HFSLOGO.png";

import css from "./style.module.css";

// import brand from "../../assets/brand.png";
import instagramIcon from "@/assets/images/instagram.png";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { FaMap, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";

function Footer() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const firebaseConfig = {
    apiKey: "AIzaSyBaPeUGhkENHVruQFcK2n7o0MIfYa0zWkE",
    authDomain: "suggestion-form-520a9.firebaseapp.com",
    projectId: "suggestion-form-520a9",
    storageBucket: "suggestion-form-520a9.appspot.com",
    messagingSenderId: "523137805109",
    appId: "1:523137805109:web:70e608ce0624f366953a7c",
  };
  const handleSubmit = async () => {
    if (!name || !age || !email) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await emailjs.send(
        "service_1k9zj0q",
        "template_on70taw",
        {
          from_name: name,
          from_email: email,
          message: comment,
          to_email: "abdelrahemanhamed@gmail.com",
        },
        "kEnx-izGC3-miUZRo"
      );

      alert("Email sent and data stored successfully!");
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send email or store data.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        width: "100%",
        py: { xs: 4, md: 8 },
        color: "#fff",
        mt: "12px",
      }}
    >
      <Container>
        <Grid2 container spacing={2} sx={{ mt: "10px" }}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: { xs: "center", md: "flex-start" },
                mb: { xs: 4, md: 0 },
                textAlign: { xs: "center", md: "left" },
                gap: "1em",
                // transform: { lg: "translate(-60px,-30px)" },
              }}
            >
              <Box
                component="img"
                src={logo}
                sx={{ mb: { xs: 2, md: 0 }, height: "50px" }}
              />
              <Box
                sx={{
                  color: "gray",
                  fontSize: { xs: "14px", md: "18px", xl: "25px" },
                  // fontFamily: "TanseekModernProArabic-ExBold",
                  textAlign: { xs: "center", md: "left" },
                  mb: { xs: 4, md: 0 },
                }}
              >
                <Typography>
                  Empowering traders with real-time tools,
                </Typography>
                <Typography>
                  expert education, and a strong <b>and a strong</b>
                </Typography>

                <Typography>community. </Typography>
              </Box>
            </Box>

            <Box className={css.social_links}>
              <a href="#" target="_blank">
                <FaFacebookF
                  className={css._icon}
                  style={{ color: "#4267B2" }}
                />
              </a>

              <a href="#" target="_blank">
                <FaYoutube className={css._icon} style={{ color: "#FF0000" }} />
              </a>
              <a href="#" target="_blank">
                <FaInstagram
                  className={css._icon}
                  style={{ color: "#7b2672" }}
                />
              </a>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography
              className={css.sectionTitle}
              sx={{
                fontSize: { xs: "16px", md: "20px", xl: "22px" },
              }}
            >
              Quick Links
            </Typography>

            <Box
              sx={{
                fontSize: { xs: "20px", md: "25px", xl: "30px" },
                display: "flex",
              }}
            >
              <Box>
                <Typography className={css.item}>About Us</Typography>
                <Typography className={css.item}>Support</Typography>
                <Typography className={css.item}>Academy</Typography>
              </Box>
              <Box>
                <Typography className={css.item}>
                  Terms and Conditions
                </Typography>
                <Typography className={css.item}>Privacy Policy</Typography>
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "20px", xl: "22px" },
              }}
              className={css.sectionTitle}
            >
              Get in Touch
            </Typography>

            <Box className={css.item}>
              <IoCall className={css.icon} />
              <Typography>971 - 555555555</Typography>
            </Box>
            <Box className={css.item}>
              <FaMap className={css.icon} />
              <Typography>Dubai - UAE</Typography>
            </Box>
            <Box className={css.item}>
              <FaEnvelope className={css.icon} />
              <Typography>info@tradingsociety.net</Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Container>

      <Divider sx={{ backgroundColor: "#C3AD57", my: "12px" }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "cneter",
          mt: "12px",
          height: { xs: "30px", lg: "0px" },
          color: "text.secondary",
        }}
      >
        <Typography sx={{ fontSize: "25px" }}>
          © {new Date().getFullYear()} HFS. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
