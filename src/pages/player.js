import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import HighestScore from "../components/player/highestscore";
import PlayerHeader from "../components/player/header";
import HighestAverage from "../components/player/highestaverage";
const Game = () => {
  const Router = useRouter();
  const { name } = Router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [playerData, setPlayerData] = useState(null);
  useEffect(() => {
    fetch(
      "https://skittles-server.herokuapp.com/player/" + name
    )
      .then((res) => res.json())
      .then((data) => {
        setPlayerData(data);
        setIsLoading(false);
      });
  }, []);
  if (isLoading || !playerData  ) {
    return <h1>NO DATA FOUND</h1>;
  }

  return (
    <>
      <Head>
        <title>{name} | Jolly Crew</title>
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
            <Grid item lg={5} sm={6} xl={3} xs={12}>
                <PlayerHeader name={name} playerData={playerData} />
            </Grid>
            <Grid item xl={4.5} lg={3.5} sm={3} xs={12}>
                <HighestAverage playerData={playerData}/>
            </Grid>
            <Grid item xl={4.5} lg={3.5} sm={3} xs={12}>
                <HighestScore playerData={playerData} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
            </Grid>

            <Grid item xl={2} lg={2} sm={6} xs={12}>
            </Grid>

            <Grid item lg={4} md={6} xl={3} xs={12}>
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
            </Grid>
            <Grid item xl={3} lg={4} sm={6} xs={12}>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
Game.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Game;
