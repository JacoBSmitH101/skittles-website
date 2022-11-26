import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import { useState, useEffect } from "react";
function TeamAverage({ gameData }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TEAM AVERAGE
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {Math.floor(gameData.ourScore / 12 * 10) / 10} 
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TeamAverage;
