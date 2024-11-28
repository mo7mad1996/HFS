import { useState, useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "@/Context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  let { baseUrl, setUser } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post(`${baseUrl}/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Handle successful login (e.g., store token, redirect)

      const { token, user } = response.data;
      toast.success("Login successful!");
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/Dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message.email[0] || "Login failed");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#161117",
      }}
    >
      <Typography variant="h4" sx={{ color: "#fff", mb: 3 }}>
        Login
      </Typography>
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 3,
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.5)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
