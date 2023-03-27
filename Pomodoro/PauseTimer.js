/**
 * The component renders a Text component that displays the timeString state variable
 * is uses 'useCountUpTimer ' component
 */


import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useCountUpTimer } from './useCountUpTimer';

export default function PauseTimer(props) {
  const [run, setRun] = useState(false);

  const { startUpTimer, resetUpTimer, incSeconds} = useCountUpTimer();
  const [timeString, SetTimeString] = useState('');

  useEffect(() => {
     if (props.startUp === 'paused') {
      // console.log('PauseTimer(): paused Timer Start...');
      startUpTimer();
    }
    if (props.startUp === 'Resume') {
      // console.log('PauseTimer(): onBreak...');
      resetUpTimer();
    }
    if (props.startUp === 'finished') {
      // console.log('PauseTimer(): finished...');
      resetUpTimer();
    }
  }, [props.startUp]);

 useEffect(() => {
    let minutes = Math.floor(incSeconds / 60);
      let seconds = incSeconds - minutes * 60;
      let strings = minutes.toString() + ':' + seconds.toString();
      SetTimeString(strings);
  }, [incSeconds]);

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