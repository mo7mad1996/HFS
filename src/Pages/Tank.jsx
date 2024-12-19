import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import useApi from "@/api";
import { Box, Button, Typography, Pagination } from "@mui/material";
import { Context } from "@/Context";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const background = "linear-gradient(280.13deg, #DC4B9A 40.3%, #51D5F5 59.7%)";

function Tank() {
  // config
  const api = useApi();
  const { user } = useContext(Context);

  // data
  const [tanks, setTanks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // methods
  const getTanks = async () => {
    try {
      const res = await api.get(`/user-tank?page=${page}`);

      const data = res.data.tank;

      setTanks(data.data);

      setPages(data.last_page);
    } catch (err) {
      console.error(err);
    }
  };

  // on component rendered
  useEffect(() => {
    getTanks();
  }, [page]);

  // render
  return (
    <div className="container">
      {tanks.length ? (
        <>
          <Box
            sx={{
              maxWidth: "1200px",
              margin: "auto",
              // height: { xs: "288px", xl: "288px" },
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
              <Typography sx={{ fontSize: "19px" }}>
                Your ID: {user.id_code}
              </Typography>
            </Box>
            {tanks.map((member, n) => (
              <RenderMember key={n} {...member} getTanks={getTanks} />
            ))}
          </Box>

          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Pagination
              sx={{ margin: "30px auto", width: "max-content" }}
              color="white"
              count={pages}
              page={page}
              onChange={(e, n) => setPage(n)}
            />
          </ThemeProvider>
        </>
      ) : (
        <Box component="h2" sx={{ textAlign: "center", p: 4, my: 3 }}>
          No Data
        </Box>
      )}
    </div>
  );
}

export default Tank;

function RenderMember({ member_name, member_id, getTanks, member_package }) {
  const api = useApi();
  const [loading, setLoading] = useState(false);

  const append = async (placement) => {
    try {
      setLoading(true);
      const res = await api.post("/place-referral", {
        placement,
        referral_id: member_id,
      });

      getTanks();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = () => {};

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
          {member_package && (
            <Button
              variant="outlined"
              color="error"
              disabled={loading}
              onClick={() => deleteUser()}
            >
              Delete
            </Button>
          )}
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
