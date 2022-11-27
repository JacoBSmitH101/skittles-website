import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import { useState, useEffect } from "react";

const PlayerList = ({ gameData }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between", }}>
          <Grid item>
            <Grid container spacing={25} sx={{position:"relative", right:"10"}}>
              <Grid item>
                <Typography color="textPrimary" variant="h5">
                  Player
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  SCORE
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider style={{width:'100%', paddingTop:"6.5%"}}/>
          <Grid item><h1>TODO</h1></Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default PlayerList;
