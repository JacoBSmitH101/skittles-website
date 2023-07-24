import Head from "next/head";
import { Box, Card, Container, Grid, Pagination } from "@mui/material";
import { products } from "../__mocks__/products";
import { GamesListToolbar } from "../components/games/product-list-toolbar";
import { GameCard } from "../components/games/game-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState } from "react";
import { auth } from "../lib/auth";
import UserNotAuth from "../components/user-not-auth";
import { fetchMatches, fetchMatchesPlayers, fetchPlayers, getListOfTeams } from "../utils/data";

const Games = ({ matches: initialMatches, matchesPlayers, players, teams }) => {
  const [matches, setMatches] = useState(initialMatches);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const gamesPerPage = 6;
  const [sort, setSort] = useState("recent");
  const [teamOptions, setTeamOptions] = useState(teams);
  useEffect(() => {
    // Filter matches based on search query
    const filteredMatches = initialMatches.filter((game) => {
      const opponentNameMatches =
        game.opponentName &&
        game.opponentName.includes(search) &&
        teamOptions.includes(game.opponentName);
      return opponentNameMatches;
    });
    filteredMatches = filteredMatches.filter(
      (game) =>
        (game.opponentName && game.opponentName.includes(search)) ||
        (game.matchID && String(game.matchID).includes(search)) ||
        (game.alley && game.alley.includes(search))
    );
    // Sort filtered matches by matchID in descending order
    // Sort filtered matches
    const sortedMatches = filteredMatches.sort((a, b) => {
      switch (sort) {
        case "score":
          return b.score - a.score;
        case "opponentScore":
          return b.opponentScore - a.opponentScore;
        case "alley":
          return a.alley.localeCompare(b.alley);
        case "recent":
        default:
          return b.matchID - a.matchID;
      }
    });
    console.log(teams);

    setMatches(sortedMatches);
  }, [search, sort, initialMatches, teamOptions]);

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
          <GamesListToolbar
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
            setTeamOptions={setTeamOptions}
            teamOptions={teamOptions}
            teams={teams}
          />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {matches.slice((page - 1) * gamesPerPage, page * gamesPerPage).map((game) => (
                <Grid item key={game.opponent} lg={4} md={6} xs={12}>
                  <GameCard game={game} />
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
              size="small"
              count={Math.ceil(matches.length / gamesPerPage)}
              page={page}
              onChange={(event, value) => setPage(value)}
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
  const teams = await getListOfTeams();

  return {
    props: {
      matches,
      players,
      matchesPlayers,
      teams,
    },
  };
}

export default Games;
