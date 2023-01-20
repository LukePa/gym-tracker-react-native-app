import * as React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import placeholders from '../../placeholders';
import { hasInProgressWorkout } from '../../store';

import PageWithTitle from '../../components/PageWithTitle';
import Button from '../../components/Button'


export default function Home({navigation, route}) {
  const [ workoutInProgress, setWorkoutInProgress ] = useState(false);

  useEffect(() => {
    const asyncUseEffect = async () => {
      try {
        const hasWorkout = await hasInProgressWorkout();
        setWorkoutInProgress(hasWorkout);
      } catch (e) {
        return;
      }
    }
    asyncUseEffect();
  }, [route.path])

  return (
    <PageWithTitle title='GYM MANAGER'>
        <View style={styles.buttonSection}>
            <Button text='Create New Exercise' style={styles.buttonStyle} type='secondary' onPress={() => {
                navigation.navigate(placeholders.pages.CreateExercisePage);
            }} />
            <Button text='Create New Workout' style={styles.buttonStyle} type='secondary' onPress={() => {
                navigation.navigate(placeholders.pages.CreateWorkOutPage);
            }} />
            <Button text='View Exercises' style={styles.buttonStyle} type='secondary' onPress={() => {
                navigation.navigate(placeholders.pages.ViewExercisesPage);
            }} />
            <Button text='View Workouts' style={styles.buttonStyle} type='secondary' onPress={() => {
                navigation.navigate(placeholders.pages.ViewWorkoutsPage);
            }} />
        </View>
        <View style={styles.startWorkoutFooter}>
          { workoutInProgress ? 
            <Button text='CONTINUE WORKOUT' onPress={() => {navigation.navigate(placeholders.pages.InProgressWorkout)}}/>
            :
            <Button text='START A WORKOUT' type='quartery' onPress={() => {navigation.navigate(placeholders.pages.SelectWorkoutPage)}}/>
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
