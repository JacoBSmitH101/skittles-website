import PropTypes from "prop-types";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Clock as ClockIcon } from "../../icons/clock";
import { Download as DownloadIcon } from "../../icons/download";
import { SeverityPill } from "../severity-pill";

export const ProductCard = ({ game, ...rest }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 3,
        }}
      >
        <SeverityPill color={game.ourScore > game.opponentScore ? "success" : "error"}>
          {game.ourScore > game.opponentScore ? "Won" : "Lost"}
        </SeverityPill>
      </Box>
      <Typography align="center" color="textPrimary" gutterBottom variant="h5">
        {game.name}
      </Typography>
      <Typography align="center" color="textPrimary" variant="body1">
        {"Jolly Crew vs " + game.opponent}
      </Typography>
      <Typography align="center" color="textSecondary" variant="subtitle2">
        {game.ourScore + "    -    " + game.opponentScore}
      </Typography>
    </CardContent>
    <Box noWrap sx={{ flexGrow: 1 }} />
    <Divider />
      <Button
        color="primary"
        variant="contained"
        href={`/game?seasonNumber=${game.season}&gameNumber=${game.gameNumber}`}
      >
        View Game
      </Button>
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
