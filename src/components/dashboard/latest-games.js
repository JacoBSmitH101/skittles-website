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

const LatestGames = (props) => {
  const [lastGames, setLastGames] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const gameSelectedHandler = (game) => {
    //redirect to /game?gameNumber=game.gameNumber&seasonNumber=game.seasonNumber
    window.location.replace("/game?gameNumber=" + game.gameNumber + "&seasonNumber=" + game.season);
  };
  useEffect(() => {
    setLoading(true);
    fetch("https://skittles-server.herokuapp.com/lastgames/7")
      .then((res) => res.json())
      .then((data) => {
        setLastGames(data);
        setLoading(false);
      });
  }, []);
  if (isLoading)
    return (
      <Card>
        <p>No data</p>
      </Card>
    );
  if (!lastGames)
    return (
      <Card>
        <p>No profile data</p>
      </Card>
    );
  return (
    <Card {...props}>
      <CardHeader title="Latest Games" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead sx={{backgroundColor: "#1f2a40"}}>
              <TableRow>
                <TableCell>Game Number</TableCell>
                <TableCell>Home/Away</TableCell>
                <TableCell>Opponent</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lastGames.map((game) => (
                <TableRow key={game.ourScore} onClick={() => gameSelectedHandler(game)} hover>
                  <TableCell sx={{borderBottomColor: "table.borderBottom"}}>{game.matchID.toString().split(0, 4) }</TableCell>
                  <TableCell sx={{borderBottomColor: "table.borderBottom"}}>
                    <SeverityPill color={(game.isHome && "secondary") || "primary"}>
                      {game.isHome ? "Home" : "Away"}
                    </SeverityPill>
                  </TableCell>
                  <TableCell sx={{borderBottomColor: "table.borderBottom"}}>{game.opponent}</TableCell>
                  <TableCell sx={{borderBottomColor: "table.borderBottom"}}>
                    {game.score} vs {game.opponentScore}
                  </TableCell>
                  <TableCell sx={{borderBottomColor: "table.borderBottom"}}>
                    <SeverityPill
                      color={(game.score > game.opponentScore && "success") || "error"}
                    >
                      {game.score > game.opponentScore ? "Win" : "Loss"}
                    </SeverityPill>
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
          disabled
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};
export default LatestGames;
