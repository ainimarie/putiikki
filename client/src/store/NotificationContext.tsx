import React, { createContext, useState, useContext, ReactNode } from 'react';
import Notification from '../components/Notification';

export enum Severity {
  Success = 'success',
  Error = 'error'
}

type Notification = {
  message: string;
  severity: Severity;
  isOpen?: boolean;
}

interface NotificationContextProps {
  openNotification: (notification: Notification) => void;
}

interface NotificationProviderProps {
  children: ReactNode;
}


const snackbarInitialState: Notification = {
  message: '',
  severity: Severity.Success,
  isOpen: false
};

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {

  const [notification, setNotification] = useState<Notification>(snackbarInitialState);

  const openNotification = (notification: Notification) => {
    setNotification({ ...notification, isOpen: true });
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, isOpen: false });
  };

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {children}
      <Notification
        open={notification.isOpen}
        message={notification.message}
        severity={notification.severity}
        onClose={handleNotificationClose}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
