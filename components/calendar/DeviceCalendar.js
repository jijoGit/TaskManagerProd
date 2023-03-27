import { StyleSheet, Text, TextInput, View } from 'react-native';

import Button from '../ui/Button';
import useCalendar from './useCalendar';

function DeviceCalendar({ schedule, name }) {
  const {
    getPermission,
    createCalendar,
    addEventsToCalendar,
    deleteCalendar,
    openSettings,
    isThereEvents,
    getEvents,
    getCalendarId,
  } = useCalendar('TodoApp', '#5351e0', 'Calendar_ToDo');

  const findEvent = (events, title, startTime) => {
    for (let i = 0; i < events.length; i++) {
      if (events[i].title === title && events[i].startDate === startTime) {
        return true;
      }
    }
    return false;
  };

  const createCalAndEvent = async (taskName, startTime, endTime) => {
    const granted = await getPermission();

    if (granted) {
      await createCalendar();
      let eventExists = await isThereEvents();
      const listEvent = await getEvents();

      if (!eventExists || !findEvent(listEvent, taskName, startTime) ) {
        try {
          addEventsToCalendar(taskName, startTime, endTime);
          alert('Calendar added');
        } catch (e) {
          // Something went wrong
        }
      } else {
        alert('Calendar event already exists');
      }
    } else {
      openSettings();
    }
  };

  const addCalendar = () => {
    const task_name = name ? 'ToDo Task: ' + name : 'ToDo Task';
    const endDate = new Date(schedule);
    endDate.setMinutes(endDate.getMinutes() + 30);
    createCalAndEvent(
      (taskName = task_name),
      (startTime = schedule),
      (endTime = endDate)
    );
  };

  return (
    <View>
      <Button onPress={addCalendar}>Add to device calendar</Button>
    </View>
  );
}

export default DeviceCalendar;

// const styles = StyleSheet.create({

// });
