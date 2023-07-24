import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import { useState, useEffect } from "react";
import { getHighestScoreThisSeason, getHighestTeamScore } from "../../utils/skittlesData";
const HighestScore = ({ matches }) => {
  const data = getHighestTeamScore(matches);

  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Tooltip title="Highest Score this season">
                <Typography color="textSecondary" gutterBottom variant="overline">
                  HIGHEST TEAM SCORE
                </Typography>
              </Tooltip>

              <Typography color="textPrimary" variant="h4">
                {data.score}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "success.main",
                  height: 56,
                  width: 56,
                }}
              >
                <GroupsIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              pt: 2,
            }}
          >
            <Typography color="textSecondary" variant="caption">
              <Link
                href={`game?seasonNumber=${data.matchID
                  .toString()
                  .slice(0, 4)}&gameNumber=${data.matchID.toString().slice(4, 6)}`}
              >
                IN GAME {data.matchID.toString().slice(4, 6)}
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HighestScore;
//FIXME: only got to here so far
