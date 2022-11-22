import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { PolarArea } from "react-chartjs-2";
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
const GraphSection = ({ gameData }) => {
  const theme = useTheme();
  var averagePerTurn = {
    1: { amount: 0, total: 0 },
    2: { amount: 0, total: 0 },
    3: { amount: 0, total: 0 },
    4: { amount: 0, total: 0 },
    5: { amount: 0, total: 0 },
    6: { amount: 0, total: 0 },
  };

  Object.keys(gameData.players).forEach((player) => {
    averagePerTurn[1].amount += 1;
    averagePerTurn[1].total += parseInt(gameData.players[player].h1);
    averagePerTurn[2].amount += 1;
    averagePerTurn[2].total += parseInt(gameData.players[player].h2);
    averagePerTurn[3].amount += 1;
    averagePerTurn[3].total += parseInt(gameData.players[player].h3);
    averagePerTurn[4].amount += 1;
    averagePerTurn[4].total += parseInt(gameData.players[player].h4);
    averagePerTurn[5].amount += 1;
    averagePerTurn[5].total += parseInt(gameData.players[player].h5);
    averagePerTurn[6].amount += 1;
    averagePerTurn[6].total += parseInt(gameData.players[player].h6);
  });
  console.log(averagePerTurn);
  const data = {
    labels: ["1st", "2nd", "3rd", "4th", "5th", "6th"],
    datasets: [
      {
        label: "Average Pins on turn",
        data: [
          averagePerTurn[1].total / averagePerTurn[1].amount,
          averagePerTurn[2].total / averagePerTurn[2].amount,
          averagePerTurn[3].total / averagePerTurn[3].amount,
          averagePerTurn[4].total / averagePerTurn[4].amount,
          averagePerTurn[5].total / averagePerTurn[5].amount,
          averagePerTurn[6].total / averagePerTurn[6].amount,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
  return (
    <Card>
      <CardHeader
        
        title="Average pins per hand"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 800,
            position: "relative",
          }}
        >
          <PolarArea data={data} />
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
          onClick={async () => {}}
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};
export default GraphSection;
