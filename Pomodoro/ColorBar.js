/**
 * This component that displays a horizontal bar with colored rectangles, indicating the elapsed time for different phases of a task. 
 * 
 * it displays legengs as The labels Start, Pause, Break, and Not Tracked and color that is being used
 */


import { View, StyleSheet, Text } from 'react-native';

const ColorBar = ({ colorWidthArray }) => {
  let totalElapsedSeconds = 0;

  colorWidthArray.forEach((color) => {
    totalElapsedSeconds += color.secondsElapsed;
  });

  // Use a for loop to iterate through values of i starting from 0.5 (30 minutes)
  //and increasing by 0.5 (30 minutes) until it reaches 24 * 10 (24 hours * 10 days )
  let totalWidth = totalElapsedSeconds + 1000;
  for (let i = 0.5; i <= 240; i += 0.5) {
    if (totalElapsedSeconds < i * 60 * 60) {
      totalWidth = (i + 0.5) * 60 * 60;
      break;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.colorArr_container}>
        {colorWidthArray.map((colorObject, index) => {
          const width = (colorObject.secondsElapsed / totalWidth) * 100; // calculate width in percentage
          return (
            <View
              key={index}
              style={[
                styles.colorRectangle,
                { backgroundColor: colorObject.color, width: `${width}%` },
              ]}
            />
          );
        })}
      </View>
      <View>
        <Text>Time line Scale: {totalWidth / 60 / 60} hrs </Text>
      </View>

      <View style={styles.legendContainer}>
        <View style={[styles.legendBox, { backgroundColor: 'blue' }]} />
        <Text style={styles.legendText}>Start</Text>
        <View style={[styles.legendBox, { backgroundColor: 'gray' }]} />
        <Text style={styles.legendText}>Pause</Text>
        <View style={[styles.legendBox, { backgroundColor: 'yellow' }]} />
        <Text style={styles.legendText}>Break</Text>
        <View style={[styles.legendBox, { backgroundColor: 'red' }]} />
        <Text style={styles.legendText}>Not Tracked </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  colorArr_container: {
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
    borderRadius: 3,
    backgroundColor: '#edf0f1',
  },
  colorRectangle: {
    height: '100%',
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  legendBox: {
    width: 25,
    height: 15,
    borderRadius: 3,
    marginLeft: 10,
    marginRight: 2,
  },
  legendText: {
    fontSize: 14,
  },
});

export default ColorBar;
