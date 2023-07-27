import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Checkbox, FormControlLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'

// This component displays a dialog box to notify the user that the page is currently in development.
function LoadingDialog({ page }) {

    return (
        <Dialog open={true}>
            <DialogTitle>{"Loading..."}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    The page is currently loading. Please wait.
                </DialogContentText>
                
            </DialogContent>
        </Dialog>
    )
}

export default LoadingDialog;