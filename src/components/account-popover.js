import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { AuthContext } from "../contexts/auth-context";
import { auth, ENABLE_AUTH } from "../lib/auth";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const authContext = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSignOut = async () => {
    onClose?.();

    // Check if authentication with Zalter is enabled
    // If not enabled, then redirect is not required
    if (!ENABLE_AUTH) {
      return;
    }

    // Check if auth has been skipped
    // From sign-in page we may have set "skip-auth" to "true"
    // If this has been skipped, then redirect to "sign-in" directly
    const authSkipped = globalThis.sessionStorage.getItem("skip-auth") === "true";

    if (authSkipped) {
      // Cleanup the skip auth state
      globalThis.sessionStorage.removeItem("skip-auth");

      // Redirect to sign-in page
      Router.push("/sign-in").catch(console.error);
      window.location.reload();

      return;
    }

    try {
      // This can be call inside AuthProvider component, but we do it here for simplicity
      await auth.signOut();

      // Update Auth Context state
      authContext.signOut();

      // Redirect to sign-in page
      Router.push("/sign-in").catch(console.error);
      window.location.reload();
    } catch (err) {
      console.error(err);
      window.location.reload();
    }
  };
  useEffect(() => {
    auth.getCurrentUser().then((res) => {
      if (!res) {
        setLoading(false);
        setAuthenticated(false);
        return;
      }
      let id = res.subId.slice(0, -3);
      fetch("https://skittles-server.herokuapp.com/verified-users-list")
        .then((res) => res.json())
        .then((data) => {
          let verified = false;
          for (let i = 0; i < data.length; i++) {
            if (data[i].authId === id) {
              verified = true;
              setUserInfo(data[i]);
              setAuthenticated(true);
              setLoading(false);
              break;
            }
          }
        });
    });
  }, []);
  if (loading) {
    return (
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        onClose={onClose}
        open={open}
        PaperProps={{
          sx: { width: "300px" },
        }}
        {...other}
      >
        <Box
          sx={{
            py: 1.5,
            px: 2,
          }}
        >
          <Typography variant="overline">Loading</Typography>
          <Typography color="text.secondary" variant="body2">
            Loading user info
          </Typography>
        </Box>
        <MenuList
          disablePadding
          sx={{
            "& > *": {
              "&:first-of-type": {
                borderTopColor: "divider",
                borderTopStyle: "solid",
                borderTopWidth: "1px",
              },
              padding: "12px 16px",
            },
          }}
        >
          {authenticated ? (
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          ) : (
            <MenuItem href="/sign-in">Sign in</MenuItem>
          )}
        </MenuList>
      </Popover>
    );
  }
  if (!authenticated) {
    return (
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        onClose={onClose}
        open={open}
        PaperProps={{
          sx: { width: "300px" },
        }}
        {...other}
      >
        <Box
          sx={{
            py: 1.5,
            px: 2,
          }}
        >
          <Typography variant="overline">Not verified user</Typography>
          <Typography color="text.secondary" variant="body2">
            Not verified user
          </Typography>
        </Box>
        <MenuList
          disablePadding
          sx={{
            "& > *": {
              "&:first-of-type": {
                borderTopColor: "divider",
                borderTopStyle: "solid",
                borderTopWidth: "1px",
              },
              padding: "12px 16px",
            },
          }}
        >
          <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
        </MenuList>
      </Popover>
    );
  }
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "300px" },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {userInfo.name}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
