import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

function PlayerHeader({ name, data }) {
  var gamesPlayed = data.matchesPlayers.length;
  var isStillOnTeam = true;

  //if latest matchid starts with 2223 then they are still on the team
  var latestSeason = String(data.matchesPlayers[gamesPlayed - 1].matchid).slice(0, 4);
  var firstSeason = String(data.matchesPlayers[0].matchid).slice(0, 4);

  if (String(data.matchesPlayers[gamesPlayed - 1].matchid).slice(0, 4) == "2223") {
    isStillOnTeam = true;
  } else {
    isStillOnTeam = false;
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
