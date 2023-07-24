import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { Lock as LockIcon } from "../icons/lock";
import { Selector as SelectorIcon } from "../icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { User as UserIcon } from "../icons/user";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Users as UsersIcon } from "../icons/users";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import { Logo } from "./logo";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import { NavItem } from "./nav-item";
import WindowIcon from "@mui/icons-material/Window";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import WorkspacesIcon from '@mui/icons-material/Workspaces';

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
    enabled: true,
  },
  {
    href: "/team",
    icon: <WorkspacesIcon fontSize="small" />,
    title: "Team",
    enabled: false,
  },
  {
    href: "/players",
    icon: <UsersIcon fontSize="small" />,
    title: "Players",
    enabled: true,
  },
  {
    href: "/games",
    icon: <WindowIcon fontSize="small" />,
    title: "Games",
    enabled: true,
  },
  {
    href: "/alleys",
    icon: <SportsBarIcon fontSize="small" />,
    title: "Alleys",
  },
  {
    href: "/account",
    icon: <QueryStatsIcon fontSize="small" />,
    title: "My Stats",
    enabled: false,
  },
  {
    href: "/settings",
    icon: <CogIcon fontSize="small" />,
    title: "Settings",
    enabled: false,
  },
  {
    href: "/newgame",
    icon: <UserAddIcon fontSize="small" />,
    title: "Add New Game",
    enabled: true,
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#1A202C",
          boxShadow: "inset   -2px 0px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Jolly Crew
                </Typography>
                <Typography color="#718096" variant="body2">
                  Division 2
                </Typography>
              </div>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#20232a",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} enabled={item.enabled} />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#20232a" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "#1A202C",
            color: "#F7FAFC",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#1A202C",
          color: "#F7FAFC",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
