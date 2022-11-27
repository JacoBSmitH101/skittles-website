import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function NotImplementedPopover({ anchorEl, onClose, open }) {

  return (
    <div>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        onClose={onClose}
        open={open}
        PaperProps={{
          sx: { width: "300px" },
        }} 
      >
        <Typography sx={{ p: 2 }}>Not Implemented, yet...</Typography>
      </Popover>
    </div>
  );
}
