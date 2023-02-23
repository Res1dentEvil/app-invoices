import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import React from 'react';

import { PaymentStatus } from './types';

export function getPaymentStatus(status: string) {
  switch (status) {
    case PaymentStatus.WAITING:
      return PaymentStatus.WAITING;
    case PaymentStatus.PAID:
      return <CheckCircleOutlinedIcon style={{ fill: 'green' }} />;
    case PaymentStatus.CANCELED:
      return <CancelOutlinedIcon style={{ fill: 'red' }} />;
    default:
      console.log('getPaymentStatus default');
  }
}
