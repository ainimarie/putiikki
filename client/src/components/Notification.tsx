import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface NotificationProps {
  open?: boolean;
  message: string;
  severity: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open || false}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} >
        {message}
      </Alert>
    </Snackbar >
  );
};

export default Notification;
