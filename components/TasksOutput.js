// responsible to output task where it is necessary
//pass in filterd data

import { StyleSheet, View, Text } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import TasksList from './TasksList';


function TaskssOutput({
  filteredTask = '',
  taskFilterName = 'nothing to display',
  fallbackText = 'nothing to display',
}) {
  const [filtered_tasks, setFiltered_tasks] = useState(filteredTask);

   useEffect(() => {
    setFiltered_tasks(filteredTask);
  }, [filteredTask]);


  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (filtered_tasks.length > 0) {
    //pass it to a filter functio nand get the contnt back
    content = (
      <View>
        <TasksList tasks={filtered_tasks} />
      </View>
    );
  }

  return <View>{content}</View>;
}

export default TaskssOutput;

const styles = StyleSheet.create({
  infoText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 32,
  },
});
