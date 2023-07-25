import { getLowestTeamScore } from "../../utils/skittlesData";
import { Avatar, Box, Card, CardContent, Grid, Link, Tooltip, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import { useState, useEffect } from "react";
// ... other imports

const LowestScore = ({ matches }) => {
  const data = getLowestTeamScore(matches);

  // ... rest of the component

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Tooltip title="Lowest Score this season">
              <Typography color="textSecondary" gutterBottom variant="overline">
                WORST TEAM SCORE
              </Typography>
            </Tooltip>

            <Typography color="textPrimary" variant="h4">
              {data.score}
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
              <GroupsIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box
          sx={{
            alignItems: "center",
            display: "flex",
            pt: 2,
          }}
        >
          <Typography color="textSecondary" variant="caption">
            <Link
              href={`game?seasonNumber=${
                data.matchID.toString().slice(0,4)}&gameNumber=${data.matchID.toString().slice(4, 6)}`}
            >
              IN GAME {data.matchID.toString().slice(4, 6)}
            </Link>
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  );
};

export default LowestScore;