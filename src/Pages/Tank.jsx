import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import useApi from "@/api";
import { Box, Button, Typography } from "@mui/material";
import { Context } from "@/Context";

const background = "linear-gradient(280.13deg, #DC4B9A 40.3%, #51D5F5 59.7%)";

function Tank() {
  // config
  const api = useApi();
  const { user } = useContext(Context);

  // data
  const [tanks, setTanks] = useState([]);

  // methods
  const getTanks = async () => {
    try {
      const res = await api.get("/user-tank");

      const data = res.data.tank;

      setTanks(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // on component rendered
  useEffect(() => {
    getTanks();
  }, []);

  // render
  return (
    <div className="container">
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "auto",
          height: { xs: "288px", xl: "288px" },
          borderRadius: "15px",
          mt: "1em",
        }}
      >
        <Box
          sx={{
            background,
            height: "71px",
            borderRadius: "15px 15px 0 0",
            display: "flex",
            justifyContent: "space-between",
            px: "30px",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "19px" }}>Tank</Typography>
          <Typography sx={{ fontSize: "19px" }}>Your ID: {user.id}</Typography>
        </Box>
        {tanks.map((member, n) => (
          <RenderMember key={n} {...member} getTanks={getTanks} />
        ))}
      </Box>
    </div>
  );
}

export default Tank;

function RenderMember({ member_name, member_id, getTanks }) {
  const api = useApi();
  const [loading, setLoading] = useState(false);

  const append = async (placement) => {
    try {
      setLoading(true);
      const res = await api.post("/place-referral", {
        placement,
        referral_id: member_id,
      });

      console.log(res);
      getTanks();
    } catch (err) {
      toast.error(err.response?.data?.messaage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "auto",
        px: "30px",
        py: "30px",
        backgroundColor: "#091B29",
        justifyContent: "space-between",
        textAlign: "center",
        display: "flex",
        "&:hover": {
          bgcolor: "#794Bd922",
        },
      }}
    >
      <Typography>{member_name}</Typography>
      <Typography>
        <Box
          sx={{
            display: "flex",
            gap: "1em",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            disabled={loading}
            onClick={() => append("left")}
          >
            To Left
          </Button>
          <Button
            variant="outlined"
            color="primary"
            disabled={loading}
            onClick={() => append("right")}
          >
            To Right
          </Button>
        </Box>
      </Typography>
    </Box>
  );
}
