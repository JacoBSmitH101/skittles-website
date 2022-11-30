import Head from "next/head";
import { Box, Card, Container } from "@mui/material";
import PlayerList, { CustomerListResults } from "../components/players/playerlist";
import { CustomerListToolbar, PlayerListToolbar } from "../components/players/playerlisttoolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { useEffect, useState } from "react";
import { auth } from "../lib/auth";
import UserNotAuth from "../components/user-not-auth";
const Players = () => {
  const [allPlayers, setAllPlayers] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [filteredPlayers, setFilteredPlayers] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const textChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };
  const [isAuthenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://skittles-server.herokuapp.com/players")
      .then((res) => res.json())
      .then((data) => {
        setAllPlayers(data);
        setFilteredPlayers(data);
        setLoading(false);
      });
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
            if (data[i].authId === id) {
              verified = true;
              setAuthenticated(true);
              break;
            }
          }
        });
    });
  }, []);
  useEffect(() => {
    if (allPlayers && searchTerm != "") {
      let filteredObject = {};
      Object.keys(allPlayers).filter((player) => {
        if (player.toLowerCase().includes(searchTerm.toLowerCase())) {
          filteredObject[player] = allPlayers[player];
        }
      });
      setFilteredPlayers(filteredObject);
    } else {
      setFilteredPlayers(allPlayers);
    }
  }, [searchTerm]);
  if (!isAuthenticated) {
    return <UserNotAuth />;
  }
  if (isLoading)
    return (
      <Card>
        <p>No data</p>
      </Card>
    );
  if (!allPlayers || !filteredPlayers)
    return (
      <Card>
        <p>No profile data</p>
      </Card>
    );
  return (
    <>
      <Head>
        <title>Players | Jolly Crew</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <PlayerListToolbar textChangeHandler={textChangeHandler} searchTerm={searchTerm} />

          <Box sx={{ mt: 3 }}>
            <PlayerList allPlayers={filteredPlayers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Players.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Players;
