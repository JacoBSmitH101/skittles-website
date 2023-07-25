/* eslint-disable react/jsx-max-props-per-line */
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import { useState, useEffect } from "react";
import { getLastGameInfo } from "../../utils/skittlesData";
const LastGame = ({matches}) => {
  const data = getLastGameInfo(matches);
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              LAST GAME
            </Typography>
            {data.score < data.opponentScore ? (
              <Typography color="error" gutterBottom variant="overline">
                {"  "}(LOST)
              </Typography>
            ) : (
              <Typography color="green" gutterBottom variant="overline">
                {"  "}(WON)
              </Typography>
            )}
            <Typography color="textPrimary" variant="h5">
              {data.score} vs {data.opponentScore}
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
              <ScoreboardIcon />
            </Avatar>
          </Grid>
          {/* <Typography color="textSecondary" variant="caption" sx={{marginLeft: "20px"}}>
            VS {data.opponentName}
          </Typography> */}
        </Grid>
        {/* <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography color="textSecondary" variant="caption">
            VS {data.opponentName}
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  );
};
export default LastGame;
