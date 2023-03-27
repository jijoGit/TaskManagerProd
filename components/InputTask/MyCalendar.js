import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/styles';

const MyCalendar = (props) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    props.date ? props.date : null
  );

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
    props.setDay(day.dateString);
  };

  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowCalendar(!showCalendar)}>
        <Ionicons name="calendar-outline" size={24} />
        <Text>{selectedDate ? selectedDate : 'Select a date'}</Text>
      </TouchableOpacity>
      <Modal visible={showCalendar} transparent={true}>
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={onDayPress}
            style={{ margin: 14 }}
            markedDates={{
              [selectedDate]: { selected: true },
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default MyCalendar;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  label: {
    fontSize: 12,
    color: Colors.primary700,
    marginBottom: 4,
  },
  modalContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});
