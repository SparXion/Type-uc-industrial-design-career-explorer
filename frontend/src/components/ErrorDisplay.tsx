import React from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

interface ErrorDisplayProps {
  error: string | null;
  onRetry?: () => void;
  onDismiss?: () => void;
  severity?: 'error' | 'warning' | 'info';
  title?: string;
  showRetry?: boolean;
  showDismiss?: boolean;
}

export default function ErrorDisplay({
  error,
  onRetry,
  onDismiss,
  severity = 'error',
  title = 'Error',
  showRetry = true,
  showDismiss = true
}: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <Alert
      severity={severity}
      icon={<ErrorIcon />}
      action={
        <Box display="flex" gap={1}>
          {showRetry && onRetry && (
            <Button
              color="inherit"
              size="small"
              onClick={onRetry}
              variant="outlined"
            >
              Retry
            </Button>
          )}
          {showDismiss && onDismiss && (
            <Button
              color="inherit"
              size="small"
              onClick={onDismiss}
              variant="text"
            >
              Dismiss
            </Button>
          )}
        </Box>
      }
      sx={{ mb: 2 }}
    >
      <AlertTitle>{title}</AlertTitle>
      {error}
    </Alert>
  );
}
