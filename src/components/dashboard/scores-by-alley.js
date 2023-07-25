import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";
import { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
export const ScoresByAlley = (props) => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [jollyData, setJollyData] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch("https://skittles-server.herokuapp.com/team/Jolly Crew")
      .then((res) => res.json())
      .then((data) => {
        setJollyData(data.seasons[Object.keys(data.seasons)[Object.keys(data.seasons).length - 1]]);
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
  let homeScores = 0;
  let awayScores = 0;
  Object.keys(jollyData.games).forEach((game) => {
    if (jollyData.games[game].didPlay) {
      if (jollyData.games[game].isHome) {
        homeScores += jollyData.games[game].ourScore;
      } else {
        awayScores += jollyData.games[game].ourScore;
      }
    }
  });
  const data = {
    datasets: [
      {
        data: [homeScores, awayScores],
        backgroundColor: ["#3F51B5", "#e53935"],
        borderWidth: 2,
        borderColor: "#AAAAAA",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    legend:
    {
      labels: {
        fontColor: "#FFFFFF",
      }
    },
    labels: ["Home", "Away"],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
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

  const devices = [
    {
      title: "Home",
      value: Math.floor((homeScores / (homeScores + awayScores)) * 100),
      icon: HomeIcon,
      color: "#3F51B5",
    },
    {
      title: "Away",
      value: Math.ceil((awayScores / (homeScores + awayScores)) * 100),
      icon: LocalAirportIcon,
      color: "#E53935",
    },
  ];

  return (
    <Card {...props}>
      <CardHeader title="Scores by alley" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h4">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
