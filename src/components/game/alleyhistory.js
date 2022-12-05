import React, { useRef } from "react";
import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import HistoryIcon from "@mui/icons-material/History";
import { useState, useEffect } from "react";
import NotImplementedPopover from "./notimplementedpopover";
function AlleyHistory({ gameData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [previousGames, setPreviousGames] = useState([]);
  const [totalWins, setTotalWins] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notImplementedPopover, setNotImplementedPopover] = useState(false);

  const [totalLosses, setTotalLosses] = useState(0);
  const [stateText, setStateText] = useState(null);
  const buttonRef = useRef(null);
  const updateHistory = (data) => {
    setTotalWins(0);
    setTotalLosses(0);
    let totalWins2 = 0;
    let totalLosses2 = 0;
    data.forEach((game) => {
      if (game.ourScore > game.opponentScore) {
        totalWins2++;
        setTotalWins((prev) => prev + 1);
        if (totalWins2 > totalLosses2) {
          setStateText(
            <Typography color="secondary.main" gutterBottom variant="overline">
              {"  "}(WINNING)
            </Typography>
          );
        } else if (totalWins2 < totalLosses2) {
          setStateText(
            <Typography color="error.main" gutterBottom variant="overline">
              {"  "}(LOSING)
            </Typography>
          );
        } else {
          setStateText(
            <Typography color="warning.light" gutterBottom variant="overline">
              {"  "}(MEH)
            </Typography>
          );
        }
      } else {
        totalLosses2++;
        setTotalLosses((prev) => prev + 1);
        if (totalWins2 > totalLosses2) {
          setStateText(
            <Typography color="secondary.main" gutterBottom variant="overline">
              {"  "}(WINNING)
            </Typography>
          );
        } else if (totalWins2 < totalLosses2) {
          setStateText(
            <Typography color="error.main" gutterBottom variant="overline">
              {"  "}(LOSING)
            </Typography>
          );
        } else {
          setStateText(
            <Typography color="warning.light" gutterBottom variant="overline">
              {"  "}(MEH)
            </Typography>
          );
        }
      }
    });
  };
  useEffect(() => {
    fetch(`https://skittles-server.herokuapp.com/gamesat/${gameData.alley}`)
      .then((res) => res.json())
      .then((data) => {
        setPreviousGames(data, updateHistory(data));
        setIsLoading(false);
      });
  }, []);
  if (isLoading || !previousGames) {
    return <h1>NO DATA FOUND</h1>;
  }
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ pb: "3.5%", "&:last-child": { pd: "0%" } }}>
        <Grid container spacing={3} sx={{ justifyContent: "space-between", paddingBottom: "0" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              HISTORY AT {gameData.alley}
            </Typography>
            {stateText}
            <Typography color="textPrimary" variant="h5">
              {totalWins} - {totalLosses}
            </Typography>
          </Grid>
          <Grid item sx={{ display: { xs: "none", lg: "block", xl: "block" } }}>
            <Avatar
              sx={{
                backgroundColor: totalWins < totalLosses ? "error.main" : "success.main",
                height: 56,
                width: 56,
              }}
            >
              <HistoryIcon />
            </Avatar>
          </Grid>
          <Button
            ref={buttonRef}
            onClick={() => {
              setNotImplementedPopover(true);
            }}
            sx={{ marginLeft: "3%", marginBottom: "0", marginTop: "0" }}
          >
            View full history
          </Button>
        </Grid>
      </CardContent>
      <NotImplementedPopover
        anchorEl={buttonRef.current}
        onClose={() => setNotImplementedPopover(false)}
        open={notImplementedPopover}
      />
    </Card>
  );
}

export default AlleyHistory;
