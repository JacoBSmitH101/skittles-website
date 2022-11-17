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
  useEffect(() => {
    setLoading(true);
    fetch("https://skittles-server.herokuapp.com/get-last-games/amount/5")
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
    lastGames.games = lastGames.games.reverse();
  return (
    <Card {...props}>
      <CardHeader title="Latest Orders" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Game Number</TableCell>
                <TableCell>Opponent</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lastGames.games.map((game) => (
                <TableRow key={game.ourScore}>
                  <TableCell>{game.gameNumber}</TableCell>
                  <TableCell>{game.opponent}</TableCell>
                  <TableCell>
                    {game.ourScore} vs {game.opponentScore}
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                      color={(game.ourScore > game.opponentScore && "success") || "error"}
                    >
                      {game.ourScore > game.opponentScore ? "Win" : "Loss"}
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
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};
export default LatestGames;
