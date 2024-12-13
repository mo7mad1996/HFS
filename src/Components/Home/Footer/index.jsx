// components
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

// assets
import img from "@/assets/images/vector.png";

// css
import css from "./style.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className="container">
        <Box
          className={css.flex}
          sx={{
            display: { xs: "block", md: "flex" },
          }}
        >
          <div className={css.logo}>
            <img src={img} alt="..." />
            <span>HFS</span>
          </div>

          <Link to="/home">Home</Link>
          <Link to="/home">About</Link>
          <Link to="/home">Trading society</Link>
          <Link to="/home">More</Link>
        </Box>

        <hr />
        <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
      </div>
    </footer>
  );
}
