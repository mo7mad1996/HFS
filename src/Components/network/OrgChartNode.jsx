// css
import css from "./style.module.css";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import { ExpandMore, Remove } from "@mui/icons-material";

// assets
import UserPlaceholder from "@/assets/images/placeholder/user.png";

const OrgChartNode = ({
  user_name,
  rank,
  user_image,
  left_leg_member,
  right_leg_member,
}) => {
  const [isChildrenVisible, setIsChildrenVisible] = useState(false);

  const handleToggleChildren = () => {
    setIsChildrenVisible(!isChildrenVisible);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 3,
      }}
    >
      <Box
        sx={{
          width: "225px",
          height: "152px",
          borderRadius: "15px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            background:
              "linear-gradient(124.86deg, #63CCEC 7.03%, #E44896 92.97%)",
            // width: "100%",
            height: "40%",
            borderRadius: "15px 15px 0 0",
          }}
        ></Box>

        <Box
          sx={{
            backgroundColor: "#02070B",
            height: "60%",
            borderRadius: "0 0 15px 15px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "13px", color: "#fff" }}>
            {user_name}
          </Typography>
          <Typography sx={{ fontSize: "10px", color: "#fff" }}>
            {rank}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            overflow: "hidden",
          }}
        >
          <img
            src={user_image || UserPlaceholder}
            alt={`${name}'s picture`}
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
        </Box>
      </Box>
      {(left_leg_member || right_leg_member) && (
        <IconButton
          onClick={handleToggleChildren}
          sx={{ marginTop: 1, color: "#fff" }}
        >
          {isChildrenVisible ? <Remove /> : <ExpandMore />}
        </IconButton>
      )}

      {isChildrenVisible && (
        <>
          {left_leg_member && right_leg_member && (
            <div className={css.divider}>
              <span>L</span>
              <div className={css.line}></div>
              <span>R</span>
            </div>
          )}
          <Box sx={{ display: "flex", gap: 2 }}>
            {left_leg_member && <OrgChartNode {...left_leg_member} />}
            {right_leg_member && <OrgChartNode {...right_leg_member} />}
          </Box>
        </>
      )}
    </Box>
  );
};

export default OrgChartNode;
