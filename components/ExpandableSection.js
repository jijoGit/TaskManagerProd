//Accordian 

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskssOutput from './TasksOutput';

const ExpandableSection = ({ title, number, filteredTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle} onPress={toggleExpand}>
        {title} ({number})
      </Text>
      {isExpanded && (
        <View style={styles.sectionContent}>
         <TaskssOutput
            filteredTask={filteredTask}
            taskFilterName={title}
            fallbackText={'No tasks to display.'}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionTitle: {
    backgroundColor: '#eeeeee',
    padding: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    paddingHorizontal: 2,
    paddingBottom: 2,
  },
});

export default ExpandableSection;
