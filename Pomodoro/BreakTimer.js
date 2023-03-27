/**
 * The BreakTimer component receives props as a parameter. It uses props.start to determine whether the timer should start or stop. 
 * If props.start is 'onBreak', the start function of the useCountdownTimer hook is called with the breakTime value multiplied by 60. 
 * If props.start is 'finished', the stop function of the useCountdownTimer hook is called.
 */

import { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useCountdownTimer } from './useCountdownTimer';
import {SettingContext} from '../store/settings-context'

export default function BreakTimer(props) {
  const {breakTime } = useContext(SettingContext);
  const { secondsLeft, start, pause, reset, stop } = useCountdownTimer(breakTime * 60);
  const [timeString, SetTimeString] = useState('');

  useEffect(() => {
    // console.log('break timere');
    if (props.start === 'onBreak') {
      start(25*60);
    }

     if (props.start === 'finished') {
      stop();
    }
  }, [props.start, stop]);

  useEffect(() => {
    if (secondsLeft < 1) {
      props.breakDoneFn();
      stop();
    } else {
      let minutes = Math.floor(secondsLeft / 60);
      let seconds = secondsLeft - minutes * 60;
      let strings = minutes.toString() + ':' + seconds.toString();
      SetTimeString(strings);
    }
  }, [secondsLeft]);

  return (
    <View style={styles.minutesSeconds}>
      <Text style={styles.text} >{timeString}</Text>
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

  }
});