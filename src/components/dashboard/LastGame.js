import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import { useState, useEffect } from "react";

const LastGame = (props) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [jollyData, setJollyData] = useState(null);
  useEffect(() => {
    setLoading(true);
    try {
      fetch("https://skittles-server.herokuapp.com/lastgame")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (!data)
    return (
      <Card>
        <p>No data</p>
      </Card>
    );
  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              LAST GAME
            </Typography>
            {data.ourScore < data.opponentScore ? (
              <Typography color="error" gutterBottom variant="overline">
                {"  "}(LOST)
              </Typography>
            ) : (
              <Typography color="green" gutterBottom variant="overline">
                {"  "}(WON)
              </Typography>
            )}
            <Typography color="textPrimary" variant="h5">
              {data.ourScore} vs {data.opponentScore}
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
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography color="textSecondary" variant="caption">
            VS {data.opponent}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
export default LastGame;
