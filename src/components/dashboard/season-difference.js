import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { useState, useEffect } from "react";
const SeasonDifference = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [jollyData, setJollyData] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch("https://skittles-server.herokuapp.com/latest-game")
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
            <Typography color="textSecondary" gutterBottom variant="overline">
              SEASON DIFFERENCE
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {jollyData.seasonDifference}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                height: 56,
                width: 56,
              }}
            >
              {jollyData.seasonDifference > 0 ? <AddRoundedIcon /> : <RemoveRoundedIcon />}
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default SeasonDifference;
//TODO: CHANGE NAME
