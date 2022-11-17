import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Head from "next/head";
import { Box, Card, CardContent, Container, Grid } from "@mui/material";
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
const AddNewGame = () => {
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
            <Grid item spacing={3} lg={12} sm={6} xl={3} xs={12}>
              <GameInfo />
            </Grid>
            <Grid item spacing={3} lg={12} sm={6} xl={3} xs={12}>
              <PlayerList />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
AddNewGame.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default AddNewGame;
