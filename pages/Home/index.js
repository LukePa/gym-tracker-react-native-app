import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import placeholders from '../../placeholders';

import PageWithTitle from '../../components/PageWithTitle';
import Button from '../../components/Button'


export default function Home({navigation, appState, appStateManipulators}) {

  return (
    <PageWithTitle title='GYM MANAGER'>
        <View style={styles.buttonSection}>
            <Button text='EXERCISES' style={styles.buttonStyle} type='secondary' onPress={() => {
                navigation.navigate(placeholders.pages.ViewExercisesPage);
            }} />
            <Button text='WORKOUTS' style={styles.buttonStyle} type='secondary' onPress={() => {
                navigation.navigate(placeholders.pages.ViewWorkoutsPage);
            }} />
            <Button text='WIPE' style={styles.buttonStyle} type='secondary' onPress={() => {
              appStateManipulators.resetData();
            }} />
            <Button text='RESET WORKOUT' style={styles.buttonStyle} type='secondary' onPress={() => {
              appStateManipulators.setCurrentWorkout(null);
            }} />
        </View>
        <View style={styles.startWorkoutFooter}>
          { appState.currentWorkout === null ? 
            <Button text='START A WORKOUT' type='quartery' onPress={() => {navigation.navigate(placeholders.pages.SelectWorkoutPage)}}/>
            :
            <Button text='CONTINUE WORKOUT' onPress={() => {navigation.navigate(placeholders.pages.InProgressWorkout)}}/>
          }
        </View>
      <StatusBar style="auto" />
    </PageWithTitle>
  );
}

const styles = StyleSheet.create({
  buttonSection: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 40,
    paddingRight: 40
  },

  buttonStyle: {
    marginBottom: 10
  },

  startWorkoutFooter: {
    padding: 20,
    paddingBottom: 60
  }
});
