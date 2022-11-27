import Head from 'next/head';
import { Box, Container } from '@mui/material';
import PlayerList, { CustomerListResults } from '../components/players/playerlist';
import { CustomerListToolbar } from '../components/players/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';

const Players = () => (
  <>
    {/* <Head>
      <title>
        Customers | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box> */}
    <PlayerList />
  </>
);

Players.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Players;
