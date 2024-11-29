import { useEffect, useContext, useState } from "react";
import camelcaseKeys from "camelcase-keys";
import toast from "react-hot-toast";
import { Context } from "@/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// assets
import logo from "@/assets/images/HFSLOGO.png";

// components
import {
  Box,
  Button,
  Avatar,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Icon,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  BookmarkRemoveSharp,
} from "@mui/icons-material";

const Register = () => {
  // config
  const navigate = useNavigate();

  // data
  const steps = [
    "Sponsor ID",
    "Confirm Sponsor ID",
    "Account Details",
    "Personal Information",
    "Review",
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    sponsor_id: "",
    image: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({ sponsorId: "", password: "" });
  const [sponsorName, setSponsorName] = useState("");
  const { baseUrl } = useContext(Context);

  // methods
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "sponsor_id") {
      setErrors((prev) => ({ ...prev, sponsorId: "" }));
    }
  };

  const getSponsor = async () => {
    try {
      const res = await axios.get(`${baseUrl}/sponsor-data`, {
        params: { sponsor_id: formData.sponsor_id },
      });

      const dataInCamelCase = camelcaseKeys(res.data, { deep: true });
      setSponsorName(dataInCamelCase?.sponsorName || "Unknown");
      return dataInCamelCase?.status;
    } catch (err) {
      toast.error(
        err?.response?.data?.message?.sponsor_id ||
          "Error fetching sponsor data"
      );
      return false;
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setErrors({ sponsorId: "", password: "" });

    switch (activeStep) {
      case 0:
        const isValid = await getSponsor();
        if (isValid) setActiveStep((prevStep) => prevStep + 1);
        else
          setErrors((prev) => ({ ...prev, sponsorId: "Invalid Sponsor ID" }));
        break;

      case 1:
        if (isConfirmed) setActiveStep((prevStep) => prevStep + 1);
        else
          setErrors((prev) => ({
            ...prev,
            sponsorId: "You must confirm the Sponsor ID to proceed.",
          }));
        break;

      case 2:
        if (formData.password !== formData.password_confirmation)
          return setErrors((prev) => ({
            ...prev,
            password: "Passwords do not match.",
          }));

        if (!(formData.name || formData.email))
          return setErrors((prev) => ({
            ...prev,
            name: formData.name ? "" : "Name is required.",
            email: formData.email ? "" : "Email is required.",
          }));
        setActiveStep((prevStep) => prevStep + 1);
        break;

      case steps.length - 1:
        handleSubmit();
        break;
      default:
        setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleSubmit = async () => {
    try {
      const formDataWithImage = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataWithImage.append(key, value);
      });
      // formDataWithImage.append("image", formData.image);

      const res = await axios.post(`${baseUrl}/register`, formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Registration successful!");
      localStorage.setItem("token", res?.data?.user?.token);
      setIsSubmitted(true);
      navigate("/Dashboard");
    } catch (err) {
      toast.error(
        err?.response?.data?.message?.email[0] || "Error during registration"
      );
    }
  };

  if (isSubmitted)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#161117",
          padding: 2,
        }}
      >
        <Typography variant="h4" align="center">
          Thank You for Registering!
        </Typography>
        <Typography align="center">
          Your registration has been successfully submitted. We will get back to
          you shortly.
        </Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#161117",
        padding: 2,
      }}
    >
      <img src={logo} alt="HFS" height={100} />
      <Box
        sx={{
          maxWidth: 900,
          width: "100%",
          mx: "auto",
          mt: 5,
          p: 3,
          borderRadius: "18px",
          backgroundColor: "#fff",
          boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Tanseek Modern Pro Arabic",
            fontSize: { xs: "40px", sm: "60px", md: "75px" },
            fontWeight: "bold",
            textAlign: "center",
            color: "#333",
            pb: 3,
          }}
        >
          REGISTER
        </Typography>
        <Stepper
          activeStep={activeStep}
          sx={{
            width: "100%",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            mb: "20px",
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontFamily: "Tanseek Modern Pro Arabic",
                    fontSize: { xs: "14px", sm: "20px" },
                    fontWeight: "lighter",
                    color: "#51d5f5",
                    textAlign: { xs: "center", sm: "left" },
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleNext}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {activeStep === 0 && (
              <Step0 errors={errors} handleChange={handleChange} />
            )}

            {activeStep === 1 && (
              <Step1
                formData={formData}
                sponsorName={sponsorName}
                isConfirmed={isConfirmed}
                setIsConfirmed={setIsConfirmed}
                errors={errors}
              />
            )}

            {activeStep === 2 && (
              <Step2
                handleChange={handleChange}
                showPassword={showPassword}
                errors={errors}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
              />
            )}

            {activeStep === 3 && <Step3 setFormData={setFormData} />}

            {activeStep === steps.length - 1 && (
              <Review
                formData={formData}
                sponsorName={sponsorName}
                isAgreementChecked={isAgreementChecked}
                setIsAgreementChecked={setIsAgreementChecked}
              />
            )}

            {/* form controller */}
            <FormController
              handleBack={handleBack}
              activeStep={activeStep}
              steps={steps}
              isAgreementChecked={isAgreementChecked}
            />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

function Step0({ errors, handleChange }) {
  return (
    <TextField
      fullWidth
      label="Sponsor ID"
      name="sponsor_id"
      onChange={handleChange}
      error={!!errors.sponsorId}
      helperText={errors.sponsorId}
      required
    />
  );
}

function Step1({ formData, sponsorName, isConfirmed, setIsConfirmed, errors }) {
  return (
    <>
      <Typography
        variant="h6"
        textAlign={"center"}
        sx={{ color: "#000", fontSize: { xs: "16px", sm: "18px" } }}
      >
        Confirm Sponsor ID
      </Typography>
      <Typography
        variant="body1"
        textAlign={"center"}
        sx={{ color: "#000", fontSize: { xs: "14px", sm: "16px" } }}
      >
        Are you sure you want to join under the Sponsor ID:{" "}
        {formData.sponsor_id}?
      </Typography>
      <Typography sx={{ color: "#000" }}>
        <strong>Full Name: {sponsorName}</strong>
      </Typography>
      <FormControlLabel
        sx={{
          color: "#000",
          fontSize: { xs: "14px", sm: "16px" },
        }}
        control={
          <Checkbox
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
          />
        }
        label="Yes, I confirm this sponsor ID."
      />
      {errors.sponsorId && (
        <Typography color="error" sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
          {errors.sponsorId}
        </Typography>
      )}
    </>
  );
}

function Step2({
  handleChange,
  showPassword,
  errors,
  setShowPassword,
  showConfirmPassword,
}) {
  return (
    <>
      <TextField
        fullWidth
        label="Full Name"
        name="name"
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        onChange={handleChange}
        required
        error={!!errors.password}
        helperText={
          errors.password === "Passwords do not match." ? "" : errors.password
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        label="Confirm Password"
        name="password_confirmation"
        type={showConfirmPassword ? "text" : "password"}
        onChange={handleChange}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {errors.password && (
        <Typography color="error" sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
          {errors.password}
        </Typography>
      )}
    </>
  );
}

function Step3({ setFormData }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.dataTransfer?.files[0] || e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };
  const deleteFile = () => {
    setFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (file) {
      setFormData((prevData) => ({ ...prevData, image: file }));
    }
  }, [file]);

  return (
    <Box color="#333">
      {!preview ? (
        <div
          onDrop={(e) => {
            e.preventDefault();
            handleFileChange(e);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.target.style.border = "2px solid #ccc";
          }}
          style={{
            border: "2px dashed #ccc",
            padding: "20px",
            borderRadius: "5px",
            textAlign: "center",
            color: "#333",
            height: "120px",
            cursor: "pointer",
          }}
        >
          <Typography>Drag the Image here</Typography>
          <label htmlFor="Input">Or Select an Image</label>
          <input
            id="Input"
            type="file"
            onChange={(e) => handleFileChange(e)}
            style={{ display: "none" }}
          />
        </div>
      ) : (
        <div>
          <IconButton onClick={deleteFile}>
            <BookmarkRemoveSharp />
          </IconButton>
          <Avatar src={preview} sx={{ width: 56, height: 56 }} />
        </div>
      )}
    </Box>
  );
}

function Review({
  formData,
  sponsorName,
  isAgreementChecked,
  setIsAgreementChecked,
}) {
  return (
    <Box color="#333">
      <Typography variant="h4" textAlign="center">
        Review and Confirm
      </Typography>
      <Typography>
        <strong>Name:</strong> {formData.name}
      </Typography>
      <Typography>
        <strong>Email:</strong> {formData.email}
      </Typography>
      <Typography>
        <strong>Sponsor ID:</strong> {formData.sponsor_id} ({sponsorName})
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={isAgreementChecked}
            onChange={(e) => setIsAgreementChecked(e.target.checked)}
          />
        }
        label="I agree to the terms and conditions"
      />
      {!isAgreementChecked && (
        <Typography color="error">
          You must agree to the terms to proceed.
        </Typography>
      )}
    </Box>
  );
}

function FormController({ handleBack, activeStep, steps, isAgreementChecked }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
      <Button
        onClick={handleBack}
        disabled={activeStep === 0}
        variant="outlined"
        color="primary"
      >
        Back
      </Button>
      <Button
        type="submit"
        disabled={activeStep === steps.length - 1 && !isAgreementChecked}
        variant="contained"
        color="primary"
      >
        {activeStep === steps.length - 1 ? "Submit" : "Next"}
      </Button>
    </Box>
  );
}
export default Register;
