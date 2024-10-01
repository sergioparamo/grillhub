// components/MessageSnackbar.js
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// Define the interface for props

export type SnackbarSeverity = "success" | "error" | "info" | "warning";

interface MessageSnackbarProps {
  open: boolean; // `open` should be a boolean
  handleClose: () => void; // `handleClose` should be a function
  message: React.ReactNode; // `message` can be any React node (string, element, etc.)
  severity: SnackbarSeverity; // Specify allowed string literals for severity
}

const MessageSnackbar = ({ open, handleClose, message, severity }: MessageSnackbarProps) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default MessageSnackbar; 