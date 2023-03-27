import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import Constants from 'expo-constants';
import ColorBar from '../Pomodoro/ColorBar';
import DisplayTimeline from '../components/Dashboard/DisplayTimeline';

function DashboardScreen() {
  // const [colArr, setColArr] = useState([]);
  const [sortedTimestampsArr, setSortedTimestampsArr] = useState([]);
  const [sortedLastDayArr, setSortedLastDayArr] = useState([]);

  async function getTaskLogObjectFromStorage() {
    try {
      const taskActivityLogs = await AsyncStorage.getItem('taskActivityLogs');
  
      if (taskActivityLogs) {
        let logs = JSON.parse(taskActivityLogs);
        // console.log(logs);
        return logs;
      }

      console.log('No existing task logs ');
      return null;
    } catch (error) {
      console.log('Error getting taskActivityLogs from disk:', error);
      return null;
    }
  }

  function getFallingTimeStamp(task, fromDate) {
    // console.log('getFallingTimeStamp');

    const {
      startTimeStamp,
      pauseTimeStamp,
      breakStartTimeStamp,
      finishTimeStamp,
      doneTimeStamp,
      exitedTimeStamp,
    } = task;

    const allTimeStamps = [
      ...startTimeStamp,
      ...pauseTimeStamp,
      ...breakStartTimeStamp,
      ...finishTimeStamp,
      ...doneTimeStamp,
      ...exitedTimeStamp,
    ];

    const olderThanFromDate = allTimeStamps.every(
      (timestamp) => timestamp < fromDate.getTime()
    );

    console.log(olderThanFromDate);

    return olderThanFromDate;
  }

  async function sortLastDayTimeStamps() {

    console.log('sortLastDayTimeStamps');
    let logs = await getTaskLogObjectFromStorage();
    console.log('logs', logs.length, logs);
    let allTimeStamps = [];

    let fromDate = null;

    const now = Date.now();
    const msInHour = 1000 * 60 * 60;
    const msAgo = 24 * msInHour;
    const fromTimestamp = now - msAgo;
    fromDate = new Date(fromTimestamp);

    // console.log('sortLastDayTimeStamps', fromDate, logs);
    // Collect all timestamps from all tasks
    logs.forEach((task) => {
      const {
        startTimeStamp,
        pauseTimeStamp,
        breakStartTimeStamp,
        finishTimeStamp,
        doneTimeStamp,
        exitedTimeStamp,
      } = task;

      console.log(task);

      if (!(getFallingTimeStamp(task, fromDate))) {
        // console.log('this task is in 24 hrs ');

        startTimeStamp.forEach((timestamp) =>
          allTimeStamps.push({ key: 'startTimeStamp', timestamp })
        );

        pauseTimeStamp.forEach((timestamp) =>
          allTimeStamps.push({ key: 'pauseTimeStamp', timestamp })
        );
        breakStartTimeStamp.forEach((timestamp) =>
          allTimeStamps.push({ key: 'breakStartTimeStamp', timestamp })
        );
        finishTimeStamp.forEach((timestamp) =>
          allTimeStamps.push({ key: 'finishTimeStamp', timestamp })
        );
        doneTimeStamp.forEach((timestamp) =>
          allTimeStamps.push({ key: 'doneTimeStamp', timestamp })
        );
        exitedTimeStamp.forEach((timestamp) =>
          allTimeStamps.push({ key: 'exitedTimeStamp', timestamp })
        );
      }

      // Sort all timestamps by timestamp value
      allTimeStamps.sort((a, b) => a.timestamp - b.timestamp);
      console.log('allTimeStamps', allTimeStamps);
      setSortedLastDayArr(allTimeStamps);
    });
  }

  async function sortTimeStamps(forHours = null) {
    let logs = await getTaskLogObjectFromStorage();

    let allTimeStamps = [];

    // Collect all timestamps from all tasks
    logs.forEach((task) => {
      const {
        startTimeStamp,
        pauseTimeStamp,
        breakStartTimeStamp,
        finishTimeStamp,
        doneTimeStamp,
        exitedTimeStamp,
      } = task;

      startTimeStamp.forEach((timestamp) =>
        allTimeStamps.push({ key: 'startTimeStamp', timestamp })
      );
      pauseTimeStamp.forEach((timestamp) =>
        allTimeStamps.push({ key: 'pauseTimeStamp', timestamp })
      );
      breakStartTimeStamp.forEach((timestamp) =>
        allTimeStamps.push({ key: 'breakStartTimeStamp', timestamp })
      );
      finishTimeStamp.forEach((timestamp) =>
        allTimeStamps.push({ key: 'finishTimeStamp', timestamp })
      );
      doneTimeStamp.forEach((timestamp) =>
        allTimeStamps.push({ key: 'doneTimeStamp', timestamp })
      );
      exitedTimeStamp.forEach((timestamp) =>
        allTimeStamps.push({ key: 'exitedTimeStamp', timestamp })
      );
    });

    // Sort all timestamps by timestamp value
    allTimeStamps.sort((a, b) => a.timestamp - b.timestamp);
    setSortedTimestampsArr(allTimeStamps);
  }

  useEffect(() => {
    sortTimeStamps();
    sortLastDayTimeStamps();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DashboardScreen</Text>

      {sortedLastDayArr.length > 1 && (
        <DisplayTimeline
          sortedTimestamps={sortedLastDayArr}
          viewName="Timeline of Tracked Tasks - 24hrs"
        />
      )}

      {sortedTimestampsArr.length > 1 ? (
        <DisplayTimeline
          sortedTimestamps={sortedTimestampsArr}
          viewName="Timeline of all Tracked Tasks"
        />
      ) : (
        <Text style={styles.message}>
          No tasks were executed using Pomodoro yet
        </Text>
      )}

      
    </View>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    paddingTop: Constants.statusBarHeight + 22,
  },
  title: {
    backgroundColor: '#eeeeee',
    padding: 2,
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    backgroundColor: '#eeeeee',
    padding: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
