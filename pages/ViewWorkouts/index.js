import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import PageWithTitle from '../../components/PageWithTitle';

export default function ViewWorkouts() {
  return (
    <PageWithTitle title='Saved Workouts'>
      <StatusBar style="auto" />
    </PageWithTitle>
  );
}

const styles = StyleSheet.create({
});
