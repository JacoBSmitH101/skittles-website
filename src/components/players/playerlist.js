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

const PlayerList = ({ allPlayers }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notImplementedPopover, setNotImplementedPopover] = useState(false);
  const popRef = useRef(null);
  return (
    <Card>
      <CardHeader title="All Players" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "revert" } }}>
                  Seasons Played
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(allPlayers).map((player) => (
                <TableRow hover key={player}>
                  <TableCell>{player}</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "revert" } }}>
                    {Object.keys(allPlayers[player])[0]} - {Object.keys(allPlayers[player]).pop()}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      endIcon={<ArrowRightIcon />}
                      size="small"
                      variant="text"
                      ref={popRef}
                      href={`/player?name=${player}`}
                    >
                      View
                    </Button>
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
