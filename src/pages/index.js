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

const Page = () => {
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
              <LastGame />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <HighestScore />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <SeasonProgress />
            </Grid>

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
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
