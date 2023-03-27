import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { useContext, useState} from 'react';
import { Colors } from '../constants/styles';
import Constants from 'expo-constants';
import { TasksContext } from '../store/tasks-context';
import PomoMainTimer from '../Pomodoro/PomoMainTimer';
import { updateTask } from '../util/http';

function ManagePomodoroScreen({ route, navigation }) {
  const editedTaskId = route.params?.taskId;
  const tasksCtx = useContext(TasksContext);
  const selectedTask = tasksCtx.tasks.find((task) => task.id === editedTaskId);

  [pauseTimeElapsed, setTimeElapsed] = useState(0);

  [colArr, setColArr] = useState([]);

  const markDoneHandler = async () => {
    //mark task as done
    const taskIndex = tasksCtx.tasks.findIndex((task) => {
      return task.id === editedTaskId;
    });

    if (taskIndex >= 0) {
      const taskData = { ...tasksCtx.tasks[taskIndex] };

      // Update the state to 'done' in taskData
      taskData.task_state = 'done';

      tasksCtx.updateTask(editedTaskId, taskData);
      await updateTask(editedTaskId, taskData);
    }

    navigation.navigate('Home');
  };

  const goBackHandler = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.root_container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{selectedTask.name.slice(0, 25)}</Text>
          <View>
            <Text>Status</Text>
            <Text style={styles.title}>
              {selectedTask.task_state?.toUpperCase()}
            </Text>
          </View>
        </View>
        <PomoMainTimer selTask={selectedTask} finishHandler={goBackHandler} doneHandler={markDoneHandler}/>
        <View style={styles.content}>
         <Text style={styles.title}>
              Description: 
            </Text>
          <Text style={styles.footerText}>{selectedTask.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ManagePomodoroScreen;

const styles = StyleSheet.create({
  root_container: {
    flex: 1,
    padding: 2,
    paddingTop: 25,
  },
  container: {
    flex: 1,
    padding: 8,
    paddingTop: Constants.statusBarHeight + 22,
    backgroundColor: '#ecf0f1',
    elevation: 2,
    borderRadius: 6,
    marginVertical: 8,
    shadowColor: Colors.shadowColor,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
  },
});

//first: click start leads to pomodo, decorate, timer functionality with defatult 25 mins

//check if task as duration if not set it as 25, otherwise pickt the duration

//show also a interface to add more pomodroro(25 mins)

//based on above run time till pomodoro
// add break after each pomodoro

//give intial estinmate : inital duration + pomodoro set via interface at inital

//activty log should capture with time stamp : sart, pause, exit, pomodoro added, time that is not tracked , restarted

// final time: inital duration + pomodoro set via interface till task is set as done

// follow that design..

//notification.

//ctx : task#, activity log things
