import { useState, useCallback, useContext } from 'react';
import { TasksContext } from '../../store/tasks-context';

export function useSetFilter() {
  const [isFetching, setIsFetching] = useState(true);
  const { tasks } = useContext(TasksContext);

  const props_filters = [
    {
      id: 'today',
      name: 'Today',
      criteria: {
        schedule: new Date(),
      },
    },
    {
      id: 'tomorrow',
      name: 'Tomorrow',
      criteria: {
        schedule: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      },
    },
    {
      id: 'overdue',
      name: 'Overdue',
      criteria: {
        schedule: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        task_state: false,
      },
    },
  ];

  const [filters, setFilters] = useState(props_filters);

  const getFilterSelection = useCallback((id) => {
    // Find the filter criteria based on the unique identifier
    const selectedFilter = filters.find((filter) => filter.id === id);

    // Update the currentFilter state variable
    return selectedFilter;
  }, []);

  const getFilterTasks = useCallback(
    (criteria) => {
      const isJsDate = (date = '') => {
        if (date === null || date.toString() === 'Invalid Date') {
          return false;
        } else {
          return date;
        }
      };

      const compareDate = (task_date) => {
        const todayDate = new Date();
        if (!task_date) return false;
        return (
          todayDate.getFullYear() === task_date.getFullYear() &&
          todayDate.getMonth() === task_date.getMonth() &&
          todayDate.getDate() === task_date.getDate()
        );
      };

      const filteredTasks = tasks.filter((task) => {
        for (let key in criteria) {
          const taskItem = isJsDate(task[key]) ? new Date(task[key]) : '';

          if (!compareDate(taskItem)) {
            return false;
          }
        }
        return true;
      });

      // Update the state with the filtered task list
      return filteredTasks;
    },
    [tasks]
  );

  const getOverdueTasks = useCallback(() => {
    const today = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

    const overdueTasks = tasks.filter((task) => {
      const taskDate = new Date(task.schedule);
      return taskDate < today && !task.task_state;
    });

    return overdueTasks;
  }, [tasks]);

  const getBlankTasks = useCallback(() => {
    const somedayTasks = tasks.filter((task) => {
      return  task.schedule.toString().length < 14;
    });

    return somedayTasks;
  }, [tasks]);

  return { getFilterSelection, getFilterTasks, getOverdueTasks, getBlankTasks };
}
