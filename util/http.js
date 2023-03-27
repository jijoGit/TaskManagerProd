import React from 'react';
import { api } from '../env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function lookupAccount(token) {
  const API_KEY = api.key;
  const url =
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key` + API_KEY;

  const data = {
    idToken: token,
  };

  const response = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log('lookupAccount', response.data);
  return response.data;
}

const BACKEND_URL =
  'https://three-plus-to-do-default-rtdb.europe-west1.firebasedatabase.app';

export async function storeTask(taskData) {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      const userID = await AsyncStorage.getItem('userID');
      let url = `${BACKEND_URL}/users/${userID}/tasks.json?auth=${token}`;
      // let url = BACKEND_URL + '/tasks.json' + '?auth=' + token;
      const response = await axios.post(url, taskData);
      const id = response.data.name;
      return id;
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
}

export async function getMessage(token) {
  let url =
    'https://three-plus-to-do-default-rtdb.europe-west1.firebasedatabase.app/message.json' +
    '?auth=' +
    token;

  const response = await axios.get(url);
  return response.data;
}

export async function fetchAllTasks(token) {
  // console.log(' response.data ((((99999)))) fetchAllTasks');
  const userID = await AsyncStorage.getItem('userID');

  let url = `${BACKEND_URL}/users/${userID}/tasks.json?auth=${token}`;

  const response = await axios.get(url);

  const tasks = [];

  for (const key in response.data) {
    const taskObj = {
      id: key,
      name: response.data[key].name,
      description: response.data[key].description,
      schedule: new Date(response.data[key].schedule),
      recurrence: response.data[key].recurrence,
      reminder: new Date(response.data[key].reminder),
      pending_on: response.data[key].pending_on,
      priority: response.data[key].priority,
      project: response.data[key].project,
      label: response.data[key].label,
      duration: response.data[key].duration,
      due_on: new Date(response.data[key].due_on),
      location: response.data[key].location,
      subtasks: [...response.data[key].subtasks],
      assign_to: response.data[key].assign_to,
      task_from: response.data[key].task_from,
      state: response.data[key].state,
      done_check: response.data[key].done_check,
      task_state: response.data[key].task_state,
    };

    tasks.push(taskObj);
  }

  return tasks;
}

export async function updateTask(id, taskData) {
  try {
    const token = await AsyncStorage.getItem('token');
    const userID = await AsyncStorage.getItem('userID');
    if (token !== null) {
      let url = `${BACKEND_URL}/users/${userID}/tasks/${id}.json?auth=${token}`;
      const response = await axios.put(url, taskData);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTask(id) {
  try {
    const token = await AsyncStorage.getItem('token');
    const userID = await AsyncStorage.getItem('userID');

    if (token !== null) {
      let url = `${BACKEND_URL}/users/${userID}/tasks/${id}.json?auth=${token}`;
      axios.delete(url);
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
}

export async function classifyTask(data=null, uri=null) {
  // const data = { text: 'Assign and manag' };
  if (!data) return null;

  const dataRequest = { text: data}
  const jsonString = JSON.stringify(dataRequest);
  const url = 'http://localhost:5000/classify';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonString,
    });

    const responseData = await response.json();
    console.log('Response:', responseData);
    return responseData;
  } catch (error) {
    // console.error('Error:', error);
    return null;
  }
}
