import { Card, CardContent, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

function UserNotAuth() {
  return (
    <Container maxWidth={false}>
      <Grid container spacing={10}>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <Card sx={{ height: "100%" }}>
            <CardContent><h1>Not Authorised</h1></CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserNotAuth;
