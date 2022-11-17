import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";
import { useState, useEffect } from "react";
export const ScoresByAlley = (props) => {
  const theme = useTheme();
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
  console.log("TEST TEST" + jollyData.seasons[Object.keys(jollyData.seasons)[Object.keys(jollyData.seasons).length - 1]]);
  let homeScores = 0;
  let awayScores = 0;
  Object.values(latestSeason.games).forEach((game) => {
    if (game.isHome || game.isAway) {
      if (game.isHome) {
        homeScores += game.ourScore;
      } else {
        awayScores += game.ourScore;
      }
    }
  });
  const data = {
    datasets: [
      {
        data: [homeScores, awayScores],
        backgroundColor: ["#3F51B5", "#e53935"],
        borderWidth: 8,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
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
      value: Math.floor((homeScores / (homeScores + awayScores)) * 100 * 100) / 100,
      icon: LaptopMacIcon,
      color: "#3F51B5",
    },
    {
      title: "Away",
      value: Math.floor((awayScores / (homeScores + awayScores)) * 100 * 10) / 10,
      icon: TabletIcon,
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
