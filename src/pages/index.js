import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import LastGame from "../components/dashboard/LastGame";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import SeasonProgress from "../components/dashboard/season-progress";
import TotalScore from "../components/dashboard/total-score";
import SeasonDifference from "../components/dashboard/season-difference";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";

const Page = () => (
  <>
    <Head>
      <title>Dashboard | Material Kit</title>
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
          
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <LastGame />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalScore />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <SeasonProgress />
          </Grid>
          
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <SeasonDifference sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>

          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
