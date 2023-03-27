import { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Colors } from '../../constants/styles';

const ReminderInput = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    props.selectedDate ? props.selectedDate : null
  );


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    setTimePickerVisibility(true);
    hideDatePicker();
  };

  const handleTimeConfirm = (time) => {
    setSelectedDate(
      new Date(
        selectedDate.setHours(
          time.getHours(),
          time.getMinutes(),
          time.getSeconds()
        )
      )
    );
    hideTimePicker();
    props.onDateTimeChange(
      new Date(
        selectedDate.setHours(
          time.getHours(),
          time.getMinutes(),
          time.getSeconds()
        )
      )
    );
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Reminder</Text>

      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        {selectedDate ? (
          <Text>
            {`${selectedDate.toLocaleDateString()} : ${selectedDate.getHours()}:${selectedDate.getMinutes()}:${selectedDate.getSeconds()}`}
          </Text>
        ) : (
          <Text>Set</Text>
        )}
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

export default ReminderInput;

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
