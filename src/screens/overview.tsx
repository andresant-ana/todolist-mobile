import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../navigation';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://192.168.15.135:8080/tasks');
        const json = await response.json();

        setTasks(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [setTasks]);

  const completeTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.titleTasks}>TAREFAS</Text>
      </View>
      <View style={styles.main}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', { taskDetails: item })}
              style={styles.containerTask}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <TouchableOpacity onPress={() => completeTask(item.id)}>
                <MaterialIcons
                  name={item.completed ? 'check-box' : 'check-box-outline-blank'}
                  size={24}
                  color={item.completed ? 'black' : 'black'}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#000',
  },
  main: {
    flex: 1,
    maxWidth: 960,
    marginHorizontal: 'auto',
    justifyContent: 'space-between',
  },
  containerTask: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskTitle: {
    fontSize: 16,
  },
  containerTitle: {
    marginBottom: 24,
  },
  titleTasks: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});
