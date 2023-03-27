import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable, Modal } from 'react-native';
// import { PomodoroModal } from '../PomodoroModal';
import { Colors } from '../../constants/styles';

import Input from './Input';

import RecurrencePicker from './RecurrencePicker';
import ReminderInput from './ReminderInput';

function TaskFormNonMand(props) {
  let inputChangedHandler = props.inputChangedHandle;
  let inputValue = props.inputVal;
  let reminderDate = inputValue.reminder;

  if (reminderDate) {
    reminderDate = new Date(reminderDate);
    if (!(reminderDate instanceof Date && !isNaN(reminderDate))) {
      reminderDate = null;
    }
  } else {
    reminderDate = null;
  }

  const dateTimeReminderHandler = (val) => {
    props.onDateTimechange(val);
  };

  const recurrenceHandler = (val) => {
    props.recurrenceHandle(val);
  };


  return (
    <View>
      <View>
        <RecurrencePicker
          value={inputValue.recurrence ? inputValue.recurrence : 'never'}
          onChange={recurrenceHandler}
        />
      </View>

     

      <ReminderInput
        onDateTimeChange={dateTimeReminderHandler}
        selectedDate={reminderDate}
      />

      <Input
        label="Pending On"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'pending_on'),
          value: inputValue.pending_on,
        }}
      />

      <Input
        label="Priority"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'priority'),
          value: inputValue.priority,
          testID: "priority-input",
        }}
      />

      <Input
        label="Project"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'project'),
          value: inputValue.project,
        }}
      />

      <Input
        label="Labels"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'labels'),
          value: inputValue.labels,
        }}
      />

      <Input
        label="Duration"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'duration'),
          value: inputValue.duration,
          testID: "duration-input",
        }}
      />

      <Input
        label="Due On"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'due_on'),
          value: inputValue.due_on,
        }}
      />

      <Input
        label="Location"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'location'),
          value: inputValue.location,
        }}
      />

      <Input
        label="Subtasks"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'subtasks'),
          value: inputValue.subtasks,
        }}
      />

      <Input
        label="Assign To"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'assign_to'),
          value: inputValue.assign_to,
        }}
      />

      <Input
        label="Task From"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'task_from'),
          value: inputValue.task_from,
        }}
      />
    </View>
  );
}

export default TaskFormNonMand;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 50,
  },

  list_item_container: {
    flex: 1,
    borderRadius: 6,
    padding: 12,
    marginVertical: 8,
    elevation: 3,
    shadowColor: Colors.shadowColor,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },

  goalHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalDescription: {
    padding: 2,
  },
  goalText: {
    color: 'black',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

//<Text>Moment(schedule).format('d MMM')</Text>
