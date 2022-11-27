import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import GameScore from "../components/game/gamescore";
import GraphSection from "../components/game/graphsection";
import HighestScore from "../components/game/highscorer";
import HistoryVSOpponent from "../components/game/history";
import Playerlist from "../components/game/playerlist";
import TeamAverage from "../components/game/teamaverage";
const Game = () => {
  const Router = useRouter();
  const { gameNumber, seasonNumber } = Router.query;
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(
      "https://skittles-server.herokuapp.com/get-game/season/" +
        seasonNumber +
        "/game/" +
        gameNumber
    )
      .then((res) => res.json())
      .then((data) => {
        setGameData(data);
        setIsLoading(false);
      });
  }, []);
  if (isLoading || !gameData) {
    return <h1>NO DATA FOUND</h1>;
  }

  return (
    <>
      <Head>
        <title>Game {gameNumber} | Jolly Crew</title>
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
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <GameScore gameData={gameData} />
            </Grid>
            <Grid item xl={3} lg={4} sm={6} xs={12}>
              <HistoryVSOpponent gameData={gameData} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <HighestScore gameData={gameData}/>
            </Grid>

            <Grid item xl={2} lg={2} sm={6} xs={12}><TeamAverage gameData={gameData}/></Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <GraphSection gameData={gameData} />
            </Grid>

            <Grid item lg={4} md={6} xl={3} xs={12}><Playerlist gameData={gameData} /></Grid>
            <Grid item lg={12} md={12} xl={9} xs={12}><h1>PLACEHOLDER</h1></Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
Game.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Game;
