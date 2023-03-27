import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const onFilterSelection = (criteria) => {
  // Filter the task list based on the criteria
  const filteredTasks = tasks.filter((task) => {
    // Iterate over the criteria object and check if the task matches
    for (let key in criteria) {
      if (task[key] !== criteria[key]) {
        return false;
      }
    }
    return true;
  });

  // Update the state with the filtered task list
  setTasks(filteredTasks);
};

const CustomFilter = (props) => {
  const filters = [
    {
      id: 'today',
      name: 'Today',
      criteria: {
        due_date: new Date().toISOString().slice(0, 10),
      },
    },
    {
      id: 'tomorrow',
      name: 'Tomorrow',
      criteria: {
        due_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      },
    },
    {
      id: 'overdue',
      name: 'Overdue',
      criteria: {
        due_date: { $lt: new Date().toISOString().slice(0, 10) },
        done_check: false,
      },
    },
  ];

  
  // const [filters, setFilters] = useState(props.filters);
  let filter_id = 'today'; //filter.id 
  const [currentFilter, setCurrentFilter] = useState();

  const handleFilterSelection = (id) => {
    // Find the filter criteria based on the unique identifier
    const selectedFilter = filters.find((filter) => filter.id === id);

    // Update the currentFilter state variable
    setCurrentFilter(selectedFilter);

    // Pass the filter criteria to the function that will filter the tasks
    props.onFilterSelection(selectedFilter.criteria, selectedFilter.name);
  };

  return (
    <View>
      {filters.map((filter) => (
        <Button
          key={filter.id}
          title={filter.name}
          onPress={() => handleFilterSelection(filter_id)}
        />
      ))}
    </View>
  );
};

export default CustomFilter;
