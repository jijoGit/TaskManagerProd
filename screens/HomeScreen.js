import { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { AuthContext } from '../store/auth-context';
import { fetchAllTasks } from '../util/http';
import { TasksContext } from '../store/tasks-context';
import { useSetFilter } from '../components/filters/useSetFilter';
import ExpandableSection from '../components/ExpandableSection';

function HomeScreen() {
  const navigation = useNavigation();
  const [isFetching, setIsFetching] = useState(true);
  const [fetchedMessage, setFetchedMesssage] = useState('');

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const tasksCtx = useContext(TasksContext);

  const { getFilterSelection, getFilterTasks, getOverdueTasks, getBlankTasks } =
    useSetFilter();
  const [allTasks, setallTasks] = useState([]);
  const [filterTodaysTasks, setFilterTodayTasks] = useState([]);
  const [filterOverdueTasks, setFilterOverdueTasks] = useState([]);
  const [somedayTasks, setSomedayTasks] = useState([]);

  useEffect(() => {
    setIsFetching(true);
    // console.log('token got', token);
    async function getTasks() {
      try {
        // console.log('token fetchAllTasks');
        const tasks = await fetchAllTasks(token);
        tasksCtx.setTasks(tasks);
        setallTasks(tasks);
      } catch (error) {
        console.error(error);
        // Handle the error
      } finally {
        setIsFetching(false);
      }
    }

    getTasks();
  }, [token]);

  let filterToday = getFilterSelection('today');
  let criteriaToday = filterToday.criteria;

  useEffect(() => {
    let { tasks } = tasksCtx;
    setallTasks(tasks);
  }, [tasksCtx]);

  useEffect(() => {
    if (allTasks) {
      setFilterTodayTasks(getFilterTasks(criteriaToday, allTasks));
      setFilterOverdueTasks(getOverdueTasks(allTasks));
      setSomedayTasks(getBlankTasks(allTasks));
    }
  }, [allTasks]);

  return (
    <View style={styles.rootContainer}>
      <ScrollView>
        <ExpandableSection
          title="Overdue"
          number={filterOverdueTasks.length}
          filteredTask={filterOverdueTasks}
        />

        <ExpandableSection
          title={filterToday.name}
          number={filterTodaysTasks.length}
          filteredTask={filterTodaysTasks}
        />
        <ExpandableSection
          title="All Tasks"
          number={allTasks.length}
          filteredTask={allTasks}
        />
        <ExpandableSection
          title="Someday (Blanks)"
          number={somedayTasks.length}
          filteredTask={somedayTasks}
        />
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddTasks')}
        style={styles.plusButton}>
        <View style={styles.plusBackground}>
          <Ionicons name="ios-add" size={40} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    marginVertical: 26,
    marginHorizontal: 16,
  },

  plusBackground: {
    backgroundColor: 'red',
    elevation: 2,
    borderRadius: 20,
    width: 40,
    shadowColor: 'grey',
  },
  plusButton: {
    position: 'absolute',
    marginRight: 50,
    bottom: 56,
    right: 16,
  },
});
