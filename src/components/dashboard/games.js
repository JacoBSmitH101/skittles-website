/* eslint-disable react/jsx-max-props-per-line */
import { Bar, Line } from "react-chartjs-2";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { auth } from "../../lib/auth";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useState, useEffect } from "react";
const Games = (props) => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [jollyData, setJollyData] = useState(null);
  const [lastFiveGamesData, setLastFiveGamesData] = useState(null);
  const [lastSeasonData, setLastSeasonData] = useState(null);
  const [graphSelected, setGraphSelected] = useState(2);

  useEffect(() => {
    setLoading(true);
    fetch("https://skittles-server.herokuapp.com/lastgames/5")
      .then((res) => res.json())
      .then((data) => {
        setLastFiveGamesData(data);
      });
    fetch("https://skittles-server.herokuapp.com/lastgames/latestseason")
      .then((res) => res.json())
      .then((data) => {
        setLastSeasonData(data);
      });
      fetch("https://skittles-server.herokuapp.com/lastgames/all") 
      .then((res) => res.json())
      .then((data) => {
        setJollyData(data);
        setLoading(false);
      });
  }, []);
  if (isLoading)
    return (
      <Card>
        <p>No data</p>
      </Card>
    );
  if (!lastSeasonData)
    return (
      <Card>
        <p>No profile data</p>
      </Card>
    );
  //loop through every game in jollyData.seasons["2223"].games
  //find the highest score
  let lastFiveGameScores = [];
  let lastFiveGameOpponentScores = [];
  let lastFiveGameLabels = [];
  lastFiveGamesData.forEach((game) => {
    lastFiveGameScores.push(game.score);
    lastFiveGameOpponentScores.push(game.opponentScore);
    if (game.isHome) {
      lastFiveGameLabels.push("Game " + game.matchID.toString().split(0, 4) + "  Home");
    } else {
      lastFiveGameLabels.push("Game " + game.matchID.toString().split(0, 4)  + "  Away");
    }
  });

  let seasonScores = [];
  let seasonOpponentScores = [];
  let seasonLabels = [];
  Object.keys(lastSeasonData).forEach((game) => {
    if (lastSeasonData[game]) {
      seasonScores.push(lastSeasonData[game].score);
      seasonOpponentScores.push(lastSeasonData[game].opponentScore);
      seasonLabels.push("Game " + lastSeasonData[game].matchID.toString().split(0, 4) );
    }
  });
  const graphSelectionHandler = (event) => {
    setGraphSelected(event.target.value);
  };
  let allGamesScores = [];
  let allGamesOpponentScores = [];
  let allGamesLabels = [];
  Object.keys(jollyData).forEach((game) => {
      if (jollyData[game]) {
        allGamesScores.push(jollyData[game].ourScore);
        allGamesOpponentScores.push(jollyData[game].opponentScore);
        allGamesLabels.push(
          "Game " + jollyData[game].matchID.toString().split(4, 6)  
        ); 
      }
  });

  const lastFiveGamesGraphData = {
    datasets: [
      {
        backgroundColor: "#3F51B5",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: lastFiveGameScores,
        label: "Jolly Crew",
        maxBarThickness: 15,
      },
      {
        backgroundColor: "#BBBBBB",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: lastFiveGameOpponentScores,
        label: "Opponents",
        maxBarThickness: 15,
      },
    ],
    labels: lastFiveGameLabels,
  };
  const seasonGraphData = {
    datasets: [
      {
        backgroundColor: "#3F51B5",
        barPercentage: 0.5,
        barThickness: 8,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: seasonScores,
        label: "Jolly Crew",
        maxBarThickness: 15,
      },
      {
        backgroundColor: "#BBBBBB",
        barPercentage: 0.5,
        barThickness: 8,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: seasonOpponentScores,
        label: "Opponents",
        maxBarThickness: 15,
      },
    ],
    labels: seasonLabels,
  };
  const allGamesGraphData = {
    datasets: [
      {
        backgroundColor: "#3F51B5",
        borderColor: "#3F51B5",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: allGamesScores,
        label: "Jolly Crew",
        maxBarThickness: 10,
      },
    ],
    labels: allGamesLabels,
  };

  const options = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    color: "white",
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      y: {
        color: "white",
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        }
      },
    },
    xAxes: [
      {
        ticks: {
          fontColor: "white",
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
          color: "white",
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: "rgba(255, 255, 255, 0.2)",
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
          <FormControl style={{ minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-label">Period</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Time Period"
              defaultValue={graphSelected}
              onChange={graphSelectionHandler}
            >
              <MenuItem value={0}>All Time</MenuItem>
              <MenuItem value={1}>Season</MenuItem>
              <MenuItem value={2}>Last 5</MenuItem>
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
          {graphSelected == 2 ? <Bar data={lastFiveGamesGraphData} options={options} /> : <></>}
          {graphSelected == 1 ? <Bar data={seasonGraphData} options={options} /> : <></>}
          {graphSelected == 0 ? <Line data={allGamesGraphData} options={options} /> : <></>}
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
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          disabled
          onClick={async () => {}}
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};
export default Games;
