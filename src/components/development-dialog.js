import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Checkbox, FormControlLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'

// This component displays a dialog box to notify the user that the page is currently in development.
function DevelopmentDialog({ page }) {
    const [open, setOpen] = useState(true);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    useEffect(() => {
        const dontShow = localStorage.getItem(`dontShow${page}`);
        if (dontShow === 'true') {
            setOpen(false);
        }
    }, [page]);

    const handleClose = () => {
        if (dontShowAgain) {
            localStorage.setItem(`dontShow${page}`, 'true');
        }
        setOpen(false);
    };

    const handleCheckboxChange = (event) => {
        setDontShowAgain(event.target.checked);
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
            <FormControlLabel
                    control={<Checkbox checked={dontShowAgain} onChange={handleCheckboxChange} />}
                    label="Don't show again"
                />
                <Button onClick={handleClose} color="primary" autoFocus>
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DevelopmentDialog;