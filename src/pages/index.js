import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import LastGame from "../components/dashboard/LastGame";
import SeasonProgress from "../components/dashboard/season-progress";
import HighestScore from "../components/dashboard/highest-score";
import { DashboardLayout } from "../components/dashboard-layout";
import { fetchAndCacheData, fetchMatches, fetchMatchesPlayers, fetchPlayers } from "../utils/data";
import LowestScore from "../components/dashboard/lowest-score";
import TopPinCounts from "../components/dashboard/top-pincount";
import TopScores from "../components/dashboard/top-scores";
import TopAverages from "../components/dashboard/top-alltime-average";
import { useEffect, useState } from "react";
import LoadingDialog from "../components/loading-dialog";
const Page = ({ matches, matchesPlayers, players }) => {
  const [data, setData] = useState({ matches: [], players: [], matchesPlayers: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAndCacheData().then((newData) => {
      setData(newData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingDialog /> 
  }

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
              <LastGame matches={data.matches} />
            </Grid>

            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <SeasonProgress matches={data.matches} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <HighestScore matches={data.matches} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <LowestScore matches={data.matches} />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TopScores
                matches={data.matches}
                matchesPlayers={data.matchesPlayers}
                players={data.players}
                topN={5}
              />
            </Grid>
            {/* <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TopAveragesThisSeason matches={matches} players={players} topN={5} />
            </Grid> */}
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TopPinCounts matchesPlayers={data.matchesPlayers} players={data.players} topN={5} />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TopAverages matchesPlayers={data.matchesPlayers} players={data.players} topN={5} />
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

// export async function getServerSideProps() {
//   const { matches, players, matchesPlayers } = await fetchAndCacheData();

//   return {
//     props: {
//       matches,
//       players,
//       matchesPlayers,
//     },
//   };
// }
