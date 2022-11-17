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
function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}
function PlayerList() {
  const [playerList, setPlayerList] = React.useState({ players: {} });
  const [playerInput, setPlayerInput] = React.useState("");
  const checkforTotal = (name) => { //FIXME: doesnt work as expected
    let isAllFilled = true;
    for (let i = 1; i <= 6; i++) {
      if (
        playerList.players[event.target.name.slice(0, -2)][`h${i}`] === "" ||
        playerList.players[event.target.name.slice(0, -2)][`h${i}`] === null
      ) {
        isAllFilled = false;
        break;
      }
    }
    if (isAllFilled) {
      let total = 0;
      for (let i = 1; i <= 6; i++) {
        total += parseInt(playerList.players[event.target.name.slice(0, -2)][`h${i}`]);
      }
      setPlayerList({
        players: {
          ...playerList.players,
          [event.target.name.slice(0, -2)]: {
            ...playerList.players[event.target.name.slice(0, -2)],
            total: total,
          },
        },
      });
    }
  };
  const updateScore = (event) => {
    if (isNumeric(event.target.name.slice(-1))) {
      setPlayerList({
        players: {
          ...playerList.players,
          [event.target.name.slice(0, -2)]: {
            ...playerList.players[event.target.name.slice(0, -2)],
            [event.target.name.slice(-2)]: event.target.value,
          },
        },
      });
      //check if h1 - h6 are filled
      //if yes, set total to addition

      checkforTotal(event);
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
            [event.target.name.slice(-8).toLowerCase()]: event.target.value,
          },
        },
      });
    }
  };
  const handleNewName = (event) => {
    if (playerInput !== "") {
      setPlayerList({
        ...playerList,
        players: {
          ...playerList.players,
          [playerInput]: {
            name: playerInput,
            h1: null,
            h2: null,
            h3: null,
            h4: null,
            h5: null,
            h6: null,
            total: null,
            opponent: null,
          },
        },
      });
      setPlayerInput("");
    }
  };
  const handleNameInput = (event) => {
    setPlayerInput(event.target.value);
  };
  return (
    <Card>
      <CardHeader subheader="Enter Player names in order" title="Player List" />
      <Divider />
      <CardContent>
        <Grid marginBottom="5%" container spacing={3} alignItems="center">
          <Grid item>
            <TextField
              label="Name"
              value={playerInput}
              onChange={handleNameInput}
              onSubmit={handleNewName}
            ></TextField>
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
                <TableRow key={player} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {player.name}
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
                    <TextField
                      id="standard-basic"
                      label=""
                      variant="standard"
                      value={player.total}
                      name={player.name + "TOTAL"}
                      onChange={updateScore}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      id="standard-basic"
                      label=""
                      variant="standard"
                      value={player.opponent}
                      name={player.name + "OPPONENT"}
                      onChange={updateScore}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default PlayerList;
