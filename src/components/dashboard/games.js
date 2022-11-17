import { Bar } from "react-chartjs-2";
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, InputLabel, MenuItem, Select, useTheme } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useState, useEffect } from "react";
const Games = (props) => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [jollyData, setJollyData] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch("https://skittles-server.herokuapp.com/get-last-games/amount/5")
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
  let ourScores = [];
  let opponentScores = [];
  let labels = [];
  jollyData.games.forEach(game => {
    ourScores.push(game.ourScore);
    opponentScores.push(game.opponentScore);
    labels.push("Game " + game.gameNumber);
  });
  const data = {
    datasets: [
      {
        backgroundColor: "#3F51B5",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: ourScores,
        label: "Jolly Crew",
        maxBarThickness: 10,
      },
      {
        backgroundColor: "#BBBBBB",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: opponentScores,
        label: "Opponents",
        maxBarThickness: 10,
      },
    ],
    labels: labels,
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card {...props}>
      <CardHeader
        action={
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Period</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Time Period"
              defaultValue={30}
            >
              <MenuItem value={10}>Season</MenuItem>
              <MenuItem value={20}>All Time</MenuItem>
              <MenuItem value={30}>Last 5</MenuItem>
            </Select>
          </FormControl>
        }
        title="Latest Games"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: "relative",
          }}
        >
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small">
          Overview
        </Button>
      </Box>
    </Card>
  );
};
export default Games;
