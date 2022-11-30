import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { Line, PolarArea } from "react-chartjs-2";
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

const AverageTimeGraph = ({ playerData }) => {
  const theme = useTheme();
  //foreach season in playerData, get .average from season

  let averageSeasonData = [];
  let seasonLabels = [];
  let highestScoreperSeason = [];

  Object.keys(playerData).forEach((season) => {
    averageSeasonData.push(playerData[season].average);
    seasonLabels.push(season);
    //get highest score
    let highestScore = 0;
    for (let i = 1; i < 50; i++) {
      console.log(playerData[season][`Game${i}`]);
      if (playerData[season][`Game${i}`]) {
        if (
          playerData[season][`Game${i}`].total > highestScore &&
          playerData[season][`Game${i}`].didPlay
        ) {
          highestScore = playerData[season][`Game${i}`].total;
        }
      }
    }
    highestScoreperSeason.push(highestScore);
  });
  console.log(highestScoreperSeason);
  const data = {
    labels: seasonLabels,
    datasets: [
      {
        label: "Average per season",
        data: averageSeasonData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        borderThickness: 5,

        borderWidth: 1,
      },
      {
        label: "Highest Score in season",
        data: highestScoreperSeason,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        borderThickness: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Average pins per game per season",
      },
    },
    scales: {
      y: {
        min: Math.floor(Math.min(...data.datasets[0].data)) - 4,
        max: Math.floor(Math.max(...data.datasets[1].data)) + 5,
      },
      x: {},
    },
  };

  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
  return (
    <>
      <Card sx={{ display: { xs: "none", sm: "block" } }}>
        <CardHeader title="Average Per Season" />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: "405px",
            }}
          >
            <Line data={data} options={options} />
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ display: { xs: "block", sm: "none" } }}>
        <CardHeader title="Please Rotate Phone" />
      </Card>
    </>
  );
};
export default AverageTimeGraph;
