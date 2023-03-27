import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { Colors } from '../constants/styles';
import ToDoTask from './ToDoTask';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

function TasksList({ tasks }) {
  //get the orderArray

  const [sortedTaskIds, setSortedTaskIds] = useState(
    tasks.map((task) => task.id)
  );

  const [toDoTasks, setToDoTasks] = useState(tasks);

  useLayoutEffect(() => {
    const orderedTasks = [];
    sortedTaskIds.forEach((id) => {
      const task = tasks.find((task) => task.id === id);
      if (task) {
        orderedTasks.push(task);
      }
    });

    setToDoTasks(orderedTasks);
  }, [sortedTaskIds, tasks]);

  function doneTaskHandler() {
    console.log('Done task');
  }

  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: isActive ? 'grey' : item.backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderRadius: 10,
          }}
          onLongPress={drag}>
          <View style={{ paddingRight: 2 }}>
            <Ionicons name="ios-reorder-four" size={20} color="#000" />
          </View>

          <View style={styles.list_item}>
            <ToDoTask
              item={item}
              key={item.id}
              onDoneTask={doneTaskHandler}
              drag={drag}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onMoveEnd = (toDoTasks) => {
    let data = toDoTasks.data;
    setSortedTaskIds(data.map((task) => task.id));
  };

  return (
    <GestureHandlerRootView style={{ width: '100%', height: '100%' }}>
      <DraggableFlatList
        data={toDoTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onDragEnd={(toDoTasks) => onMoveEnd(toDoTasks)}
      />
    </GestureHandlerRootView>
  );
}

export default TasksList;

const styles = StyleSheet.create({
  list_item: {
    flex: 1,
    borderRadius: 6,
    paddingTop: 12,
    paddingBottom: 12,
    elevation: 3,
    shadowColor: Colors.shadowColor,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
});
