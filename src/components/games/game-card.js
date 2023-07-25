import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Clock as ClockIcon } from "../../icons/clock";
import { Download as DownloadIcon } from "../../icons/download";
import { SeverityPill } from "../severity-pill";

export const GameCard = ({ game, ...rest }) => (
  <CardActionArea>
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
            pb: 1,
          }}
        >
          <SeverityPill color={game.score > game.opponentScore ? "success" : "error"}>
            {game.score > game.opponentScore ? "Won" : "Lost"}
          </SeverityPill>
        </Box>

        <Typography align="center" color="textPrimary" gutterBottom variant="h5">
          {game.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {"Jolly Crew vs " + game.opponentName}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body2">
          {game.alley}
        </Typography>
        <Typography sx={{ pb: 1 }} align="center" color="textSecondary" variant="subtitle2">
          {game.score + "    -    " + game.opponentScore}
        </Typography>
        <Typography
          align="center"
          sx={{ fontSize: 12 }}
          color="textSecondary"
          gutterBottom
          variant="subtitle2"
        >
          {game.matchID}
        </Typography>
      </CardContent>
      <Box noWrap sx={{ flexGrow: 1 }} />
    </Card>
  </CardActionArea>
);

GameCard.propTypes = {
  product: PropTypes.object.isRequired,
};
