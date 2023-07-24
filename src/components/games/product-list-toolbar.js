import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Upload as UploadIcon } from "../../icons/upload";

export const GamesListToolbar = ({ search, setSearch, sort, setSort, teams, setTeams, alleys, setAlleys, teamOptions, setTeamOptions }) => (
  <Box>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        All Games
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button startIcon={<FileUploadIcon />} sx={{ mr: 1 }} disabled>
          Export
        </Button>
        {/*add a form that redirects to /newgame */}

        <Button color="primary" variant="contained" href="/newgame">
          Add Game
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: 1000 }}>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search Game"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            <Box sx={{ maxWidth: 500 }}>
              <FormControl fullWidth>
                <Select
                  labelId="sort-label"
                  id="sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <MenuItem value="recent">Recent</MenuItem>
                  <MenuItem value="score">Score</MenuItem>
                  <MenuItem value="opponentScore">Opponent Score</MenuItem>
                  <MenuItem value="alley">Alley</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ maxWidth: 500 }}>
              <FormControl fullWidth>
                <InputLabel id="teams-label">Filter Teams</InputLabel>
                <Select
                  labelId="teams-label"
                  id="teams"
                  multiple
                  value={teamOptions}
                  onChange={(event) => setTeamOptions(event.target.value)}
                  // renderValue={(selected) => selected.join(', ')}
                  renderValue={(selected) => 
                    selected.length > 1 
                      ? `${selected.length} teams selected`
                      : selected[0]
                  }
                >
                  {teams.map((team) => (
                    <MenuItem key={team} value={team}>
                      <Checkbox checked={teamOptions.indexOf(team) > -1} />
                      <ListItemText primary={team} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {/* <Box sx={{ maxWidth: 500 }}>
              <FormControl fullWidth>
                <InputLabel id="alleys-label">Filter Alleys</InputLabel>
                <Select
                  labelId="alleys-label"
                  id="alleys"
                  multiple
                  value={alleys}
                  onChange={(event) => setAlleys(event.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {alleyOptions.map((alley) => (
                    <MenuItem key={alley} value={alley}>
                      <Checkbox checked={alleys.indexOf(alley) > -1} />
                      <ListItemText primary={alley} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box> */}
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
