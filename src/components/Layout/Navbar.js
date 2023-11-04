import React from "react";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material";

import {
  Menu as MenuIcon,
  LocalBar as LocalBarIcon,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const pages = [
  { name: "Popular Cocktails", path: "/" },
  { name: "Random Cocktails", path: "/random" },
  { name: "Favorite Cocktails", path: "/favorites" },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleLinkClick = () => {
    setAnchorElNav(null);
    scrollUp();
  };

  const scrollUp = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }, 150); // Adjust the delay as needed (in milliseconds)
  }

  return (
    <AppBar position="fixed">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <LocalBarIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            onClick={scrollUp}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BoozeAPI
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

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
              onClose={handleLinkClick}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  component={Link}
                  to={page.path}
                  onClick={handleLinkClick}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LocalBarIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={"/"}
            onClick={scrollUp}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BoozeAPI
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              align: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleLinkClick}
                sx={{ my: 2, color: "white", display: "block", flex: "none" }}
                component={Link}
                to={page.path}
              >
                {page.name}
              </Button>
            ))}

            <Box
              sx={{ display: { xs: "none", md: "flex" }, ml: "auto", mt: 1.6 }}
            >
              <SearchBar />
            </Box>
          </Box>
        </Toolbar>
      </Container>
      
    </AppBar>
  );
}
export default Navbar;
