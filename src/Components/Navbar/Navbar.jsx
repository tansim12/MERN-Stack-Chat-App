import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import "./navbar.css";


import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import HomePageNavLink from "./HomePageNavlink";
import useAuthContext from "../../Utils/useAuthContext";


const Navbar = () => {
  const { user, logOut } = useAuthContext();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  // handleLogOut
  const handleLogOut = () => {
    logOut();
    toast.success("Logout Successfully done");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ bgcolor: "transparent", color: "black" }}
        className="navbarBlur"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 1,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 800,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >

                {/* logo  */}
              <img
                className="w-36 md:w-20"
                src="https://i.ibb.co/Qnk6smk/pngwing-com-15.png"
                alt=""
              />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {/* sm size menu bar or navLink */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/* mobile device  */}
                <HomePageNavLink></HomePageNavLink>
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              src
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                width: "min-content",
              }}
            >

              {/* sm device logo  */}
              <img
                style={{ width: "30%" }}
                src="https://i.ibb.co/Qnk6smk/pngwing-com-15.png"
                alt=""
              />
            </Typography>
            {/* large device  */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <HomePageNavLink></HomePageNavLink>
            </Box>
            {/* Login and logout button  */}
            {!user ? (
              <Link to={"/login"}>
                <Button variant="contained" color="secondary">Login</Button>
              </Link>
            ) : (
              <Button onClick={handleLogOut} variant="contained" color="secondary">
                Log Out
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
