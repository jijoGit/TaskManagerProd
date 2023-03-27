import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Button from '../ui/Button';

import { Ionicons } from '@expo/vector-icons';
import TaskFormNonMand from './taskFormNonMand';
import MyCalendar from './MyCalendar';

import { useNavigation } from '@react-navigation/native';

import Input from './Input';
import { Colors } from '../../constants/styles';

import TaskStatePicker from './TaskStatePicker';

import DeviceCalendar from '../calendar/DeviceCalendar';

function TaskForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();

  const convertDate = (date = '') => {
    if (date === null || date.toString() === 'Invalid Date') {
      return '';
    } else {
      return date;
    }
  };

  const [inputValue, setInputValue] = useState({
    name: defaultValues ? defaultValues.name : '',
    description: defaultValues ? defaultValues.description : '',
    schedule: defaultValues ? convertDate(defaultValues.schedule) : '',
    recurrence: defaultValues ? defaultValues.recurrence : 'never',
    reminder: defaultValues ? convertDate(defaultValues.reminder) : '',
    pending_on: defaultValues ? defaultValues.pending_on : '',
    priority: defaultValues ? defaultValues.priority : '',
    project: defaultValues ? defaultValues.project : '',
    labels: defaultValues ? defaultValues.labels : [{}],
    duration: defaultValues ? defaultValues.duration : '',
    due_on: defaultValues ? convertDate(defaultValues.due_on) : '',
    location: defaultValues ? defaultValues.location : '',
    subtasks: defaultValues ? defaultValues.subtasks : [''],
    assign_to: defaultValues ? defaultValues.assign_to : '',
    task_from: defaultValues ? defaultValues.task_from : '',
    done_check: defaultValues ? defaultValues.done_check : '',
    task_state: defaultValues ? defaultValues.task_state : '',
  });

  const sch = inputValue.schedule
    ? new Date(inputValue.schedule).toISOString().slice(0, 10)
    : '';

  function startPressHandler() {
    let id = defaultValues ? defaultValues.id : '';

    navigation.navigate('ManagePomodoro', {
      taskId: id,
      action: 'start',
    });
  }

  function submitHandler() {
    const taskData = {
      name: inputValue.name,
      description: inputValue.description,
      schedule: inputValue.schedule,
      recurrence: inputValue.recurrence,
      reminder: inputValue.reminder,
      pending_on: inputValue.pending_on,
      priority: inputValue.priority,
      project: inputValue.project,
      labels: inputValue.labels,
      duration: inputValue.duration,
      due_on: inputValue.due_on,
      location: inputValue.location,
      subtasks: inputValue.subtasks,
      assign_to: inputValue.assign_to,
      task_from: inputValue.task_from,
      done_check: inputValue.done_check,
      task_state: inputValue.task_state,
    };
    onSubmit(taskData);
  }

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValue((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function scheduleHandler(dayString) {
    inputChangedHandler('schedule', dayString);
  }

  function recurrenceHandler(val) {
    inputChangedHandler('recurrence', val);
  }

  const taskStateHandler = (val) => {
    inputChangedHandler('task_state', val);
  };

  function reminderHandler(val) {
    inputChangedHandler('reminder', val);
  }

  const addCalendar = () => {
    console.log('addCalendar');
    addToCalenar(inputValue.schedule, inputValue.name);
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.list_item_container}>
        <View style={styles.goalHeaderContainer}>
          <Input
            label="Name"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'name'),
              value: inputValue.name,
            }}
          />

          {submitButtonLabel=='Update' && (
            <View>
              <View>
                <Button onPress={startPressHandler}>Start</Button>
              </View>
            </View>
          )}
        </View>

        <View style={styles.goalDescription}></View>

        <Input
          label="Description"
          textInputConfig={{
            multiline: true,
            autoCorrect: false,
            onChangeText: inputChangedHandler.bind(this, 'description'),
            value: inputValue['description'],
          }}
        />

        <View style={inputValue.schedule ? styles.buttons : null}>
          <MyCalendar setDay={scheduleHandler} date={sch} label="Schedule" />
          {inputValue.schedule && submitButtonLabel=='Update' &&  (
            <DeviceCalendar
              schedule={inputValue.schedule}
              name={inputValue.name}
            />
          )}
        </View>

        <TaskStatePicker
          value={inputValue.task_state ? inputValue.task_state : 'none'}
          onChange={taskStateHandler}
        />

        {expanded && (
          <TaskFormNonMand
            inputChangedHandle={inputChangedHandler}
            inputVal={inputValue}
            recurrenceHandle={recurrenceHandler}
            selectedReccurence={inputValue.recurrence}
            onDateTimechange={reminderHandler}
          />
        )}

        <View style={styles.buttons}>
          <Button onPress={onCancel}>
            <Ionicons name="ios-close" size={25} color="white" />
            <Text>Cancel</Text>
          </Button>

          <Button onPress={submitHandler}>
            <Ionicons name="ios-checkmark" size={25} color="white" />
            <Text>{submitButtonLabel}</Text>
          </Button>
        </View>
      </View>

      <View style={styles.expand}>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Ionicons
            name={expanded ? 'ios-arrow-up-outline' : 'ios-arrow-down-outline'}
            size={24}
          />
          <Text>{expanded ? 'Less' : 'More'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TaskForm;

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
    marginVertical: 10,
  },
  expand: {
    alignItems: 'center',
  },
});

//<Text>Moment(schedule).format('d MMM')</Text>
