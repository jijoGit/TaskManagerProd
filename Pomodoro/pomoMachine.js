/**
 *  Pomodoro timer state machine using the XState library is implemented 
 *  The state machine has four states (idle, running, paused, onBreak) and transitions between them based on user actions (START, PAUSE, BREAK, RESUME, FINISH, RESET). 
 * The context includes information about the task and its activity log. The code also uses AsyncStorage to store the activity logs persistently.

 */

import { createMachine, assign } from 'xstate';
import PomodoroActvityLogDupe from './PomodoroActivityLogs';
import AsyncStorage from '@react-native-async-storage/async-storage';

let taskActivityLogs = [];

const getFromtaskActivityLogs = (task_id) => {
  let logs = PomodoroActvityLogDupe.allLogs.filter(function (element) {
    return element.task_id === task_id;
  });
  if (logs.length > 0) {
    let log = logs[0];
    return log;
  }

  return null;
};

async function getTaskLogObjectFromStorage(task_id) {
  try {
    const taskActivityLogs = await AsyncStorage.getItem('taskActivityLogs');

    if (taskActivityLogs) {
      let logs = JSON.parse(taskActivityLogs);
      let log = logs.find((element) => element.task_id === task_id);
      if (log) {
        return log;
      }
    }
    return null;
  } catch (error) {
    console.log('Error getting taskActivityLogs from disk:', error);
    return null;
  }
}


const loadFromStorage = async (task_id) => {
  // First, check if the log is already in memory
  let taskLogObject = PomodoroActvityLogDupe.allLogs.find(
    (log) => log.task_id === task_id
  );

  if (PomodoroActvityLogDupe.allLogs.length < 0) {
    // If the log is not in memory, check storage
    taskLogObject = await getTaskLogObjectFromStorage(task_id);
  }

  if (!taskLogObject) {
    // If the log is not found in memory or storage, create a new one
    tasklog = new PomodoroActvityLogDupe(task_id);
  } else {
    // If the log is found in memory or storage, use it to create a new instance of PomodoroActvityLogDupe
    tasklog = new PomodoroActvityLogDupe(task_id, taskLogObject);
  }
};

const createTaskLog = (task_id) => {
  let tasklog = getFromtaskActivityLogs(task_id);

  return tasklog;
};

const saveToDisc = async () => {
  try {
    let jsonObj = JSON.stringify(PomodoroActvityLogDupe.allLogs);
    await AsyncStorage.setItem('taskActivityLogs', jsonObj);
  } catch (error) {}
};

const updateTaskLogAdd = (tasklog) => {
  tasklog.addStartTimeStamp(Date.now());
  return tasklog.generateTimeline();
};

const updateTaskLogPause = (taskLog) => {
  taskLog.addPauseTimeStamp(Date.now());
  return taskLog.generateTimeline();
};

const updateTaskLogBreak = (taskLog) => {
  taskLog.addBreakStartTimeStamp(Date.now());
  return taskLog.generateTimeline();
};

const updateTaskLogDone = (taskLog) => {
  taskLog.addDoneTimeStamp(Date.now());
  return taskLog.generateTimeline();
};

const updateTaskLogFinish = (taskLog) => {
  taskLog.addExitTimeStamp(Date.now());
  PomodoroActvityLogDupe.allLogs[taskLog.task_id] = taskLog;
  saveToDisc();
  return taskLog.generateTimeline();
};

const pomodoroMachine = createMachine({
  id: 'pomodoro',
  context: {
    start_count: 0,
    taskLog: null,
    colorWidthArr: [],
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: 'running',
      },
      entry: [
        (context) => {
          loadFromStorage(context.task_id);
        },
      ],
    },
    running: {
      on: {
        PAUSE: 'paused',
        BREAK: 'onBreak',
        FINISH: 'finished',
      },
      entry: [
        assign((context) => ({ taskLog: createTaskLog(context.task_id) })),

        assign((context) => ({
          colorWidthArr: updateTaskLogAdd(context.taskLog),
        })),
      ],
    },
    paused: {
      on: {
        RESUME: 'running',
        FINISH: 'finished',
      },
      entry: [
        assign((context) => ({
          colorWidthArr: updateTaskLogPause(context.taskLog),
        })),
      ],
    },
    onBreak: {
      on: {
        RESUME: 'running',
        FINISH: 'finished',
      },
      entry: [
        assign((context) => ({
          colorWidthArr: updateTaskLogBreak(context.taskLog),
        })),
      ],
    },
    finished: {
      on: {
        RESET: 'idle',
      },
      entry: [
        assign((context) => ({
          colorWidthArr: updateTaskLogFinish(context.taskLog),
        })),
        (context) => console.log('finish', context),
      ],
    },
  },
});

export default pomodoroMachine;
