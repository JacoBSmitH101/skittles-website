import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { SeverityPill } from "../severity-pill";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
function ListMenu({ newGameInfo, setNewGameInfo }) {
  const [jollyCrewTotal, setJollyCrewTotal] = React.useState(0);
  const [opponentTotal, setOpponentTotal] = React.useState(0);

  const handleTotalInput = (event) => {
    if (event.target.name == "jollyCrewTotal") {
      setJollyCrewTotal(event.target.value);
    } else {
      setOpponentTotal(event.target.value);
    }
  };
  const testFunc = () => {
    console.log(newGameInfo);
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
          <Grid item md={1} xs={1}>
            <Avatar
              sx={{
                backgroundColor:
                  parseInt(jollyCrewTotal) == parseInt(newGameInfo.ourTotal) && jollyCrewTotal != 0
                    ? "success.main"
                    : "error.main",
                height: 50,
                width: 50,
              }}
            >
              {parseInt(jollyCrewTotal) == parseInt(newGameInfo.ourTotal) && jollyCrewTotal != 0 ? (
                <DoneIcon />
              ) : (
                <ClearIcon />
              )}
            </Avatar>
          </Grid>
          <Grid item md={6} xs={6}>
            {parseInt(jollyCrewTotal) != parseInt(newGameInfo.ourTotal) && jollyCrewTotal != 0 ? (
              <Alert severity="error">Total is not added correctly</Alert>
            ) : (
              <> </>
            )}
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
          <Grid item md={1} xs={1}>
            <Avatar
              sx={{
                backgroundColor:
                  parseInt(opponentTotal) == parseInt(newGameInfo.opponentTotal) &&
                  opponentTotal != 0
                    ? "success.main"
                    : "error.main",
                height: 50,
                width: 50,
              }}
            >
              {parseInt(opponentTotal) == parseInt(newGameInfo.opponentTotal) &&
              opponentTotal != 0 ? (
                <DoneIcon />
              ) : (
                <ClearIcon />
              )}
            </Avatar>
          </Grid>
          <Grid item md={6} xs={6}>
            {parseInt(opponentTotal) != parseInt(newGameInfo.opponentTotal) && opponentTotal != 0 ? (
              <Alert severity="error">Total is not added correctly</Alert>
            ) : (
              <> </>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Button onClick={testFunc}>Calculate Totals</Button>
    </Card>
  );
}

export default ListMenu;
