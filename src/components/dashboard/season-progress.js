import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import { useState, useEffect } from "react";
const SeasonProgress = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [jollyData, setJollyData] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch("https://skittles-server.herokuapp.com/latest-game ")
      .then((res) => res.json())
      .then((data) => {
        setJollyData(data);
        setLoading(false);
      });
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (!jollyData) return <Card><p>No profile data</p></Card>;
  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              SEASON PROGRESS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {Math.floor((jollyData.gameNumber/28*100))}%
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
        <Box sx={{ pt: 3 }}>
          <LinearProgress value={Math.floor((7/28*100) * 100) / 100} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};
export default SeasonProgress;
