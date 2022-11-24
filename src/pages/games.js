import Head from "next/head";
import { Box, Card, Container, Grid, Pagination } from "@mui/material";
import { products } from "../__mocks__/products";
import { GamesListToolbar } from "../components/games/product-list-toolbar";
import { ProductCard } from "../components/games/product-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState } from "react";
import { auth } from "../lib/auth";
import UserNotAuth from "../components/user-not-auth";
const Games = () => {
  const [games, setGames] = useState([]);
  const [visibleGames, setVisibleGames] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch("https://skittles-server.herokuapp.com/get-last-games/amount/80")
      .then((res) => res.json())
      .then((data) => {
        data.games.reverse();
        setGames(data);
        setVisibleGames(data.games.slice(0, 6));
        setLoading(false);
      });
    auth.getCurrentUser().then((res) => {
      let id = res.subId.slice(0, -3);
      fetch("https://skittles-server.herokuapp.com/verified-users-list")
        .then((res) => res.json())
        .then((data) => {
          let verified = false;
          for (let i = 0; i < data.length; i++) {
            if (data[i].authId === id) {
              verified = true;
              setUserInfo(data[i]);
              setAuthenticated(true);
              break;
            }
          }
        });
    });
  }, []);
  const handlePageChange = (event, value) => {
    setPage(value);
    setVisibleGames(games.games.slice((value - 1) * 6, value * 6));
  };
  if (isLoading || games.length < 1) {
    return (
      <Card>
        <p>No data</p>
      </Card>
    );
    console.log(games);
  }
  if (!isAuthenticated) {
    return <UserNotAuth />;
  }
  return (
    <>
      <Head>
        <title>Games | Jolly Crew</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <GamesListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {visibleGames.map((game) => (
                <Grid item key={game.opponent} lg={4} md={6} xs={12}>
                  <ProductCard game={game} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination
              color="primary"
              page={page}
              onChange={handlePageChange}
              count={10}
              size="small"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Games.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Games;
