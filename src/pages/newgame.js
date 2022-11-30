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
import PlayerList from "../components/newgame/player-list";
import ListMenu from "../components/newgame/list-menu";
import React, { useEffect, useState } from "react";
import { auth } from "../lib/auth";
import UserNotAuth from "../components/user-not-auth";
const AddNewGame = () => {
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
    setNewGameInfo(
      {
        ...newGameInfo,
        difference: newGameInfo.ourTotal - newGameInfo.opponentTotal,
      },
      [newGameInfo]
    );
  }, []);
  const submitNewGameInfo = () => {
    //if all of new game info is filled out, submit to database else return error
    if (
      newGameInfo.alley != "" &&
      newGameInfo.opponent != "" &&
      Object.keys(newGameInfo.players).length > 0 &&
      newGameInfo.ourTotal != 0 &&
      newGameInfo.opponentTotal != 0
    ) {
      fetch("https://skittles-server.herokuapp.com/input-next-game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGameInfo),
      }).then((res) => {});
    } else {
      alert("Please fill out all fields");
    }
  };
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
              <PlayerList
                setNewGameInfo={setNewGameInfo}
                newGameInfo={newGameInfo}
                submitGame={submitNewGameInfo}
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
