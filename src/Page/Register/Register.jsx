import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { Copyright } from "@mui/icons-material";
import LoginWith from "../Login/LoginWith";

import { useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import toast from "react-hot-toast";
// import { globalInstance } from "../../Hooks/useGlobalInstance";

import hostImage from "../../Utils/Host Image/hostImage";
import useAuthContext from "../../Hooks/useAuthContext";
import { globalInstance } from "../../Hooks/useGlobalInstance";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser, profileUpdate } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const img = data?.image[0];
    const fromData = new FormData();
    fromData.append("image", img);
    const image = await hostImage(fromData);

    const name = data?.name;
    const email = data?.email;
    const info = { image, name, email };
    const toastId = toast.loading("Register Successfully Done");
    createUser(email, data?.password)
      .then(() => {
        profileUpdate(name, image)
          .then(async () => {
            await globalInstance.post("/users", info).then((res) => {
            
              if (res.data.success ) {
                toast.success("Register Successfully done", { id: toastId });
                navigate("/login");
              }
            });
          })
          .catch((err) => toast.error(err?.message, { id: toastId }));
      })
      .catch((err) => toast.error(err.message, { id: toastId }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Helmet><title>Register</title></Helmet>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" fontWeight={400}>
          Register
        </Typography>
        <Box sx={{ my: 2 }}>
          <LoginWith></LoginWith>
        </Box>
        <Box noValidate sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("name", { required: true })}
                  autoComplete="given-name"
                  name="name"
                  fullWidth
                  id="Name"
                  label=" Name"
                  autoFocus
                />
                {errors.name && (
                  <Typography variant="body2" color={"#d32f2f"}>
                    This field is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  component="label"
                  variant="outlined"
                  sx={{ width: "100%", p: 2 }}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Image
                  <input
                    style={{ display: "none" }}
                    {...register("image", { required: true })}
                    type="file"
                    name="image"
                  />
                </Button>
                {errors.image && (
                  <Typography variant="body2" color="#d32f2f">
                    This field is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email", { required: true })}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              {errors.email && (
                <Typography variant="body2" sx={{ ml: 3 }} color={"#d32f2f"}>
                  This field is required
                </Typography>
              )}
              <Grid item xs={12}>
                <TextField
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*[A-Z])(?=.*[@#$%^&+=!]).{6,}$/,
                    maxLength: 20,
                    minLength: 6,
                  })}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {errors.password && (
                <Typography variant="body2" sx={{ ml: 3 }} color={"#d32f2f"}>
                  This field is required
                </Typography>
              )}
              {errors.password?.type === "maxLength" && (
                <Typography variant="body2" sx={{ ml: 3 }} color={"#d32f2f"}>
                  Password should not more then 20
                </Typography>
              )}
              {errors.password?.type === "minLength" && (
                <Typography variant="body2" sx={{ ml: 3 }} color={"#d32f2f"}>
                  Password should not less then 6
                </Typography>
              )}
              {errors.password?.type === "pattern" && (
                <Typography variant="body2" sx={{ ml: 3 }} color={"#d32f2f"}>
                  Password should be one UpperCase letter & one special letter
                </Typography>
              )}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/login"} variant="body2">
                Already have an account? Login in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};
export default Register;
