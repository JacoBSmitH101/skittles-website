import Head from "next/head";
import { Box, Card, Container, Grid, Pagination } from "@mui/material";
import { products } from "../__mocks__/products";
import { GamesListToolbar } from "../components/games/product-list-toolbar";
import { ProductCard } from "../components/games/product-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState } from "react";
import { auth } from "../lib/auth";
import UserNotAuth from "../components/user-not-auth";
import { fetchMatches, fetchMatchesPlayers, fetchPlayers } from "../utils/data";

const Games = ({ matches, matchesPlayers, players }) => {

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
          {/* <GamesListToolbar filter={filter} filterHandler={filterHandler} /> */}
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {matches.map((game) => (
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
              // page={page}
              // onChange={handlePageChange}
              // count={Math.ceil(filteredGames.games.length / 6)}
              size="small"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Games.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
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
export default Games;
