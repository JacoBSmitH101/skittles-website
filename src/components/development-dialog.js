import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react'

function DevelopmentDialog({ page }) {
    const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Development Notice"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The {page} page is currently in development. Some features may not work as expected.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DevelopmentDialog