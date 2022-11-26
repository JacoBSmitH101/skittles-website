import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import { useState, useEffect } from "react";
import HistoryIcon from '@mui/icons-material/History';
function HistoryVSOpponent({ gameData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [previousGames, setPreviousGames] = useState([]);
  const [totalWins, setTotalWins] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);
  const updateHistory = (data) => {
    setTotalWins(0)
    setTotalLosses(0)
    Object.values(data).forEach((season) => {
      Object.values(season).forEach((game) => {
        if (game.ourScore > game.opponentScore) {
          setTotalWins((prev) => prev + 1);
        } else {
          setTotalLosses((prev) => prev + 1);
        }
      });
    });
  }
  useEffect(() => {
    fetch(`https://skittles-server.herokuapp.com/all-games-against/${gameData.opponent}`)
      .then((res) => res.json())
      .then((data) => {
        setPreviousGames(data, updateHistory(data));
        setIsLoading(false);
        
      });
  }, []);
  if (isLoading || !previousGames) {
    return <h1>NO DATA FOUND</h1>;
  }
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              HISTORY VS {gameData.opponent}
            </Typography>
            {totalWins <   totalLosses ? (
              <Typography color="error" gutterBottom variant="overline">
                {"  "}(LOST)
              </Typography>
            ) : (
              <Typography color="green" gutterBottom variant="overline">
                {"  "}(WON)
              </Typography>
            )}
            <Typography color="textPrimary" variant="h5">
              {totalWins} - {totalLosses}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <HistoryIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default HistoryVSOpponent;
