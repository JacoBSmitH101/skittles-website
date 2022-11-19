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
function GameInfo({newGameInfo, setNewGameInfo}) {
  const [gameInfo, setGameInfo] = React.useState({
    opponentTeamName: "",
    alley: "",
    where: "",
  });
  const updateGameInfo = () => {
    let game = {...newGameInfo};
    game.opponent = gameInfo.opponentTeamName;
    game.alley = gameInfo.alley;
    game.isHome = gameInfo.where == "home" ? true : false;
    game.isAway = gameInfo.where == "away" ? true : false;
    setNewGameInfo(game);
  };
  const handleGameInfoInput = (event) => {
    setGameInfo({
      ...gameInfo,
      [event.target.name]: event.target.value,
    }),
      updateGameInfo();
  };
  return (
    <Card>
      <CardHeader subheader="The information can be edited" title="Game Info" />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              label="Opponent team name"
              name="opponentTeamName"
              required
              value={gameInfo.opponentTeamName}
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
              value={gameInfo.alley}
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
