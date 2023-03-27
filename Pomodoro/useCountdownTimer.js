/**
 * useCountdownTimer creates a countdown timer. 
 * It takes an initial number of seconds and returns several functions: 
 *  start to start the countdown timer, pause to 
 *  pause the timer, 
 *  reset to reset the timer, 
 *  addAdditionalSeconds to add additional seconds to the countdown, 
 *  and stop to stop the countdown timer. It also returns the secondsLeft value, which is the number of seconds left until the countdown ends.

 
 It also uses a countdown function that is responsible for decrementing the secondsLeft value every second until it reaches zero. 
 The countdown function uses the setInterval and clearInterval functions to manage the countdown. 
 When the countdown ends, the Hook checks if there are additional seconds to add to the countdown and starts the countdown again with the additional seconds if there are any.
 *  
 * */


import { useState, useEffect, useRef, useCallback } from 'react';

export function useCountdownTimer(initialSeconds) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [countdownEnded, setCountdownEnded] = useState(false);
  const [additionalSeconds, setAdditionalSeconds] = useState(0);
  // const [intervalId, setIntervalId] = useState(undefined);
  const intervalId = useRef(undefined);

  const countdown = (secondsLeft, setSecondsLeft, intervalId) => {
    let countState = secondsLeft;

    if (intervalId.current == undefined) {
      //on first time
      if (secondsLeft < 0) {
        clearInterval(intervalId.current);
        intervalId.current = undefined;
      } else {
        intervalId.current = setInterval(() => {
          // console.log('useCountdown(): *********count state*************', countState, intervalId);
          countState = countState - 1;
          setSecondsLeft(countState);
          if (countState <= 0) {
            clearInterval(intervalId.current);
            intervalId.current = undefined;
            setCountdownEnded(true);
          }
        }, 1000);
      }
    }
  };

  const start = useCallback(() => {
    // console.log('useCountdown(): countdown started');
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    // console.log('useCountdown(): countdown Paused');
    clearInterval(intervalId.current);
    setIsRunning(false);
    intervalId.current = undefined;
  }, []);

  const reset = useCallback((newInitialSeconds) => {
    // console.log('useCountdown(): reset()', intervalId);
    clearInterval(intervalId.current);
    setSecondsLeft(newInitialSeconds);
    setIsRunning(false);
    intervalId.current = undefined;
    // start();
  }, []);

  const stop = useCallback(() => {
    clearInterval(intervalId.current);
    intervalId.current = undefined;
    setIsRunning(false);
}, []);

  const addAdditionalSeconds = useCallback((newDuration) => {
    // console.log(newDuration);
    setAdditionalSeconds(newDuration);
  }, []);

  useEffect(() => {
    if (countdownEnded) {
      const newSeconds = additionalSeconds;
      setSecondsLeft(newSeconds);
      setAdditionalSeconds(0);
      setCountdownEnded(false);
      setIsRunning(true);
    }
  }, [countdownEnded, additionalSeconds]);

  useEffect(() => {
    if (isRunning) {
      // console.log('useCountdown(): useffedct: is runningingsgs ');
      countdown(secondsLeft, setSecondsLeft, intervalId);
    } else {
      // console.log('useCountdown(): useffedct: not isRunning ');
      clearInterval(intervalId.current);
      intervalId.current = undefined;
    }
    return () => clearInterval(intervalId);
  }, [isRunning, secondsLeft, intervalId]);

  return { secondsLeft, start, pause, reset, addAdditionalSeconds, stop };
}
