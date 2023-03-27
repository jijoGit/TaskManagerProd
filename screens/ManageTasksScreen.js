import React from 'react';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
import { useContext, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { classifyTask } from '../util/http';
import Constants from 'expo-constants';
import TaskForm from '../components/InputTask/TaskForm';
import { TasksContext } from '../store/tasks-context';
import { storeTask, updateTask, deleteTask } from '../util/http';

function ManageTasksScreen({ route, navigation }) {
  const editedTaskId = route.params?.taskId;
  const editedTaskAction = route.params?.action;
  const [isLoading, setIsLoading] = useState(false);
  const tasksCtx = useContext(TasksContext);
  //convert to boolean
  const isEditing = !!editedTaskId;

  const markTaskdone = async () => {
    const taskIndex = tasksCtx.tasks.findIndex((task) => {
      return task.id === editedTaskId;
    });

    if (taskIndex > -1) {
      const taskData = { ...tasksCtx.tasks[taskIndex] };
      // Update the state to 'done' in taskData
      if (taskData.task_state == 'done') taskData.task_state = '';
      else taskData.task_state = 'done';
      tasksCtx.updateTask(editedTaskId, taskData);
      await updateTask(editedTaskId, taskData);
    }
  };

  if (editedTaskAction === 'done') {
    markTaskdone();
    navigation.navigate('Home');
  }

  const selectedTask = tasksCtx.tasks.find((task) => task.id === editedTaskId);

  function goBack() {
    navigation.goBack();
  }

  function cancelHandler() {
    goBack();
  }

  //for both updaing and deleting
  async function confirmHandler(taskData) {
    setIsLoading(true); // set the loading state to true
    if (isEditing) {
      // console.log('6. confirmHandler isEditing', taskData);
      tasksCtx.updateTask(editedTaskId, taskData);
      await updateTask(editedTaskId, taskData);
    } else {
      // console.log('6. confirmHandler isEditing', taskData);
      const id = await storeTask(taskData);
      const data = taskData.name + ' ' + taskData.description;
      const label = await classifyTask(data);
      console.log(label);
      tasksCtx.addTask({ ...taskData, id: id });
    }
    setIsLoading(false); // set the loading state to false
    navigation.navigate('Home');
  }

  async function deleteHandler() {
    setIsLoading(true); // set the loading state to true
    if (editedTaskId) {
      tasksCtx.deleteTask(editedTaskId);
      await deleteTask(editedTaskId);
    }
    setIsLoading(true); // set the loading state to true
    goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={isLoading ? styles.spinnerContainer : null}>
        <ActivityIndicator size="large" color="#0000ff" animating={isLoading} />
      </View>

      <TaskForm
        style={styles.taskForm}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        isEditing={isEditing}
        defaultValues={selectedTask}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
      />
      {editedTaskId && <Button onPress={deleteHandler} title="Delete" />}
    </ScrollView>
  );
}

export default ManageTasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 12,
  },
  taskForm: {
    flex: 4,
  },
  spinnerContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
