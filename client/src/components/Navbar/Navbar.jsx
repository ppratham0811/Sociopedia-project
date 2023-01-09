import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

import {
  Box,
  IconButton,
  InputBase,
  Select,
  Typography,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";

const defaultUser = {
  firstName: "Ramesh",
  lastName: "Singh",
};

function Navbar() {
  const [hamburger, setHamburger] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");
  const user = useSelector((state) => (state.user ? state.user : defaultUser));

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const firstName = user.firstName;

  return (
    <FlexBetween padding="1rem 5%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: dark,
              cursor: "pointer",
            },
          }}
        >
          Sociopedia
        </Typography>
        {isNotMobileScreen && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {isNotMobileScreen ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightMode sx={{ fontSize: "25px" }} />
            ) : (
              <DarkMode sx={{ fontSize: "25px", color: "black" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl value={firstName}>
            <Select
              value={firstName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                marginRight: "0.2rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.2rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={firstName}>
                <Typography>{firstName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setHamburger(!hamburger)}>
          <Menu />
        </IconButton>
      )}

      {/* Mobile Hamburger Menu */}
      {!isNotMobileScreen && hamburger && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* Close Icon */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setHamburger(!hamburger)}>
              <Close />
            </IconButton>
          </Box>

          {/* Mobile Menu Items */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="2rem"
          >
            <FlexBetween
              backgroundColor={alt}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
              width="80%"
            >
              <InputBase placeholder="Search" />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
            <Button variant="text" onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <LightMode sx={{ margin: "0 10px" }} />
              ) : (
                <DarkMode sx={{ margin: "0 10px" }} />
              )}
              Change Theme
            </Button>
            <Button>
              <Message sx={{ fontSize: "25px", margin: "0 10px" }} />
              Messages
            </Button>
            <Button>
              <Notifications sx={{ fontSize: "25px", margin: "0 10px" }} />
              Notifications
            </Button>
            <Button>
              <Help sx={{ fontSize: "25px", margin: "0 10px" }} />
              Help
            </Button>
            <FormControl variant="standard" value={firstName}>
              <Select
                value={firstName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={firstName}>
                  <Typography>{firstName}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(setLogout());
                    navigate("/");
                  }}
                >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
}

export default Navbar;
