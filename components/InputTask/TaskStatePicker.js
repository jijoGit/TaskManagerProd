import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';
import { Picker } from '@react-native-community/picker';

const TaskStatePicker = ({ value, onChange }) => {
  const pickHandler = (itemValue) => {
    onChange(itemValue);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Task State</Text>
      <Picker
        selectedValue={value ? value : 'none'}
        onValueChange={pickHandler}
        style={styles.input}>
        <Picker.Item label="Awaiting" value="awaiting" />
        <Picker.Item label="Done" value="done" />
        <Picker.Item label="None" value="none" />
      </Picker>
    </View>
  );
};

export default TaskStatePicker;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: Colors.primary700,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.primary50,
    color: Colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
});
