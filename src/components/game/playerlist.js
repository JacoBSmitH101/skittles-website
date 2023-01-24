/* eslint-disable react/jsx-max-props-per-line */
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
  let opponentTotalKey = "opponent";
  Object.keys(gameData.players).forEach((player) => {
    if (gameData.players[player].opponentTotal) {
      opponentTotalKey = "opponentTotal";
    }
  });
  let order = Object.entries(gameData.players)
    .sort((a, b) => b[1].total - a[1].total)
  let obj = Object.fromEntries(order)
  console.log(obj)
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        sx={{ paddingTop: "4.5%", paddingBottom: "4.5%" }}
        avatar={
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <AssignmentIcon />
          </Avatar>
        }
        title="Scoreboard"
      ></CardHeader>

      <Divider />
      <Grid item>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }} size="small" aria-label="Scoreboard">
            <TableHead sx={{backgroundColor: "#1f2a40"}}>
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
              {Object.keys(obj).map((player) => (
                <TableRow key={player} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell sx={{borderBottomColor: "table.borderBottom"}} component="th" scope="row">
                    {player}
                  </TableCell>
                  <TableCell sx={{borderBottomColor: "table.borderBottom"}} align="right">{gameData.players[player].total}</TableCell>
                  <TableCell sx={{borderBottomColor: "table.borderBottom"}} align="right">
                    {gameData.players[player].total - gameData.players[player].opponent > 0
                      ? "+"
                      : ""}
                    {gameData.players[player].total -
                      (gameData.players[player].opponent
                        ? gameData.players[player].opponent
                        : gameData.players[player].opponentTotal)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell sx={{borderBottomColor: "table.borderBottom"}} component="th" scope="row" >
                  <Divider />
                </TableCell>
                <TableCell sx={{borderBottomColor: "table.borderBottom"}} align="right">
                  <Divider />
                </TableCell>
                <TableCell sx={{borderBottomColor: "table.borderBottom"}} align="right">
                  <Divider />
                </TableCell>
              </TableRow>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell sx={{borderBottomColor: "table.borderBottom"}} component="th" scope="row">
                  Total
                </TableCell>
                <TableCell sx={{borderBottomColor: "table.borderBottom"}} align="right">{gameData.ourScore}</TableCell>
                <TableCell sx={{borderBottomColor: "table.borderBottom"}} align="right">
                  {gameData.ourScore - gameData.opponentScore > 0 ? "+" : ""}
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
