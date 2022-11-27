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
import { useEffect, useState } from "react";
const orders = [];

const PlayerList = (props) => {
  const [allPlayers, setAllPlayers] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const gameSelectedHandler = (game) => {
    console.log(game);
  };
  useEffect(() => {
    setLoading(true);
    fetch("https://skittles-server.herokuapp.com/players")
      .then((res) => res.json())
      .then((data) => {
        setAllPlayers(data);
        setLoading(false);
      });
  }, []);
  if (isLoading)
    return (
      <Card>
        <p>No data</p>
      </Card>
    );
  if (!allPlayers)
    return (
      <Card>
        <p>No profile data</p>
      </Card>
    );
  return (
    <Card {...props}>
      <CardHeader title="All Players" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Seasons Played</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(allPlayers).map((player) => (
                <TableRow hover key={player}>
                  <TableCell>{player}</TableCell>
                  <TableCell>
                    {Object.keys(allPlayers[player])[0]} - {Object.keys(allPlayers[player]).pop()}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      endIcon={<ArrowRightIcon />}
                      size="small"
                      variant="text"
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
    </Card>
  );
};
export default PlayerList;
