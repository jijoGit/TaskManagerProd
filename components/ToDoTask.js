import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';

function ToDoTask(props) {
  const navigation = useNavigation();
  Moment.locale('en');

  let schedule = props.item.schedule;
  const jsDate = new Date(schedule); // create a new JavaScript Date object
  const momentDate = Moment(jsDate).format('DD-MM'); // pass the Date object to the Moment() function

  const [isChecked, setIsChecked] = useState(
    props.item.task_state ? true : false
  );

  useEffect(() => {
    if (props.item.task_state === 'done') {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [props.item.task_state]);

  function taskPressHandler() {
    navigation.navigate('AddTasks', {
      taskId: props.item.id,
      action: 'edit',
    });
  }

  const taskCheckHandler = () => {
    toggleCheckBox();

    navigation.navigate('AddTasks', {
      taskId: props.item.id,
      action: 'done',
    });
  };

  // Function to toggle the check box
  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable
          onPress={taskPressHandler}
          style={({ pressed }) => pressed && styles.pressed}>
          <View>
            <View style={styles.goalHeaderContainer}>
              <Text style={isChecked ? styles.text_strike : {}}>
                {props.item.name}
              </Text>
            </View>

            <View style={styles.goalFooter}>
              <Text>{momentDate}</Text>
            </View>
          </View>
        </Pressable>
      </View>

      <View>
        <TouchableOpacity onPress={taskCheckHandler}>
          {isChecked ? (
            <Ionicons name="ios-checkbox" size={24} color="green" />
          ) : (
            <Ionicons name="ios-square-outline" size={24} color="grey" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ToDoTask;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 5,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.95,
  },

  goalHeaderContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  text_strike: {
    textDecorationLine: 'line-through',
  },
});
