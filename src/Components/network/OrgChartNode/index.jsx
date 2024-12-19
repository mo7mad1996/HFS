import { useState, useEffect } from "react";
import { Typography, Box, IconButton, Avatar } from "@mui/material";
import { ExpandMore, Remove } from "@mui/icons-material";

// css
import css from "./style.module.css";

// api
import useApi from "@/api";

// assets
import UserPlaceholder from "@/assets/images/placeholder/user.png";

const OrgChartNode = ({ id, id_code, user_name, rank, user_image, r, l }) => {
  // config
  const api = useApi();

  // data
  const [right_leg_member, setRight] = useState(null);
  const [left_leg_member, setLeft] = useState(null);
  const [isChildrenVisible, setIsChildrenVisible] = useState(false);

  const handleToggleChildren = () => {
    setIsChildrenVisible(!isChildrenVisible);
  };

  const getLegs = async (id) => {
    try {
      const res = await api.get(`/get-direct-downline-members/${id}`);

      const data = res.data.members;

      setRight(data.right_leg_member);
      setLeft(data.left_leg_member);
    } catch (err) {
      console.error(err);
    }
  };

  // on component render
  useEffect(() => {
    getLegs(id);
  }, [id]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 3,
        position: "relative",
      }}
    >
      {r && <div className={css.r}>R</div>}
      {l && <div className={css.l}>L</div>}
      <Box
        sx={{
          width: "225px",
          // height: "152px",
          borderRadius: "15px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            background:
              "linear-gradient(124.86deg, #63CCEC 7.03%, #E44896 92.97%)",
            // width: "100%",
            borderRadius: "15px 15px 0 0",
          }}
        >
          <Avatar
            src={user_image}
            alt={`${user_name}'s picture`}
            sx={{
              width: "80px",
              height: "80px",
              backgroundColor: "#fff",
              position: "relative",
              // top: "30%",
              // left: "50%",
              margin: "auto",
              transform: "translate(0%,30%)",
              overflow: "hidden",
            }}
          />
        </Box>

        <Box
          sx={{
            backgroundColor: "#02070B",
            // height: "60%",
            padding: "20% 0",
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
            id: {id_code}
          </Typography>
          <Typography sx={{ fontSize: "10px", color: "#fff" }}>
            {rank}
          </Typography>
        </Box>

        {/* 
        <Box
         
        >
          <img
            src={user_image || UserPlaceholder}
            alt={`${name}'s picture`}
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
        </Box> */}
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
              <span></span>
              <div className={css.line}></div>
              <span></span>
            </div>
          )}
          <Box sx={{ display: "flex", gap: 2 }}>
            {left_leg_member && <OrgChartNode {...left_leg_member} l="1" />}
            {right_leg_member && <OrgChartNode {...right_leg_member} r="1" />}
          </Box>
        </>
      )}
    </Box>
  );
};

export default OrgChartNode;
