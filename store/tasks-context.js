import { createContext, useReducer } from 'react';

const DUMMY_TASKS = [];

export const TasksContext = createContext({
  tasks: [],
  addTask: () => {},
  setTasks: (tasks) => {},
  deleteTask: (id) => {},
  updateTask: () => {},
});

function tasksReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    }

    case 'SET': {
      const inverted = action.payload.reverse();
      return inverted;
    }

    case 'UPDATE': {
      const updateTaskIdx = state.findIndex((task) => {
        return task.id === action.payload.id;
      });

      const udpatableTask = state[updateTaskIdx];
      const updatedItem = { ...udpatableTask, ...action.payload.data };
      const updatedTasks = [...state];
      updatedTasks[updateTaskIdx] = updatedItem;

      return updatedTasks;
    }
    case 'DELETE': {
      return state.filter((task) => task.id !== action.payload);
    }
    default:
      return state;
  }
}

function TasksContextProvider({ children }) {
  const [taskState, dispatch] = useReducer(tasksReducer, DUMMY_TASKS);

  function addTask(taskData) {
    dispatch({ type: 'ADD', payload: taskData });
  }

  function setTasks(tasks) {
    // console.log('setTasks', tasks);
    dispatch({ type: 'SET', payload: tasks });
  }

  function updateTask(id, taskData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: taskData } });
  }

  function deleteTask(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  const value = {
    tasks: taskState,
    addTask: addTask,
    setTasks: setTasks,
    updateTask: updateTask,
    deleteTask: deleteTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export default TasksContextProvider;
