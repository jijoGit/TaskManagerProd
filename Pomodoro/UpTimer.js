/**
 * "UpTimer" uses the "useCountdownTimer" custom hook to display a countdown timer. 
 * It accepts a "defaultTime" prop which is used to set the initial timer value. 
 * It also listens for changes to a "start" prop and updates the timer accordingly. 
 * When the timer reaches 0, it calls a function passed in via the "timerDoneFn" prop. 
 * The current time left is displayed in the component using the "timeString" state variable. 
 */

import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useCountdownTimer } from './useCountdownTimer';

export default function UpTimer(props) {

  const [defaultTime, setDefaultTime] = useState(props.defaultTime);

  const { secondsLeft, start, pause, reset, stop } = useCountdownTimer(defaultTime);
  const [timeString, SetTimeString] = useState(0);

  useEffect(() => {
    if (props.start === 'running') {
      start();
    }

    if (props.start === 'paused') {
      pause();
    }

    if (props.start === 'finished') {
      reset(20*60);
      stop();
    }
  }, [props.start]);

  useEffect(() => {
    if (secondsLeft < 0) {
      props.timerDoneFn();
      SetTimeString(' Break ');
      stop();
    } else if (secondsLeft > 0) {
      let minutes = Math.floor(secondsLeft / 60);
      let seconds = secondsLeft - minutes * 60;
      let strings = minutes.toString() + ':' + seconds.toString();
      // console.log(secondsLeft, minutes, seconds);
      SetTimeString(strings);
    }
  }, [secondsLeft]);

  return (
    <View style={styles.minutesSeconds}>
      <Text style={styles.text}>{timeString}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  minutesSeconds: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,

  },
  text: {
    fontWeight: 'bold',
    fontSize: 42,
    letterSpacing: 3,
  },
});
