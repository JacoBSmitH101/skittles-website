import { Avatar, Box, Card, CardContent, Grid, Link, Tooltip, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import { useState, useEffect } from "react";
const HighestScore = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [jollyData, setJollyData] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch("https://skittles-server.herokuapp.com/highestscoreseason")
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


  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Tooltip title="Highest Score this season">
              <Typography color="textSecondary" gutterBottom variant="overline">
                HIGHEST TEAM SCORE
              </Typography>
            </Tooltip>

            <Typography color="textPrimary" variant="h4">
              {jollyData.score}
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
              href={`game?seasonNumber=${
                jollyData.matchID.toString().slice(0,4)}&gameNumber=${jollyData.matchID.toString().slice(4, 6)}`}
            >
              IN GAME {jollyData.matchID.toString().slice(4, 6)}
            </Link>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HighestScore;
//FIXME: only got to here so far