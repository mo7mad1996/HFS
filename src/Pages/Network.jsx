/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import useApi from "@/api";
import { Box, Button, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Context } from "@/Context";
import { useForm } from "react-hook-form";

import OrgChartNode from "@/components/network/OrgChartNode/index.jsx";

const Network = () => {
  // config
  const api = useApi();
  const { user: auth_user } = useContext(Context);
  const { register, handleSubmit } = useForm();

  console.log(auth_user);

  // data
  const [user, setUser] = useState({
    id: auth_user.id,
    user_id_code: auth_user.id_code,
    user_name: auth_user.username,
    rank: auth_user.member?.rank,
    user_image: auth_user.image,
  });

  // methods
  const submit = async (payload) => {
    try {
      const res = await api.get(`/user/data/${payload.id}`);
      const data = res.data["user data"];
      const u = {
        id: data.id,
        user_name: data.username,
        rank: data.rank,
        user_image: data.image,
      };

      setUser(u);
    } catch (err) {
      console.error(err);

      const data = err.response?.data?.message || err.message;
      // toast.error(data);
      toast.error("No User with this id");
    }
  };

  // const getNetWorkData = async () => {
  //   try {
  //     const res = await api.get("/direct-downline-members");

  //     const data = await res.data.members;
  //     setUser((u) => ({
  //       ...u,
  //       right_leg_member: data.right_leg_member,
  //       left_leg_member: data.left_leg_member,
  //     }));
  //   } catch (err) {
  //     toast.error(err.response?.data?.message);
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   getNetWorkData();
  // }, []);

  return (
    <>
      <h1>Organizational Chart</h1>
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        minScale={0.5}
        maxScale={3}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <Box
            sx={
              {
                // justifyContent: "center",
                // flexDirection: "column",
                // alignItems: "center",
                // position: "relative",
                // width: "100%",
                // height: "100%",
              }
            }
          >
            <Box sx={{ position: "sticky", top: 10, left: 10, zIndex: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => zoomIn()}
                sx={{ margin: 1 }}
              >
                Zoom In
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => zoomOut()}
                sx={{ margin: 1 }}
              >
                Zoom Out
              </Button>
              <Button
                variant="outlined"
                onClick={() => resetTransform()}
                sx={{ margin: 1 }}
              >
                Reset
              </Button>

              <form onSubmit={handleSubmit(submit)}>
                <TextField
                  variant="filled"
                  label="id"
                  size="small"
                  sx={{
                    "&.MuiTextField-root": {
                      background: "#d4d3d3 !important",
                      borderRadius: 3,
                      mx: 1,
                    },
                  }}
                  {...register("id")}
                />
                <Button variant="outlined" sx={{ margin: 1 }} type="submit">
                  Get
                </Button>
              </form>
            </Box>

            <TransformComponent>
              <OrgChartNode {...user} />
            </TransformComponent>
          </Box>
        )}
      </TransformWrapper>
    </>
  );
};

export default Network;
