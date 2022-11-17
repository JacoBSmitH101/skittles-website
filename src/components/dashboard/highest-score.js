import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import GroupsIcon from '@mui/icons-material/Groups';
import { useState, useEffect } from "react";
const HighestScore = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [jollyData, setJollyData] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch("https://skittles-server.herokuapp.com/jolly-crew")
      .then((res) => res.json())
      .then((data) => {
        setJollyData(data);
        setLoading(false);
      });
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (!jollyData)
    return (
      <Card>
        <p>No profile data</p>
      </Card>
    );
  //loop through every game in jollyData.seasons["2223"].games
  //find the highest score
  let latestSeason =
    jollyData.seasons[Object.keys(jollyData.seasons)[Object.keys(jollyData.seasons).length - 1]];
  let highestScore = 0;
  Object.values(latestSeason.games).forEach((game) => {
    if (game.ourScore > highestScore) {
      highestScore = game.ourScore;
    }
  });

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              HIGHEST TEAM SCORE
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {highestScore}
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
          <ArrowUpwardIcon color="success" />
          <Typography
            variant="body2"
            sx={{
              mr: 1,
            }}
          >
            11%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last year
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HighestScore;
