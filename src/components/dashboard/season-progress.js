import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import { useState, useEffect } from "react";
import { getLatestSeasonAverage } from "../../utils/skittlesData";
const SeasonProgress = ({matches}) => {
  const data = getLatestSeasonAverage(matches);
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              SEASON AVERAGE
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {Math.floor((data.average))}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "warning.main",
                height: 56,
                width: 56,
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box sx={{ pt: 3 }}>
          <LinearProgress value={(data.average - 350)* 100/(550-350)} variant="determinate" />
        </Box> */}
      </CardContent>
    </Card>
  );
};
export default SeasonProgress;
