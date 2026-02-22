/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { formatTimeRemaining } from '../utils';

export function useCountdown(expiryTime: string) {
  const [timeLeft, setTimeLeft] = useState(formatTimeRemaining(expiryTime));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = formatTimeRemaining(expiryTime);
      setTimeLeft(remaining);
      if (remaining === 'Expired') {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTime]);

  return timeLeft;
}
