import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import { useEffect, useRef, useState } from "react";
import NotImplementedPopover from "./notimplementedpopover";
const orders = [];
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
  },
});
const PlayerList = ({ allPlayers }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notImplementedPopover, setNotImplementedPopover] = useState(false);
  const popRef = useRef(null);
  return (
    <Card>
      <CardHeader title="All Players" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead sx={{backgroundColor: "#1f2a40"}}>
              <TableRow>
                <TableCell sx={{maxWidth: "100px "}}>Name</TableCell>
                <TableCell align="left"/>
              </TableRow>
            </TableHead>
            <TableBody>
              {allPlayers.map((player) => (
                <TableRow onClick={() => window.location.href = "/player?name=" + player.playerid} hover key={player.playerid} classes={{hover: classes.hover}}>
                  <TableCell sx={{maxWidth: "1rem", borderBottom: "none"}} >{player.name}</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "revert" }, borderBottom: "none" }}>
                    {/* {Object.keys(allPlayers[player].seasons)[0]} - {Object.keys(allPlayers[player].seasons).pop()} */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
      <NotImplementedPopover
        anchorEl={popRef.current}
        open={notImplementedPopover}
        onClose={() => setNotImplementedPopover(false)}
      />
    </Card>
  );
};
export default PlayerList;
