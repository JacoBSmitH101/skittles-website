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
function ListMenu({ newGameInfo, setNewGameInfo, submitGame, game, setGame, season, setSeason }) {
  const [jollyCrewTotal, setJollyCrewTotal] = React.useState(0);
  const [opponentTotal, setOpponentTotal] = React.useState(0);
  

  const handleTotalInput = (event) => {
    if (event.target.name == "jollyCrewTotal") {
      setJollyCrewTotal(event.target.value);
    } else if (event.target.name == "season") {
      setSeason(event.target.value)
    }
    else if (event.target.name == "game") {
      setGame(event.target.value)
    }else {
      setOpponentTotal(event.target.value);
    }
  };
  const testFunc = () => {
    console.log(newGameInfo);
  };
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
              value={newGameInfo.ourTotal}
              onChange={(event) => {setNewGameInfo({...newGameInfo, ourTotal: event.target.value})}}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Season"
              name="season"
              required
              value={season}
              onChange={handleTotalInput}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Game"
              name="game"
              required
              value={game}
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
      <Button onClick={submitGame} type="outlined">SUBMIT</Button>
    </Card>
  );
}

export default ListMenu;
