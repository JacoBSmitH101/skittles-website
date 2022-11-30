import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import { useEffect, useState } from "react";
const orders = [];

const BestPerformances = ({ playerData }) => {
  let top5Games = [];
  // get top 5 scoring games
  Object.keys(playerData).forEach((season) => {
    for (let i = 1; i < 50; i++) {
      if (playerData[season][`Game${i}`]) {
        if (playerData[season][`Game${i}`].didPlay) {
          top5Games.push(playerData[season][`Game${i}`]);
        }
      }
    }
  });
  top5Games.sort((a, b) => b.total - a.total);
  top5Games = top5Games.slice(0, 6);
  console.log(top5Games);

  return (
    <Card>
      <CardHeader title="Best Performances" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 250 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Score</TableCell>
                <TableCell>Alley</TableCell>
                <TableCell>Game</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {top5Games.map((game) => (
                <TableRow hover key={uuid()}>
                  <TableCell>{game.total}</TableCell>
                  <TableCell>{game.alley}</TableCell>
                  <TableCell>
                    <Link
                      underline="hover"
                      href={`/game?seasonNumber=${game.season}&gameNumber=${game.gameNumber}`}
                    >
                      {game.season} Game {game.gameNumber}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};
export default BestPerformances;
