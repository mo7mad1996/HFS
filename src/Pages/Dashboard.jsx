/* eslint-disable no-irregular-whitespace */
import { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// components
import { Box, IconButton, Typography } from "@mui/material";

// context || Api
import { Context } from "@/Context";
import useApi from "@/api";

// assets
import copy_icon from "@/assets/images/pages_assets/copy_icon.png";
import vector1 from "@/assets/images/pages_assets/vector1.png";
import arrow from "@/assets/images/pages_assets/arrow.png";
import check_icon from "@/assets/images/layout/check_icon.png";
import x_mark_icon from "@/assets/images/layout/x_mark_icon.png";

function Dashboard() {
  // config
  const api = useApi();
  let { sidebarOpen, user, setUser } = useContext(Context);
  const navigate = useNavigate();

  // data
  const [volume, setVolume] = useState({
    left_leg_volume: "-",
    right_leg_volume: "-",
  });
  const [count, setCount] = useState({
    left_downlines_count: "-",
    right_downlines_count: "-",
  });
  const referral = `${window.location.origin}/referral?u=${user.id}`;

  const [rows, setRows] = useState([
    { right: "0", left: "0", rank: "ROYAL CROWN DIAMOND" },
    { right: "0", left: "0", rank: "CROWN DIAMOND" },
    { right: "0", left: "0", rank: "BLACK DIAMOND" },
    { right: "0", left: "0", rank: "BLUE DIAMOND" },
    { right: "0", left: "0", rank: "DIAMOND" },
    { right: "0", left: "0", rank: "EMERALD" },
    { right: "0", left: "0", rank: "RUBY" },
    { right: "0", left: "0", rank: "SAPPHIRE" },
    { right: "0", left: "0", rank: "JADE" },
    { right: "0", left: "0", rank: "EXACTIVE" },
  ]);
  const [evaluate, setEvaluate] = useState(null);
  const [err, setError] = useState(null);

  let containerVariants = {
    initial: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  // methods
  const getVolumes = async () => {
    try {
      const res = await api.get("/downlines-volume");

      const data = await res.data.notwork_voluum;

      setVolume(data);
    } catch (err) {
      toast.error(err.response?.data?.message);

      console.error(err);
    }
  };
  const getCounts = async () => {
    try {
      const res = await api.get("/downline-counts");

      const data = await res.data.count;

      setCount(data);
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.error(err);
    }
  };
  const getMemberDownLine = async () => {
    try {
      const res = await api.get("/members/downlines");
      const data = res.data.downline_details;
      setRows(data);
    } catch (err) {
      consol.error(err);
    }
  };
  const getUser = async () => {
    try {
      const { data } = await api.get("/user/data");

      setUser(data["user data"]);
    } catch (err) {
      console.error(err);
    }
  };

  const getRankEvaluate = async () => {
    try {
      const res = await api.get("/rank/evaluate");

      const data = res.data;
      setEvaluate(data);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const copyReferral = async () => {
    try {
      await navigator.clipboard.writeText(referral);
      toast.success("Referral Link has been copied to clipboard");
    } catch (error) {
      toast.error("Can't copy the `Referral Link`");
    }
  };

  // on render
  useEffect(() => {
    getVolumes();
    getCounts();
    getMemberDownLine();
    getRankEvaluate();
    getUser();
  }, []);

  return (
    <Box
      component={motion.div}
      // className="container"
      variants={containerVariants}
      initial="initial"
      animate="visible"
      transition={{ duration: 3 }}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        gap: "50px",
        transition: "400ms all ",
        p: "50px",
      }}
    >
      {/* left Side */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "50px", xl: "100px" },
        }}
      >
        <Box
          sx={{
            width: sidebarOpen
              ? { xs: "100%", md: "600px", xl: "900px" }
              : { xs: "100%", md: "700px", xl: "900px" },
            height: { xs: "288px", xl: "288px" },
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              background:
                "linear-gradient(280.13deg, #DC4B9A 40.3%, #51D5F5 59.7%)",
              height: "71px",
              borderRadius: "15px 15px 0 0",
              display: "flex",
              justifyContent: "space-between",
              px: "30px",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "19px" }}>LEFT</Typography>
            <Typography sx={{ fontSize: "19px" }}>Network status</Typography>
            <Typography sx={{ fontSize: "19px" }}>RIGHT </Typography>
          </Box>

          <Box
            sx={{
              height: "auto",
              px: "30px",
              py: "50px",
              backgroundColor: "#091B29",
              display: "flex",
              justifyContent: "space-between",
              textAlign: "center",
              borderRadius: "0 0  15px 15px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Typography> 0</Typography>
              <Typography>{volume.left_leg_volume}</Typography>
              <Typography>{count.left_downlines_count}</Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Typography>Rank volume</Typography>
              <Typography>Total Network volume</Typography>
              <Typography>Total down line </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Typography>0</Typography>
              <Typography>{volume.right_leg_volume}</Typography>
              <Typography>{count.right_downlines_count}</Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "auto",
            height: "100%",
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              background:
                "linear-gradient(280.13deg, #DC4B9A 40.3%, #51D5F5 59.7%)",
              height: "71px",
              borderRadius: "15px 15px 0 0",
              display: "flex",
              justifyContent: "space-between",
              px: "30px",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "19px" }}>LEFT</Typography>
            <Typography sx={{ fontSize: "19px" }}>Network status</Typography>
            <Typography sx={{ fontSize: "19px" }}>RIGHT </Typography>
          </Box>
          <Box
            sx={{
              height: "auto",
              borderRadius: "0 0 15px 15px",
              backgroundColor: "#091B29",
              textAlign: "center",
              pb: "30px",
            }}
          >
            {/* 1 row */}

            {rows.map((row, index) => {
              const isLastRow = index === rows.length - 1;
              return (
                <Box key={index} sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "space-between",
                      width: "88%",
                      mx: "auto",
                      p: "10px",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px" }}>
                      {row.left}
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      {row.rank}
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      {row.right}
                    </Typography>
                  </Box>
                  {!isLastRow && (
                    <Box sx={{ border: "0.5px solid #FFFFFF" }}></Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* Right Side */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            width: "355px",
            height: "133px",
            background:
              "linear-gradient(116.25deg, #51D5F5 13.83%, #762853 33.13%, #02070B 86.17%)",
            borderRadius: "15px",
            p: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography>Referral link</Typography>

            <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Box
                sx={{
                  width: "228px",
                  height: "38px",
                  borderRadius: "5px",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  px: "10px",
                }}
              >
                <Typography
                  sx={{
                    backgroundColor: "#FFFFFF",
                    color: "black",
                    mask: "linear-gradient(90deg, black 70%, transparent)",
                  }}
                >
                  <span className="oneLine" style={{ width: "210px" }}>
                    {referral}
                  </span>
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton onClick={copyReferral}>
                  <Box
                    component="img"
                    src={copy_icon}
                    sx={{ width: "18px", height: "18px" }}
                  />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            borderRadius: "5px",
            backgroundColor: "rgb(13, 46, 71)",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            p: "1em",
            my: "1em",
          }}
        >
          <Typography
            sx={{
              fontSize: "15px",
              lineHeight: "2",
              // letterSpacing: "8px",
            }}
          >
            Sponsor
            <br />
            {user.member?.sponsor_id}
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
          whileHover={{
            // y: -200,
            // x: -400,
            // rotate: 360,
            // scale: 2,
            backgroundColor: "#2B6145",
          }}
          transition={{ duration: 0.2, type: "easeInOut" }}
          sx={{
            width: "355px",
            height: "163px",
            backgroundColor: "#061622",
            mt: "130px",
            mb: "30px",
            borderRadius: "15px",
            p: "15px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/MembershipTier");
          }}
        >
          <Typography
            sx={{
              fontSize: "15px",
              lineHeight: "17.9px",
              letterSpacing: "8px",
            }}
          >
            Current
            <br />
            Rank
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "700",
                letterSpacing: "8px",
                alignSelf: "center",
              }}
            >
              {user.member?.rank_id}
            </Typography>

            <Box>
              <Box component="img" src={arrow} sx={{ width: "20.81px" }} />
            </Box>
          </Box>
          <Box
            sx={{
              backgroundImage: `url(${vector1})`,
              width: "133px",
              height: "133px",
              backgroundSize: "cover",
              objectFit: "cover",
              backgroundPosition: "center",
              position: "absolute",
              top: "-60px",
              right: "30px",
            }}
          ></Box>
        </Box>

        <Box
          sx={{
            mt: "10px",
            width: "355px",
            height: "auto",
            border: "1px solid #061622",
            backgroundColor: "#02070B",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: "30px",
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              width: "90%",
              height: "90%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography>Criteria for next Rank</Typography>

            {err && <Typography sx={{ fontSize: "15px" }}>err</Typography>}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: "20px",
              }}
            >
              <Typography sx={{ fontSize: "15px" }}>
                1. Next Rank: {evaluate?.next_rank}
              </Typography>

              {/* <Box
                sx={{ width: "13px", height: "13px" }}
                component="img"
                src={x_mark_icon}
              /> */}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: "20px",
              }}
            >
              <Typography sx={{ fontSize: "15px" }}>
                2. Left only Downline RV Required/Total {" "}
                {evaluate?.progress?.left_volume}
              </Typography>

              {/* <Box
                sx={{ width: "13px", height: "13px" }}
                component="img"
                src={x_mark_icon}
              /> */}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: "20px",
              }}
            >
              <Typography sx={{ fontSize: "15px" }}>
                3. Right only Downline RV Required/Total {" "}
                {evaluate?.progress?.right_volume}
              </Typography>

              {/* <Box
                sx={{ width: "13px", height: "13px" }}
                component="img"
                src={check_icon}
              /> */}
            </Box>

            <Typography sx={{ mt: "20px" }}>
              3. Total Direct  {evaluate?.progress?.direct_referrals}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
