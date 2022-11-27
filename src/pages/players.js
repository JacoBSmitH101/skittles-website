import Head from "next/head";
import { Box, Container } from "@mui/material";
import PlayerList, { CustomerListResults } from "../components/players/playerlist";
import { CustomerListToolbar, PlayerListToolbar } from "../components/players/playerlisttoolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";

const Players = () => (
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
        <PlayerListToolbar />

        <Box sx={{ mt: 3 }}>
          <PlayerList />
        </Box>
      </Container>
    </Box>
  </>
);

Players.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Players;
