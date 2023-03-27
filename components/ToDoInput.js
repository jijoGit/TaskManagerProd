
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button

} from 'react-native';


function ToDoInput(props){

   const [enteredGoalText, setEnteredGoalText] = useState('');

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    
    props.onAddToDO(enteredGoalText);
    setEnteredGoalText('');
  }

  return(
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter a to do"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <Button title="add todo" onPress={addGoalHandler} />
      </View>
  )
};

export default ToDoInput

const styles = StyleSheet.create({

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    borderBottomColor: '#ccc',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },

});