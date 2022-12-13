import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Head from "next/head";
import { Box, Button, Card, CardContent, Container, Grid } from "@mui/material";
import LastGame from "../components/dashboard/LastGame";
import LatestGames from "../components/dashboard/latest-games";
import Games from "../components/dashboard/games";
import SeasonProgress from "../components/dashboard/season-progress";
import HighestScore from "../components/dashboard/highest-score";
import SeasonDifference from "../components/dashboard/season-difference";
import { ScoresByAlley } from "../components/dashboard/scores-by-alley";
import { DashboardLayout } from "../components/dashboard-layout";
import GameInfo from "../components/newgame/game-info";
import React, { useEffect, useState } from "react";
import { auth } from "../lib/auth";
import UserNotAuth from "../components/user-not-auth";
import PlayerInfo from "../components/newgame/player-info";
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
const AddNewGame = () => {
  const [season, setSeason] = React.useState("");
  const [game, setGame] = React.useState("");
  const [newGameInfo, setNewGameInfo] = React.useState({
    alley: "",
    opponent: "",
    players: {},
    ourTotal: 0,
    opponentTotal: 0,
    isHome: false,
    isAway: false,
    difference: 0,
  });
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const submitNewGame = () => {
    let newGame = { ...newGameInfo };
    newGame.season = season;
    newGame.gameNumber = game;
    newGame.ourTotal = 0;
    newGame.opponentTotal = 0;
    newGame.difference = 0;
    Object.keys(newGame.players).forEach((player) => {
      newGame.ourTotal += newGame.players[player].total;
      newGame.opponentTotal += newGame.players[player].opponent
      newGame.difference += newGame.players[player].total - newGame.players[player].opponent
    });
    fetch(`http://localhost:4000/addnewgame/Jolly Crew/${season}/${game}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame, getCircularReplacer()),
    })
      .then((res) => console.log(res))
      .catch((err) => alert(err));
  };
  useEffect(() => {
    auth.getCurrentUser().then((res) => {
      if (!res) {
        setAuthenticated(false);
        return;
      }
      let id = res.subId.slice(0, -3);
      fetch("https://skittles-server.herokuapp.com/verified-users-list")
        .then((res) => res.json())
        .then((data) => {
          let verified = false;
          for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            if (
              data[i].authId === id &&
              (data[i].name == "Jacob Smith" || data[i].name == "Roger Smith")
            ) {
              setUserInfo(data[i]);
              setAuthenticated(true);
              break;
            }
          }
        });
    });
  }, []);

  if (!isAuthenticated) {
    return <UserNotAuth />;
  }
  return (
    <>
      <Head>
        <title>New Game | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item spacing={3} lg={12} sm={12} xl={3} xs={12}>
              <GameInfo setNewGameInfo={setNewGameInfo} newGameInfo={newGameInfo} />
            </Grid>
            <Grid item spacing={3} lg={12} sm={12} xl={3} xs={12}>
              <PlayerInfo
                newGameInfo={newGameInfo}
                setNewGameInfo={setNewGameInfo}
                season={season}
                setSeason={setSeason}
                game={game}
                setGame={setGame}
                submitNewGame={submitNewGame}
              />
            </Grid>
            {/* <Grid item spacing={3} lg={12} sm={6} xl={3} xs={12}>
              <ListMenu />
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
AddNewGame.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default AddNewGame;
