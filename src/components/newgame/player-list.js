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
function PlayerList() {
  const [playerList, setPlayerList] = React.useState({ players: {} });
  const [playerInput, setPlayerInput] = React.useState("");
  let fileInput = React.createRef();
  const checkforTotal = (event) => {
    //FIXME: doesnt work as expected
    let data = playerList
    let player = playerList.players[event.target.name.slice(0, -2)];
    let totalScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (data.players[event.target.name.slice(0, -2)][`h${i}`] != "") {
        totalScore += parseInt(data.players[event.target.name.slice(0, -2)][`h${i}`]);
      }
    }
    data.players[event.target.name.slice(0, -2)].total = totalScore;
    console.log(playerList)

      let totalName = "total"
    setPlayerList(
      data
    );
  };
  const updateScore = (event) => {
    if (isNumeric(event.target.name.slice(-1))) {
      setPlayerList(
        {
          players: {
            ...playerList.players,
            [event.target.name.slice(0, -2)]: {
              ...playerList.players[event.target.name.slice(0, -2)],
              [event.target.name.slice(-2)]: event.target.value,
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
            [event.target.name.slice(-8).toLowerCase()]: event.target.value,
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
            h1: "",
            h2: "",
            h3: "",
            h4: "",
            h5: "",
            h6: "",
            total: 0,
            opponent: "",
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
                    {parseInt(player.h1) + parseInt(player.h2) + parseInt(player.h3) + parseInt(player.h4) + parseInt(player.h5) + parseInt(player.h6)}
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
      <ListMenu />
    </Card>
  );
}

export default PlayerList;
