import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { fetchMatchById } from "../../utils/data";
import { useState } from "react";
import DevelopmentDialog from "../../components/development-dialog";

const Game = ({ game: initialGame }) => {
  const [game, setGame] = useState(initialGame);

  // any additional states and logic you might need

  return (
    <>
      <DevelopmentDialog page="game" />
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Grid container spacing={3}>
          {/* Match details */}
          <Grid item lg={8} md={6} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h4">Match ID: {game.matchID}</Typography>
                <Typography variant="subtitle1">Opponent: {game.opponentScore}</Typography>
                {/* other game details */}
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar with additional info */}
          <Grid item lg={4} md={6} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Additional Info</Typography>
                {/* additional info here */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
Game.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export async function getServerSideProps(context) {
  const { id } = context.params;
  const game = await fetchMatchById(id);

  return {
    props: {
      game,
    },
  };
}

export default Game;
