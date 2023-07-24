import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import LastGame from "../components/dashboard/LastGame";
import LatestGames from "../components/dashboard/latest-games";
import Games from "../components/dashboard/games";
import SeasonProgress from "../components/dashboard/season-progress";
import HighestScore from "../components/dashboard/highest-score";
import SeasonDifference from "../components/dashboard/season-difference";
import { ScoresByAlley } from "../components/dashboard/scores-by-alley";
import { DashboardLayout } from "../components/dashboard-layout";
import { auth } from "../lib/auth";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import { fetchMatches, fetchMatchesPlayers, fetchPlayers } from "../utils/data";
import { getLastGameInfo, getLastGamesList } from "../utils/skittlesData";
import LowestScore from "../components/dashboard/lowest-score";
import TopPinCounts from "../components/dashboard/top-pincount";
import TopScores from "../components/dashboard/top-scores";
import TopAverages from "../components/dashboard/top-alltime-average";
const Page = ({ matches, matchesPlayers, players }) => {
  return (
    <>
      <Head>
        <title>Jolly Crew Dashboard</title>
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
              <LastGame matches={matches} />
            </Grid>

            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <SeasonProgress matches={matches} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <HighestScore matches={matches} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <LowestScore matches={matches} />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TopScores matches={matches} matchesPlayers={matchesPlayers} players={players} topN={5} />
            </Grid>
            {/* <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TopAveragesThisSeason matches={matches} players={players} topN={5} />
            </Grid> */}
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TopPinCounts matchesPlayers={matchesPlayers} players={players} topN={5} />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TopAverages matchesPlayers={matchesPlayers} players={players} topN={5} />
            </Grid>
            {/* 
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <SeasonDifference sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <Games />
            </Grid>

            <Grid item lg={4} md={6} xl={3} xs={12}>
              <ScoresByAlley sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={12} md={12} xl={9} xs={12}>
              <LatestGames />
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export async function getServerSideProps() {
  const matches = await fetchMatches();
  const players = await fetchPlayers();
  const matchesPlayers = await fetchMatchesPlayers();

  return {
    props: {
      matches,
      players,
      matchesPlayers,
    },
  };
}
