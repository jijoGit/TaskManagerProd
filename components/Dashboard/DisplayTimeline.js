import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import Constants from 'expo-constants';
import ColorBar from '../../Pomodoro/ColorBar';

function DisplayTimeline(props) {

  const sortedStamps = props.sortedTimestamps;
  const viewName = props.viewName;
  const [colArr, setColArr] = useState([]);


  function generateTimeline(sortedStamps) {
    console.log('sortedStamps from ', sortedStamps);
    
    if (sortedStamps.length <= 1) return;

    let colorWidthArr = [];

    // console.log('generatetimeline2', );
    for (let i = 0; i < sortedStamps.length - 1; i++) {
      let currentTimestamp = sortedStamps[i];
      let nextTimestamp = sortedStamps[i + 1];

      let secondsElapsed;
      let color;

      // console.log('generatetimeline2', currentTimestamp, nextTimestamp);

      if (currentTimestamp.key === 'startTimeStamp') {
        let timeDiff = nextTimestamp.timestamp - currentTimestamp.timestamp;
        secondsElapsed = timeDiff / 1000;
        color = 'blue';
      } else if (currentTimestamp.key === 'pauseTimeStamp') {
        let timeDiff = nextTimestamp.timestamp - currentTimestamp.timestamp;
        secondsElapsed = timeDiff / 1000;
        color = 'gray';
      } else if (currentTimestamp.key === 'breakStartTimeStamp') {
        let timeDiff = nextTimestamp.timestamp - currentTimestamp.timestamp;
        secondsElapsed = timeDiff / 1000;
        color = 'yellow';
      } else if (currentTimestamp.key === 'doneTimeStamp') {
        let timeDiff = nextTimestamp.timestamp - currentTimestamp.timestamp;
        secondsElapsed = timeDiff / 1000;
        color = 'green';
      } else if (currentTimestamp.key === 'exitedTimeStamp') {
        let timeDiff = nextTimestamp.timestamp - currentTimestamp.timestamp;
        secondsElapsed = timeDiff / 1000;
        color = 'red';
      }

      colorWidthArr.push({ color, secondsElapsed });
      
      // prevTimestamp = currentTimestamp.timestamp;
    }
    this.elapsedTimeSoFar = colorWidthArr;
    setColArr(colorWidthArr);
    console.log(colorWidthArr);
    return colorWidthArr;
  }

  useEffect(() => {
    generateTimeline(sortedStamps);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{viewName}</Text>
      {colArr.length > 1 ? (
        <ColorBar colorWidthArray={colArr} />
      ) : (
        <Text style={styles.message}>
          No tasks were executed using Pomodoro yet
        </Text>
      )}
    </View>
  );
}

export default DisplayTimeline;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: Constants.statusBarHeight + 22,
  },
  title: {
    backgroundColor: '#eeeeee',
    padding: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    backgroundColor: '#eeeeee',
    padding: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
