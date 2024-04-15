import { RouteProp, useRoute } from '@react-navigation/native';
import { View, StyleSheet, Text } from 'react-native';

import { RootStackParamList } from '../navigation';

type DetailsSreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function Details() {
  const router = useRoute<DetailsSreenRouteProp>();

  const { taskDetails } = router.params;

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Título:</Text>
        <Text style={styles.info}>{taskDetails.title}</Text>
        <Text style={styles.title}>Local:</Text>
        <Text style={styles.info}>{taskDetails.location}</Text>
        <Text style={styles.title}>Anotações:</Text>
        <Text style={styles.info}>{taskDetails.notes}</Text>
        <Text style={styles.title}>Completada:</Text>
        <Text style={styles.info}>{taskDetails.completed ? 'Sim' : 'Não'}</Text>
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
    marginHorizontal: 'auto',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 18,
    marginBottom: 16,
  },
});
