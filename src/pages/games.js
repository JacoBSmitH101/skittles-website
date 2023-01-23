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
  const [filteredGames, setFilteredGames] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch("https://skittles-server.herokuapp.com/lastgames/all")
      .then((res) => res.json())
      .then((data) => {
        data.games.reverse();
        data.games.forEach((game) => {
          game.name = `${game.season} Game ${game.gameNumber < 10 ? "0" : ""}${game.gameNumber}`;
        });
        setGames(data);
        setFilteredGames(data);

        setVisibleGames(data.games.slice(0, 6));
        setLoading(false);
      });
  }, []);
  const handlePageChange = (event, value) => {
    setPage(value);
    setVisibleGames(filteredGames.games.slice((value - 1) * 6, value * 6));
  };
  if (isLoading || games.length < 1) {
    return (
      <Card>
        <p>No data</p>
      </Card>
    );
    //console.log(games);
  }
  if (!isAuthenticated) {
    return <UserNotAuth />;
  }
  const filterHandler = (event) => {
    setFilter(event.target.value);
    if (event.target.value === "") {
      setVisibleGames(games.games.slice((page - 1) * 6, page * 6));
    } else {
      let filtered = games.games.filter((game) => {
        return (game.name.toLowerCase() + game.opponent.toLowerCase()).includes(event.target.value.toLowerCase());
        //filter by either .name, .opponent, whichever one has better results
        //return game.opponent.toLowerCase().includes(event.target.value.toLowerCase());


      });
      setFilteredGames({ games: filtered });
      try {
        setVisibleGames(filtered.slice((page - 1) * 6, page * 6));
      } catch (e) {
        setVisibleGames([{ name: "No games found" }]);
      }
    }
  };
  return (
    <>
      <Head>
        <title>Games {page} | Jolly Crew</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <GamesListToolbar filter={filter} filterHandler={filterHandler} />
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
              count={Math.ceil(filteredGames.games.length / 6)}
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
