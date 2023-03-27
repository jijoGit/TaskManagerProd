
/**
 * This component renders custom components:
 *  UpTimer, PauseTimer, BreakTimer, ColorBar, and Button tostart, pause, and reset buttons.
 *  
 * it also initate the xState machine by calling useMachine 
 * 
 * The ColorBar component appears to display a horizontal bar of time used. 
 * The Button component is used to render various buttons throughout the component, such as the start, pause, and reset buttons.
 */

import { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import UpTimer from './UpTimer';
import PauseTimer from './PauseTimer';
import BreakTimer from './BreakTimer';
import { useMachine } from '@xstate/react';
import pomodoroMachine from './pomoMachine';
import Button from '../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import ColorBar from './ColorBar';
import { SettingContext } from '../store/settings-context';

export default function PomoMainTimer(props) {
  let selectedTask = props.selTask;
  const { pomodoroTime } = useContext(SettingContext);

  const [current, send] = useMachine(pomodoroMachine, {
    context: {
      task_id: selectedTask.id,
    },
  });

  const { colorWidthArr } = current.context;

  const [startCode, SetStartCode] = useState(false);
  const [pauseCode, SetPauseCode] = useState(false);
  const [breakDone, SetBreakDone] = useState(false);

  const breakDoneToggle = () => {
    SetBreakDone(!breakDone);
    send('FINISH');
  };

  const timerDone = () => {
    send('BREAK');
  };

  const finishHandlerFn = () => {
    send('FINISH');
    props.finishHandler();
  };

  const doneHandlerFn = () => {
    send('FINISH');
    props.doneHandler();
  };

  useEffect(() => {
    if (current.matches('running')) {
      SetStartCode('running');
    } else if (current.matches('paused')) {
      SetStartCode('paused');
      SetPauseCode('paused');
      // to auto transistion
    } else if (current.matches('onBreak')) {
      // console.log('APP():  on break');
      SetStartCode('onBreak');
    } else if (current.matches('finished')) {
      SetPauseCode('finished');
      SetStartCode('finished');
    }
  }, [current]);


  return (
    <View style={styles.rootContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.upTimeContainer}>
          <UpTimer
            start={startCode}
            timerDoneFn={timerDone}
            defaultTime={pomodoroTime * 60}
          />
          {current.value === 'idle' && (
            <Button onPress={() => send('START')}>
              <Ionicons name="ios-play" size={25} color="white" />
              Start Timer
            </Button>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Text style={styles.smallTitle}>
            Pomodoro state: {current.value.toUpperCase()}
          </Text>
          {current.value === 'running' && (
            <View>
              <Button onPress={() => send('PAUSE')}>
                <Ionicons name="ios-pause" size={25} color="white" />
                Pause
              </Button>
            </View>
          )}
        </View>

        <View style={styles.thirdContainer}>
          {current.value === 'paused' && (
            <>
              <PauseTimer startUp={pauseCode} />
              <Button onPress={() => send('RESUME')}>
                <Ionicons name="ios-play" size={25} color="white" />
                Resume
              </Button>
            </>
          )}
          {current.value === 'onBreak' && (
            <>
              <BreakTimer start={startCode} breakDoneFn={breakDoneToggle} />
            </>
          )}
          {current.value === 'finished' && (
            <Button onPress={() => send('RESET')}>
              <Ionicons name="ios-refresh" size={25} color="white" />
              Restart
            </Button>
          )}
        </View>
        <View style={styles.colorWidthArrContainer}>
          {colorWidthArr && (
            <View style={styles.color_bar}>
              <ColorBar colorWidthArray={colorWidthArr} />
            </View>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.mark_done}>
          <Button onPress={doneHandlerFn}>
            <Ionicons name="ios-checkmark-circle" size={25} color="white" />
            Done
          </Button>
        </View>
        <View style={[styles.go_back, { marginTop: 10 }]}>
          <Button style={{ width: '75%' }} onPress={finishHandlerFn}>
            <Ionicons name="ios-arrow-back" size={20} color="white" />
            Go Back
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#ecf0f1',
    flex: 1,
  },
  contentContainer: {
    flex: 4,
  },
  upTimeContainer: { flex: 1 },
  buttonContainer: { flex: 1 },
  thirdContainer: { flex: 1 },
  colorWidthArrContainer: { flex: 1 },

  smallTitle: {
    fontSize: 18,
    paddingTop: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
