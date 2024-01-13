import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Copyright } from "@mui/icons-material";
import LoginWith from "./LoginWith";
import { useForm } from "react-hook-form";

import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthContext from "../../Utils/useAuthcontext";


const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const loc = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    login(data?.email, data?.password)
      .then(() => {
        const toastId = toast.loading("Login Successfully Done");
        toast.success("Login Successfully done", { id: toastId });
        navigate(loc?.state ? loc?.state : "/", { replace: true });

      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box sx={{ my: 2 }}>
              <LoginWith></LoginWith>
            </Box>
            <Box noValidate sx={{ mt: 1 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  margin="normal"
                  {...register("email", { required: true })}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                {errors.email && (
                  <Typography variant="body2" color={"#d32f2f"}>
                    This field is required
                  </Typography>
                )}
                <TextField
                  margin="normal"
                  fullWidth
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*[A-Z])(?=.*[@#$%^&+=!]).{6,}$/,
                    maxLength: 20,
                    minLength: 6,
                  })}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {errors.password?.type === "maxLength" && (
                  <Typography variant="body2" color={"#d32f2f"}>
                    Password should not more then 20
                  </Typography>
                )}
                {errors.password?.type === "minLength" && (
                  <Typography variant="body2" color={"#d32f2f"}>
                    Password should not less then 6
                  </Typography>
                )}
                {errors.password?.type === "pattern" && (
                  <Typography variant="body2" color={"#d32f2f"}>
                    Password should be one UpperCase letter & one special letter
                  </Typography>
                )}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </form>
              <Grid container>
                <Grid item xs>
                  <Link variant="body2">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
