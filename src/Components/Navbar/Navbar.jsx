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


import { Avatar, Button, MenuItem, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

import HomePageNavLink from "./HomePageNavlink";
import useAuthContext from "../../Utils/useAuthContext";
import LogOutAndDashboard from "./LogOutAndDashboard";


const Navbar = () => {
  const { user } = useAuthContext();

 
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

 
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
            {/* {!user ? (
              <Link to={"/login"}>
                <Button variant="contained" color="secondary">Login</Button>
              </Link>
            ) : (
              <Button onClick={handleLogOut} variant="contained" color="secondary">
                Log Out
              </Button>
            )} */}

{!user ? (
              <Link to={"/login"}>
                <Button
                  variant="outlined"
                  sx={{
                    bgcolor: "white",
                    ":hover": {
                      bgcolor: "unset",
                    },
                  }}
                  color="secondary"
                >
                  Login
                </Button>
              </Link>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      p: 1,
                      gap: 1,
                    }}
                  >
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src={user?.photoURL} />
                    </IconButton>
                    <Typography variant="body">
                      {user?.displayName?.slice(0, 8)}
                    </Typography>
                  </Box>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <LogOutAndDashboard></LogOutAndDashboard>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
