import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, StyleSheet } from 'react-native';

const Accordion = ({ number='..', title, children }) => {
  const [expanded, setExpanded] = useState(false);
  console.log('accordian, ',number, title, children );

  const toggleAccordion = () => {
    console.log('what werhwehflasdjfls d');
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleContainer} onPress={toggleAccordion}>
        <Text style={styles.title}>{title} ({number})</Text>
      </TouchableOpacity>
      {expanded && <View style={styles.contentContainer}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    // overflow: 'hidden',
  },
  titleContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    backgroundColor: 'red',
    padding: 10,
  },
});

export default Accordion;
