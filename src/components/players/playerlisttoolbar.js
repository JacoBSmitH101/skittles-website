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
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { useRef, useState } from "react";
import NotImplementedPopover from "./notimplementedpopover";

export const PlayerListToolbar = ({searchTerm, textChangeHandler}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notImplementedPopover, setNotImplementedPopover] = useState(false);
  const popRef = useRef(null);
  return (
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
          Players
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={<UploadIcon fontSize="small" />}
            onClick={() => setNotImplementedPopover(true)}
            ref={popRef}
            sx={{ mr: 1 }}
          >
            Import
          </Button>
          <Button
            startIcon={<DownloadIcon fontSize="small" />}
            onClick={() => setNotImplementedPopover(true)}
            ref={popRef}
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          <Button
            ref={popRef}
            onClick={() => setNotImplementedPopover(true)}
            color="primary"
            variant="contained"
          >
            Add Players
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                value={searchTerm}
                onChange={textChangeHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search players"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <NotImplementedPopover
        anchorEl={popRef.current}
        open={notImplementedPopover}
        onClose={() => setNotImplementedPopover(false)}
      />
    </Box>
  );
};
