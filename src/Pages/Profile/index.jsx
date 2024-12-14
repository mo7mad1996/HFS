import {
  CardActions,
  Button,
  Typography,
  CardContent,
  Card,
  Modal,
  Avatar,
  Box,
  Chip,
} from "@mui/material";

import { AiOutlineFileDone } from "react-icons/ai";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "@/Context";

import css from "./style.module.css";

import useApi from "@/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  // config
  const { register, handleSubmit } = useForm();
  const api = useApi();
  let { setUser: setUserContext } = useContext(Context);

  // data
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // methods
  const getUserData = async () => {
    try {
      const res = await api.get("/user/data");
      const data = res.data["user data"];

      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [deleteModal, setDeleteModal] = useState(false);

  const submit = async (payload) => {
    try {
      setLoading(true);
      const res = await api.post("/user/edit", payload);

      const data = res.data;

      setUser(data.user);
      setUserContext(data.user);
      localStorage.setItem("user", JSON.stringify(user));
      handleClose();
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // on Component render
  useEffect(() => {
    getUserData();
  }, []);

  if (user)
    // render
    return (
      <Box sx={{ p: 7 }}>
        <div className={css.cookieCard}>
          <div className={css.flex}>
            <Avatar src={user.image} sx={{ width: 60, height: 60 }} />

            <p className={css.cookieHeading}>
              {user.name || user.user_first_name}.
              <br />
              <Chip
                size="small"
                color="info"
                label={user.status}
                // deleteIcon={< />}
                icon={<AiOutlineFileDone />}
              />
            </p>
          </div>
          <div className={css.cookieDescription}>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
          <div className={css.spaceBetween}>
            <button onClick={handleOpen} className={css.acceptButton}>
              Edit Profile
            </button>

            {/* <Button
              sx={{ display: "block", margin: "0 0 0 auto", color: "#950613" }}
              onClick={() => setDeleteModal(true)}
            >
              Delete account
            </Button> */}
          </div>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              display: "grid",
              placeContent: "center",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            <Card
              sx={{ minWidth: "500px", pointerEvents: "auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Edit Profile
                </Typography>
                <hr />
                <form onSubmit={handleSubmit(submit)} className={css.form}>
                  <div className={css.coolinput}>
                    <label htmlFor="input1" className={css.text}>
                      Name :
                    </label>
                    <input
                      id="input1"
                      className={css.input}
                      defaultValue={user.name}
                      {...register("name")}
                    />
                  </div>
                  <div className={css.coolinput}>
                    <label htmlFor="input3" className={css.text}>
                      Phone:
                    </label>
                    <input
                      id="input3"
                      className={css.input}
                      defaultValue={user.phone}
                      {...register("phone")}
                    />
                  </div>

                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      loading={loading.toString()}
                      disabled={loading}
                      type="submit"
                    >
                      Update
                    </Button>
                  </CardActions>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Modal>

        <DeleteModal
          open={deleteModal}
          handleClose={() => setDeleteModal(false)}
        />
      </Box>
    );
  else return <div>Error</div>;
}

function DeleteModal({ open, handleClose }) {
  // config
  const navigate = useNavigate();
  const api = useApi();

  // data
  const [loading, setLoading] = useState(false);

  // methods
  const handleDelete = async () => {
    try {
      setLoading(true);
      const req = await api.post("/user/edit");
      handleClose();

      toast.success(req.data.message);
      handleLogout();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <Card
          sx={{ minWidth: "500px", pointerEvents: "auto" }}
          onClick={(e) => e.stopPropagation()}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Are you sure you want delete this profile?
            </Typography>
          </CardContent>

          <CardActions>
            <Box sx={{ m: "0 20px 0 auto" }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                disabled={loading}
                loading={loading.toString()}
                sx={{ mx: 3 }}
              >
                Yes
              </Button>
              <Button onClick={handleClose}>No</Button>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
}
