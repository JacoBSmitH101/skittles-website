import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
function GameInfo({ newGameInfo, setNewGameInfo }) {
  const [gameInfo, setGameInfo] = React.useState({
    opponentTeamName: "",
    alley: "",
    where: "",
  });
  const updateGameInfo = () => {
    let game = { ...newGameInfo };
    game.opponent = gameInfo.opponentTeamName;
    game.alley = gameInfo.alley;
    game.isHome = gameInfo.where == "home" ? true : false;
    game.isAway = gameInfo.where == "away" ? true : false;
    setNewGameInfo(game);
  };
  const handleGameInfoInput = (event) => {
    if (event.target.name == "where") {
      gameInfo.where = event.target.value;
      if (event.target.value == "away") {
        setNewGameInfo({
          ...newGameInfo,
          isAway: true,
          isHome: false,
        });
      } else {
        setNewGameInfo({
          ...newGameInfo,
          isAway: false,
          isHome: true,
        });
      }
    } else {
      setNewGameInfo({
        ...newGameInfo,
        [event.target.name]: event.target.value,
      })
    }
  };
  return (
    <Card>
      <CardHeader subheader="Enter game information" title="Game Info" />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              label="Opponent team name"
              name="opponent"
              required
              value={newGameInfo.opponent}
              onChange={handleGameInfoInput}
              variant="outlined"
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              label="Alley"
              name="alley"
              required
              variant="outlined"
              value={newGameInfo.alley}
              onChange={handleGameInfoInput}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Where</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="where"
                required
                value={gameInfo.where}
                onChange={handleGameInfoInput}
              >
                <FormControlLabel value="home" control={<Radio />} label="Home" />
                <FormControlLabel value="away" control={<Radio />} label="Away" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default GameInfo;
