import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

function PlayerHeader({ name, playerData }) {
  var gamesPlayed = 0;
  Object.keys(playerData.seasons).forEach((season) => {
    gamesPlayed += playerData.seasons[season].gamesPlayed;
  });
  var isStillOnTeam = false;
  var firstSeason = Object.keys(playerData.seasons)[0];
  var latestSeason = null
  if (Object.keys(playerData.seasons)[Object.keys(playerData.seasons).length - 1] == "2223") {
    isStillOnTeam = true;
  } else {
    //get latest season
    latestSeason = Object.keys(playerData.seasons).pop();
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h3" component="h1">
          {name}&apos;s Stats
        </Typography>
        <Typography variant="caption">
          {" "}
          {isStillOnTeam
            ? `Player Since 20${firstSeason.slice(0, 2)}`
            : `Played from ${`20${firstSeason.slice(0, 2)}`} - ${`20${latestSeason.slice(0, 2)}`}`}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp; {gamesPlayed} Games Played{" "}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PlayerHeader;
