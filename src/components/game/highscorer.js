import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import { useState, useEffect } from "react";
import ScoreIcon from "@mui/icons-material/Score";
function HighestScore({ gameData }) {
  const [highestScore, setHighestScore] = useState(null);
  const [highestScorePlayer, setHighestScorePlayer] = useState(null);

  useEffect(() => {
    let highestScore = 0;
    let highestScorePlayer = null;
    Object.keys(gameData.players).forEach((player) => {
      if (gameData.players[player].total > highestScore) {
        highestScore = gameData.players[player].total;
        highestScorePlayer = player;
      }
    });
    if (highestScorePlayer == "Extra Player #1") {
      highestScorePlayer = "Extra #1";
      setHighestScorePlayer(highestScorePlayer);
    } else if (highestScorePlayer == "Extra Player #2") {
      highestScorePlayer = "Extra #2";
      setHighestScorePlayer(highestScorePlayer);
    } else {
      let highestScorePlayerSplit = highestScorePlayer.split(" ");
      //check if split has 2 elements at least
      if (highestScorePlayerSplit.length > 1) {
        highestScorePlayer = highestScorePlayerSplit[0] + " " + highestScorePlayerSplit[1][0];
      }

      setHighestScorePlayer(highestScorePlayer);
    }

    setHighestScore(highestScore);
  }, []);
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              HIGHEST SCORE
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {highestScorePlayer} - {highestScore}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                height: 56,
                width: 56,
              }}
            >
              <ScoreIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default HighestScore;
