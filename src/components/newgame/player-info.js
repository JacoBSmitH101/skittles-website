import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { SettingsAccessibilityOutlined } from "@mui/icons-material";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  // { field: "scores", headerName: "Scores", width: 50 },
  {
    field: "opponent",
    headerName: "Opponent",
    width: 160,
  },
];
function PlayerInfo({
  newGameInfo,
  setNewGameInfo,
  season,
  setSeason,
  game,
  setGame,
  submitNewGame,
}) {
  const [newPlayerInfo, setNewPlayerInfo] = React.useState({
    name: "",
    scores: [0, 0, 0, 0, 0, 0],
    total: 0,
    opponent: 0,
    didPlay: true,
  });
  const updatePlayerInfo = (event) => {
    let player = { ...newPlayerInfo };
    if (event.target.name == "name") {
      player.name = event.target.value;
    } // else check if its in the format scorex where x is a number 1-6
    else if (event.target.name.startsWith("score")) {
      let index = event.target.name.charAt(5);
      player.scores[index - 1] = event.target.value;
      //player.total = all player.score parsed to int and added together
      player.total = player.scores.reduce((a, b) => parseInt(a) + parseInt(b));
    } else if (event.target.name == "opponent") {
      player.opponent = event.target.value;
    }
    setNewPlayerInfo(player);
  };
  return (
    <Card>
      <CardHeader subheader="Enter player information" title="Player Info" />
      <Divider />
      <CardContent>
        {/**Row of inputs for name, each score and opponent */}
        <Grid container spacing={3} sx={{ marginBottom: "1%" }}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              onChange={updatePlayerInfo}
              required
              value={newPlayerInfo.name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2} sm={1}>
            <TextField
              fullWidth
              label="1"
              name="score1"
              onChange={updatePlayerInfo}
              required
              value={newPlayerInfo.scores[0] == 0 ? "" : newPlayerInfo.scores[0]}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2} sm={1}>
            <TextField
              fullWidth
              label="2"
              name="score2"
              onChange={updatePlayerInfo}
              required
              value={newPlayerInfo.scores[1] == 0 ? "" : newPlayerInfo.scores[1]}
              variant="outlined"
            />
          </Grid>
          {/**repeat for 6 scores */}
          <Grid item xs={2} sm={1}>
            <TextField
              fullWidth
              label="3"
              name="score3"
              onChange={updatePlayerInfo}
              required
              value={newPlayerInfo.scores[2] == 0 ? "" : newPlayerInfo.scores[2]}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2} sm={1}>
            <TextField
              fullWidth
              label="4"
              name="score4"
              onChange={updatePlayerInfo}
              required
              value={newPlayerInfo.scores[3] == 0 ? "" : newPlayerInfo.scores[3]}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2} sm={1}>
            <TextField
              fullWidth
              label="5"
              name="score5"
              onChange={updatePlayerInfo}
              required
              value={newPlayerInfo.scores[4] == 0 ? "" : newPlayerInfo.scores[4]}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2} sm={1}>
            <TextField
              fullWidth
              label="6"
              name="score6"
              onChange={updatePlayerInfo}
              required
              value={newPlayerInfo.scores[5] == 0 ? "" : newPlayerInfo.scores[5]}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2} sm={1}></Grid>
          <Grid item xs={2} sm={1}>
            <TextField
              fullWidth
              label="Total"
              name="total"
              onChange={updatePlayerInfo}
              required
              value={newPlayerInfo.total}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2} sm={1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("submit");
                let game = { ...newGameInfo };

                game.players[newPlayerInfo.name] = {
                  ...newPlayerInfo,
                  id: Math.random(2) * 100,
                  opponent: parseInt(newPlayerInfo.opponent),
                };
                setNewGameInfo(game);
                //clear newPlayerInfo
                setNewPlayerInfo({
                  name: "",
                  scores: [0, 0, 0, 0, 0, 0],
                  total: 0,
                  opponent: 0,
                  didPlay: true,
                });
                console.log(Object.values(newGameInfo.players));
              }}
            >
              <TextField
                fullWidth
                label="Opponent"
                name="opponent"
                onChange={updatePlayerInfo}
                required
                value={newPlayerInfo.opponent}
                variant="outlined"
              />
            </form>
          </Grid>
          {/* </FormControl> */}
        </Grid>
        <Divider />
        {/**data table with all of newGameInfo.players */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, marginTop: "1%", marginBottom: "1%" }} aria-label="Players">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">1st </TableCell>
                <TableCell align="right">2nd </TableCell>
                <TableCell align="right">3rd </TableCell>
                <TableCell align="right">4th </TableCell>
                <TableCell align="right">5th </TableCell>
                <TableCell align="right">6th </TableCell>

                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Opponent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(newGameInfo.players).map((player) => (
                <TableRow
                  key={newGameInfo.players[player].id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell><TextField value={player} onChange={(e) => {
                    let game = { ...newGameInfo };
                    game.players[e.target.value] = game.players[player];
                    delete game.players[player];
                    setNewGameInfo(game);
                  }}></TextField></TableCell>
                  <TableCell align="right">{newGameInfo.players[player].scores[0]}</TableCell>
                  <TableCell align="right">{newGameInfo.players[player].scores[1]}</TableCell>
                  <TableCell align="right">{newGameInfo.players[player].scores[2]}</TableCell>
                  <TableCell align="right">{newGameInfo.players[player].scores[3]}</TableCell>
                  <TableCell align="right">{newGameInfo.players[player].scores[4]}</TableCell>
                  <TableCell align="right">{newGameInfo.players[player].scores[5]}</TableCell>
                  <TableCell align="right">{newGameInfo.players[player].total}</TableCell>
                  <TableCell align="right">{newGameInfo.players[player].opponent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <Grid container spacing={3} sx={{ marginTop: "1%" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Season"
              name="season"
              onChange={(e) => setSeason(e.target.value)}
              required
              value={season}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Game"
              name="game"
              onChange={(e) => setGame(e.target.value)}
              required
              value={game}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Button variant="contained" onClick={submitNewGame}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}

export default PlayerInfo;
