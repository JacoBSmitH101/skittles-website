import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import { useState, useEffect } from "react";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
function HighestScore({ playerData }) {
  const [highestScore, setHighestScore] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [highestScoreSeason, setHighestScoreSeason] = useState(0);
  const [highestScoreGame, setHighestScoreGame] = useState(0);

  useEffect(() => {
    var highestScore = 0;
    var highestScoreSeason = 0;
    var highestScoreGame = 0;
    Object.keys(playerData.seasons).forEach((season) => {
      for (let i = 1; i < 50; i++) {
        if (playerData.seasons[season].games[`Game${i}`]) {
          if (playerData.seasons[season].games[`Game${i}`].didPlay) {
            if (playerData.seasons[season].games[`Game${i}`].total > highestScore) {
              highestScore = playerData.seasons[season].games[`Game${i}`].total;
              highestScoreSeason = season;
              highestScoreGame = i;
            }
          }
        }
      }
    });
    setHighestScore(highestScore);
    setHighestScoreSeason(highestScoreSeason.toString());
    setHighestScoreGame(highestScoreGame);
    setLoading(false);
  }, [playerData]);

  if (isLoading) {
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                HIGHEST SCORE
              </Typography>
              <Typography color="textPrimary" variant="h5">
                Loading...
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
                <LeaderboardIcon />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              HIGHEST SCORE
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {highestScore}&nbsp;&nbsp;&nbsp;&nbsp;
              <Link underline="hover" href={`/game?seasonNumber=${highestScoreSeason}&gameNumber=${highestScoreGame}`}>
                <Typography color="textSecondary" variant="caption">
                  (
                  {`20${highestScoreSeason.slice(0, 2)} - 20${highestScoreSeason.slice(
                    2,
                    4
                  )}`} Game {highestScoreGame})
                </Typography>
              </Link>
            </Typography>
          </Grid>
          <Grid item sx={{display: { xs: "block", sm:"none", md: "none", lg: "block", xl: "block" }}}>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                height: 56,
                width: 56,
              }}
            >
              <LeaderboardIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default HighestScore;
