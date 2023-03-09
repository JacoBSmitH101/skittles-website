/* eslint-disable react/jsx-max-props-per-line */
import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import AlleyHistory from "../components/game/alleyhistory";
import GameScore from "../components/game/gamescore";
import GraphSection from "../components/game/graphsection";
import HighestScore from "../components/game/highscorer";
import HistoryVSOpponent from "../components/game/history";
import PlayerList from "../components/game/playerlist";
import TeamAverage from "../components/game/teamaverage";
import UserNotAuth from "../components/user-not-auth";
import { Provider } from "react-redux";
import { store } from "../lib/store";
const Opponent = () => {
  const Router = useRouter();
  const { teamName } = Router.query;
  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);
  useEffect(() => {
    
  }, []);
//   if (isLoading || !teamData) {
//     return <h1>NO DATA FOUND</h1>;
//   }
  if (!authenticated) {
    return <UserNotAuth />;
  }

  return (
    <Provider store={store}>
      <Head>
        <title>{teamName} | Jolly Crew</title>
      </Head>
      <h1></h1>
    </Provider>
  );
};
Opponent.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Opponent;
