import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';
import { Picker } from '@react-native-community/picker';

const RecurrencePicker = ({ value, onChange }) => {
  const pickHandler = (itemValue) => {
    console.log(itemValue);
    onChange(itemValue);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Recurrence</Text>
      <Picker
        selectedValue={value ? value : 'Never'}
        onValueChange={pickHandler}
        style={styles.input}>
        <Picker.Item label="Never" value="never" />
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="Weekly" value="weekly" />
        <Picker.Item label="Monthly" value="monthly" />
        <Picker.Item label="Yearly" value="yearly" />
      </Picker>
    </View>
  );
};

export default RecurrencePicker;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: Colors.primary700,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.primary50,
    color: Colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
});
