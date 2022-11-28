import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NotImplementedPopover({anchorEl, open, onClose}) {
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
        <Typography sx={{ p: 2 }}>Not Implemented, yet... {"    "}<Button onClick={onClose}>Close</Button></Typography>
        
      </Popover>
    </div>
  );
}
