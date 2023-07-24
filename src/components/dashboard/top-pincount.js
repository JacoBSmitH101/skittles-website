import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Grid, Avatar, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { getTopPinCounts } from "../../utils/skittlesData";

function TopPinCounts({ matchesPlayers, players }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const topPinCounts = getTopPinCounts(matchesPlayers, players, 5);
    setData(topPinCounts);
  }, [matchesPlayers, players]);

  if (!data) return <p>Loading...</p>;

  return (
    <Card >
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Table>
            <TableHead sx={{backgroundColor: "neutral.200"}}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Pins</TableCell>
                <TableCell>Games</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((player) => (
                <TableRow key={player.playerName} onClick={() => gameSelectedHandler(game)} hover>
                  <TableCell sx={{borderBottomColor: "table.borderBottom"}}>{player.playerName }</TableCell>
                  <TableCell sx={{borderBottomColor: "table.borderBottom"}}>{player.pinCount}</TableCell>
                  <TableCell sx={{borderBottomColor: "table.borderBottom"}}>{player.numberOfGames}</TableCell>
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
            All time
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TopPinCounts;