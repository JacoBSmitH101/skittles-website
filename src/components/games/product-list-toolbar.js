import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Upload as UploadIcon } from "../../icons/upload";

export const GamesListToolbar = ({ filter, filterHandler }) => (
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
        <Button startIcon={<FileUploadIcon />} sx={{ mr: 1 }}>
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
              value={filter}
              onChange={filterHandler}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
