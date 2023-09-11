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
const toEvenBelow = (num) => {
  return Math.floor(num / 2) * 2;
};
const AverageTimeGraph = ({ data }) => {
  const theme = useTheme();
  //foreach season in playerData, get .average from season
  const [averages, setAverages] = useState([]);
  let averageSeasonData = [];
  let seasonLabels = [1, 2, 3, 4, 5, 6, 7];
  let highestScoreperSeason = [];
  let wholeAverage = 0;
  let averageCareer = [];
  useEffect(() => {
    //foreach season, first 4 digits of matchid, add up all scores and divide by number of games
    //then compare to highest average
    //if higher, set highest average to that average and set highest average season to that season
    var Averages = {};
    data.matchesPlayers.forEach((match) => {
      var season = String(match.matchid).slice(0, 4);
      if (Averages[season]) {
        Averages[season].totalScore += match.score;
        Averages[season].gamesPlayed += 1;
        Averages[season].average = Averages[season].totalScore / Averages[season].gamesPlayed;
      } else {
        Averages[season] = {
          totalScore: match.score,
          gamesPlayed: 1,
          average: match.score,
        };
      }
    });
    console.log(Averages)
    var newaverages = [];
    Object.values(Averages).forEach((season) => {
      newaverages.push(season.average);
    });
    setAverages(newaverages);
  }, [data]);

  wholeAverage = averageSeasonData.reduce((a, b) => a + b, 0) / averageSeasonData.length;
  for (let i = 0; i < averageSeasonData.length; i++) {
    averageCareer[i] = wholeAverage;
  }
  const datatable = {
    labels: seasonLabels,
    datasets: [
      {
        label: "Average per season",
        data: averages,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        borderThickness: 5,

        borderWidth: 1,
      },
      // {
      //   label: "Highest Score in season",
      //   data: highestScoreperSeason,
      //   backgroundColor: "rgba(54, 162, 235, 0.5)",
      //   borderColor: "rgb(54, 162, 235)",
      //   borderThickness: 10,
      // },
      // {
      //   label: "Career Average",
      //   data: averageCareer,
      //   backgroundColor: "rgba(255, 206, 86, 0.5)",
      //   borderColor: "rgb(255, 206, 86)",
      //   borderThickness: 5,
      // },
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
        min: 20,
        max: 60,
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
            <Line data={datatable} options={options} />
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ display: { xs: "block", sm: "none" } }}>
        <CardHeader title="Rotate phone to see graph" />
      </Card>
    </>
  );
};
export default AverageTimeGraph;
