import { Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from "@mui/material";
import React from "react";
import { SeverityPill } from "../severity-pill";

function ListMenu() {
  const [jollyCrewTotal, setJollyCrewTotal] = React.useState(0);
  const [opponentTotal, setOpponentTotal] = React.useState(0);

  const handleTotalInput = (event) => {
    if (event.target.name == "jollyCrewTotal") {
      setJollyCrewTotal(event.target.value);
    } else {
      setOpponentTotal(event.target.value);
    }
  };
  //TODO: link to newgame.js
  return (
    <Card>
      <CardHeader subheader="Nearly there..." title="Final Info" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={2} xs={2}>
            <TextField
              fullWidth
              label="Jolly Crew Total"
              name="jollyCrewTotal"
              required
              value={jollyCrewTotal}
              onChange={handleTotalInput}
              variant="outlined"
            />
          </Grid>
          <Grid item md={2} xs={2}>
            <SeverityPill></SeverityPill>
          </Grid>
        </Grid>
        <Grid container marginTop="1%" spacing={3}>
          <Grid item md={2} xs={2}>
            <TextField
              fullWidth
              label="Opponent Total"
              name="opponentTotal"
              required
              value={opponentTotal}
              onChange={handleTotalInput}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Button>Calculate Totals</Button>
    </Card>
  );
}

export default ListMenu;
