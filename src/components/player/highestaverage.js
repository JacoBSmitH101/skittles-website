import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import { useState, useEffect } from "react";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import TimelineIcon from "@mui/icons-material/Timeline";
function HighestAverage({ data }) {
  const [highestAverage, setHighestAverage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [highestAverageSeason, setHighestAverageSeason] = useState(0);
  useEffect(() => {
    var highestaverages = {};
    //foreach season, first 4 digits of matchid, add up all scores and divide by number of games
    //then compare to highest average
    //if higher, set highest average to that average and set highest average season to that season
    console.log(data.matchesPlayers)
    data.matchesPlayers.forEach((match) => {
      var season = String(match.matchid).slice(0, 4);
      if (highestaverages[season]) {
        highestaverages[season].totalScore += match.score;
        highestaverages[season].gamesPlayed += 1;
        highestaverages[season].average =
          highestaverages[season].totalScore / highestaverages[season].gamesPlayed;
      } else {
        highestaverages[season] = {
          totalScore: match.score,
          gamesPlayed: 1,
          average: match.score,
        };
      }
    });
    var highestAverage = 0;
    var highestAverageSeason = 0;
    Object.keys(highestaverages).forEach((season) => {
      if (highestaverages[season].average > highestAverage) { 
        highestAverage = highestaverages[season].average;
        highestAverageSeason = season;
      }
    });
    

    setHighestAverage(highestAverage);
    setHighestAverageSeason(highestAverageSeason.toString());
    setLoading(false);
  }, [data]);

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
