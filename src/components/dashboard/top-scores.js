import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Grid, Avatar, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { getTopPinCounts, getTopScoresThisSeason } from "../../utils/skittlesData";

function TopScores({ matchesPlayers, players, matches }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const topPinCounts = getTopScoresThisSeason(matches, matchesPlayers, players, 5)
    setData(topPinCounts);
  }, [matchesPlayers, players]);

  if (!data) return <p>Loading...</p>;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Table>
            <TableHead sx={{backgroundColor: "neutral.200"}}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Game Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((player) => (
                <TableRow key={player.playerName} hover>
                  <TableCell sx={{borderBottomColor: "table.borderBottom"}}>{player.playerName }</TableCell>
                  <TableCell sx={{borderBottomColor: "table.borderBottom"}}>{player.score}</TableCell>
                  <TableCell sx={{borderBottomColor: "table.borderBottom"}}>{player.gameNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography color="textSecondary" variant="caption">
            This Season
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TopScores;