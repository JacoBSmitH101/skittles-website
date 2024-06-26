import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import { useState, useEffect } from "react";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import TimelineIcon from "@mui/icons-material/Timeline";
function HighestAverage({ playerData }) {
  const [highestAverage, setHighestAverage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [highestAverageSeason, setHighestAverageSeason] = useState(0);
  useEffect(() => {
    var highestAverage = 0;
    var highestAverageSeason = 0;
    Object.keys(playerData.seasons).forEach((season) => {
      if (playerData.seasons[season].average > highestAverage) {
        highestAverage = playerData.seasons[season].average;
        highestAverageSeason = season;
      }
    });
    setHighestAverage(highestAverage);
    setHighestAverageSeason(highestAverageSeason.toString());
    setLoading(false);
  }, [playerData]);

  if (isLoading) {
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                HIGHEST AVERAGE
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
              HIGHEST AVERAGE
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {highestAverage.toFixed(2)}
              <Typography color="textSecondary" variant="caption">
                &nbsp;&nbsp;&nbsp;&nbsp;(
                {`20${highestAverageSeason.slice(0, 2)} - 20${highestAverageSeason.slice(2, 4)}`})
              </Typography>
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
              <TimelineIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default HighestAverage;
