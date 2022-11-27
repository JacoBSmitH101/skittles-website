import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import { useState, useEffect } from "react";
import Paper from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
const PlayerList = ({ gameData }) => {
  console.log("gameData", gameData);
  let opponentTotalKey = "opponent";
  Object.keys(gameData.players).forEach((player) => {
    if (gameData.players[player].opponentTotal) {
      opponentTotalKey = "opponentTotal";
    } 
  });
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
      sx={{paddingTop: "4.5%", paddingBottom: "4.5%"}}
      avatar={<Avatar
        sx={{
          backgroundColor: "primary.main",
          height: 56,
          width: 56,
        }}
      >
        <AssignmentIcon />
      </Avatar>}
        title="Scoreboard"
      ></CardHeader>

      <Divider />
      <Grid item>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <Tooltip title="Player Name">
                  <TableCell>Player</TableCell>
                </Tooltip>
                <Tooltip title="Total score">
                  <TableCell align="right">Score</TableCell>
                </Tooltip>
                <Tooltip title="+/- to Opponent">
                  <TableCell align="right">+/-</TableCell>
                </Tooltip>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(gameData.players).map((player) => (
                <TableRow key={player} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {player}
                  </TableCell>
                  <TableCell align="right">{gameData.players[player].total}</TableCell>
                  <TableCell align="right">
                    {gameData.players[player].total - gameData.players[player][opponentTotalKey] > 0
                      ? "+"
                      : ""}
                    {gameData.players[player].total - gameData.players[player][opponentTotalKey]}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell component="th" scope="row">
                  <Divider />
                </TableCell>
                <TableCell align="right">
                  <Divider />
                </TableCell>
                <TableCell align="right">
                  <Divider />
                </TableCell>
              </TableRow>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  Totals
                </TableCell>
                <TableCell align="right">{gameData.ourScore}</TableCell>
                <TableCell align="right">
                  {gameData.ourScore - gameData.opponentScore > 0 ? "+" : "-"}
                  {gameData.ourScore - gameData.opponentScore}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Card>
  );
};
export default PlayerList;
