import React, { useState, useContext } from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Constants from 'expo-constants';

import { Colors } from '../constants/styles';

import Button from '../components/ui/Button';

import { Ionicons } from '@expo/vector-icons';

import {SettingContext} from '../store/settings-context'

function MenuScreen() {
  const { pomodoroTime, setPomodoroTime, breakTime,  setBreakTime} = useContext(SettingContext);
  
  const saveSettings = () => {
    // console.log(pomodoroTime, breakTime);
  };

  const alertFunction = () => {
    Alert.alert('Uncheck is not enabled ');
  };

  return (
    <SafeAreaView style={styles.inputContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>Pomodoro Settings: </Text>
        <View>
          <Text style={styles.label}>Pomodoro Timer</Text>
          <TextInput
            placeholder="Enter Pomodoro time (in minutes)"
            keyboardType="numeric"
            value={pomodoroTime}
            onChangeText={setPomodoroTime}
            style={styles.input}
          />
          <Text style={styles.label}>Pomodoro Break Time</Text>
          <TextInput
            placeholder="Enter Pomodoro break time (in minutes)"
            keyboardType="numeric"
            value={breakTime}
            onChangeText={setBreakTime}
            style={styles.input}
          />
        </View>
        <View style={styles.label}>
          <Button onPress={saveSettings}>Save</Button>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Filters View: </Text>
        <View style={styles.filter_container}>
          <Text style={styles.title}>All Tasks Tasks</Text>

          <TouchableOpacity onpress={alertFunction}>
            <Ionicons name="ios-checkbox" size={24} color="green" />
          </TouchableOpacity>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
        <View style={styles.filter_container}>
          <Text style={styles.title}>Overdue Tasks</Text>

          <TouchableOpacity onpress={alertFunction}>
            <Ionicons name="ios-checkbox" size={24} color="green" />
          </TouchableOpacity>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
        <View style={styles.filter_container}>
          <Text style={styles.title}>Blank Tasks</Text>

          <TouchableOpacity onpress={alertFunction}>
            <Ionicons name="ios-checkbox" size={24} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    paddingTop: Constants.statusBarHeight + 22,
  },
  card: {
    backgroundColor: '#e8d3d3',
    marginBottom: 8,
    borderRadius: 10,
    padding: 2,
  },
  title: {
    fontSize: 18,
    color: Colors.primary700,
    marginBottom: 4,
    marginTop: 15,
  },
  label: {
    fontSize: 15,
    color: Colors.primary700,
    marginBottom: 4,
    marginTop: 15,
  },
  input: {
    backgroundColor: Colors.primary50,
    color: Colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  filter_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
