import MuiAlert from '@mui/material/Alert';
import React, { forwardRef } from 'react';

export const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });