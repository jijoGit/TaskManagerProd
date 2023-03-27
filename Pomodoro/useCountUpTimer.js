
/**useCountUpTimer that creates a timer that increments a counter every second. 
 * It returns three values: startUpTimer to start the timer, resetUpTimer to reset the timer, and incSeconds to access the current count value. 
 * If a maximum time value is provided, the timer stops counting when the count value reaches that maximum. The Hook uses useState, useCallback, and useEffect Hooks to manage the state and timer logic.
**/


import { useCallback, useState, useEffect } from 'react';

export function useCountUpTimer(ceilingSecond) {
  const [incSeconds, setIncSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startUpTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  const resetUpTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setIncSeconds(incSeconds => incSeconds + 1);

        if (ceilingSecond && incSeconds >= ceilingSecond) {
          clearInterval(intervalId);
          setIsRunning(false);
        }

      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
      setIncSeconds(0);
    }
  }, [isRunning, ceilingSecond]);


  return { startUpTimer, resetUpTimer, incSeconds };
}
