import React from 'react';
import { Alert, Snackbar } from '@mui/material';

interface IPropsAlert {
  error: { message: string };
  setError: (value: { message: string } | null) => void;
}

export const AlertMUI = ({ error, setError }: IPropsAlert) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
      }}
    >
      <Snackbar
        style={{
          position: 'absolute',
          top: 50,
        }}
        open={!!error.message}
        autoHideDuration={4000}
        onClose={() => setError(null)}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{
            width: '100%',
            backgroundColor: '#D32F2F',
          }}
        >
          {error.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
