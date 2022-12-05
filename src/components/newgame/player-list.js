import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListMenu from "./list-menu";
function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}
function PlayerList({ newGameInfo, setNewGameInfo, submitGame, game, setGame, season, setSeason }) {
  const [playerList, setPlayerList] = React.useState({ players: {} });
  const [playerInput, setPlayerInput] = React.useState("");
  let fileInput = React.createRef();
  const checkforTotal = (event) => {
    let data = { ...playerList };
    let player = playerList.players[event.target.name.slice(0, -2)];
    let totalScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (data.players[event.target.name.slice(0, -2)][`h${i}`] != "") {
        totalScore += parseInt(data.players[event.target.name.slice(0, -2)][`h${i}`]);
      }
    }
    data.players[event.target.name.slice(0, -2)].total = totalScore;
    console.log(data);
    setPlayerList(data);
  };
  React.useEffect(() => {
    let newInfo = { ...newGameInfo };
    newInfo.ourTotal = 0;
    //loop through all players and add their totals to the newGameInfo.total
    newInfo.players = playerList.players;
    newInfo.opponentTotal = 0;
    for (let player in playerList.players) {
      // newInfo.ourTotal +=
      //   parseInt(newInfo.players[player].h1) +
      //   parseInt(newInfo.players[player].h2) +
      //   parseInt(newInfo.players[player].h3) +
      //   parseInt(newInfo.players[player].h4) +
      //   parseInt(newInfo.players[player].h5) +
      //   parseInt(newInfo.players[player].h6);
      newInfo.players[player].total +=
        parseInt(newInfo.players[player].scores[0]) +
        parseInt(newInfo.players[player].scores[1]) +
        parseInt(newInfo.players[player].scores[2]) +
        parseInt(newInfo.players[player].scores[3]) +
        parseInt(newInfo.players[player].scores[3]) +
        parseInt(newInfo.players[player].scores[4]) +
        parseInt(newInfo.players[player].scores[5]);
      newInfo.ourTotal +=
        parseInt(newInfo.players[player].scores[0]) +
        parseInt(newInfo.players[player].scores[1]) +
        parseInt(newInfo.players[player].scores[2]) +
        parseInt(newInfo.players[player].scores[3]) +
        parseInt(newInfo.players[player].scores[3]) +
        parseInt(newInfo.players[player].scores[4]) +
        parseInt(newInfo.players[player].scores[5]);
      newInfo.players[player].total =
        parseInt(newInfo.players[player].scores[0]) +
        parseInt(newInfo.players[player].scores[1]) +
        parseInt(newInfo.players[player].scores[2]) +
        parseInt(newInfo.players[player].scores[3]) +
        parseInt(newInfo.players[player].scores[3]) +
        parseInt(newInfo.players[player].scores[4]) +
        parseInt(newInfo.players[player].scores[5]);
      newInfo.opponentTotal += parseInt(newInfo.players[player].opponent);
    }
    setNewGameInfo(newInfo);
  }, [playerList]);
  const updateScore = (event) => {
    event.preventDefault();
    if (isNumeric(event.target.name.slice(-1))) {
      let scores = playerList.players[event.target.name.slice(0, -2)].scores;
      scores[event.target.name.slice(-2) - 1] = event.target.value;

      setPlayerList(
        {
          players: {
            ...playerList.players,
            [event.target.name.slice(0, -2)]: {
              ...playerList.players[event.target.name.slice(0, -2)],
              ["Scores"]: scores,
            },
          },
        },
        checkforTotal(event)
      );
    } else if (event.target.name.slice(-5) === "TOTAL") {
      setPlayerList({
        players: {
          ...playerList.players,
          [event.target.name.slice(0, -5)]: {
            ...playerList.players[event.target.name.slice(0, -5)],
            [event.target.name.slice(-5).toLowerCase()]: event.target.value,
          },
        },
      });
    } else if (event.target.name.slice(-8) === "OPPONENT") {
      setPlayerList({
        players: {
          ...playerList.players,
          [event.target.name.slice(0, -8)]: {
            ...playerList.players[event.target.name.slice(0, -8)],
            ["opponentTotal"]: event.target.value,
          },
        },
      });
    }
  };
  const handleNewName = (event) => {
    event.preventDefault();
    if (playerInput !== "") {
      setPlayerList({
        ...playerList,
        players: {
          ...playerList.players,
          [playerInput]: {
            name: playerInput,
            scores: new Array(6),
            total: 0,
            opponentTotal: "",
            didPlay: true,
          },
        },
      });
      setPlayerInput("");
    }
  };
  const handleNameInput = (event) => {
    setPlayerInput(event.target.value);
  };
  const removePlayer = (event) => {
    let data = { ...playerList };
    delete data.players[event.target.name];
    setPlayerList(data);
  };
  return (
    <Card>
      <CardHeader subheader="Enter Player names in order" title="Player List" />
      <Divider />
      <CardContent>
        <Grid marginBottom="5%" container spacing={3} alignItems="center">
          <Grid item>
            <form onSubmit={handleNewName}>
              <TextField
                label="Name"
                value={playerInput}
                onChange={handleNameInput}
                onSubmit={handleNewName}
              ></TextField>
            </form>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleNewName}>
              Add
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Player</TableCell>
                <TableCell align="right">1</TableCell>
                <TableCell align="right">2</TableCell>
                <TableCell align="right">3</TableCell>
                <TableCell align="right">4</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">6</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Opponent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(playerList.players).map((player) => (
                <TableRow
                  key={player.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {player.name}
                    {/*TODO: IMPORVE REMOVE BUTTON*/}
                    <Button name={player.name} onClick={removePlayer}>
                      Remove
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      id="standard-basic"
                      label=""
                      variant="standard"
                      name={player.name + "h1"}
                      value={player.h1}
                      onChange={updateScore}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      id="standard-basic"
                      label=""
                      variant="standard"
                      value={player.h2}
                      name={player.name + "h2"}
                      onChange={updateScore}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      id="standard-basic"
                      label=""
                      variant="standard"
                      value={player.h3}
                      name={player.name + "h3"}
                      onChange={updateScore}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      id="standard-basic"
                      label=""
                      variant="standard"
                      value={player.h4}
                      name={player.name + "h4"}
                      onChange={updateScore}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      id="standard-basic"
                      label=""
                      variant="standard"
                      value={player.h5}
                      name={player.name + "h5"}
                      onChange={updateScore}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      id="standard-basic"
                      label=""
                      variant="standard"
                      value={player.h6}
                      name={player.name + "h6"}
                      onChange={updateScore}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {parseInt(player.h1) +
                    parseInt(player.h2) +
                    parseInt(player.h3) +
                    parseInt(player.h4) +
                    parseInt(player.h5) +
                    parseInt(player.h6)
                      ? parseInt(player.h1) +
                        parseInt(player.h2) +
                        parseInt(player.h3) +
                        parseInt(player.h4) +
                        parseInt(player.h5) +
                        parseInt(player.h6)
                      : ""}
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      id="standard-basic"
                      label=""
                      variant="standard"
                      value={player.opponent}
                      name={player.name + "OPPONENT"}
                      onChange={updateScore}
                    ></TextField>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <ListMenu
        setNewGameInfo={setNewGameInfo}
        newGameInfo={newGameInfo}
        submitGame={submitGame}
        game={game}
        setGame={setGame}
        season={season}
        setSeason={setSeason}
      />
    </Card>
  );
}

export default PlayerList;
