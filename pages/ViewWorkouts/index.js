import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import placeholders from '../../placeholders';

import PageWithTitle from '../../components/PageWithTitle';
import Button from '../../components/Button';
import AreYouSureModal from '../../components/AreYouSureModal';

export default function ViewWorkouts({navigation, appState, appStateManipulators}) {
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <>
    <PageWithTitle title='Saved Workouts'>
    <ScrollView style={styles.scrollViewStyle}>
      <Button 
        type='quartery' 
        text='+ Create New Workout'
        style={styles.marginBottom}
        onPress={() => navigation.navigate(placeholders.pages.CreateWorkOutPage)}
      />
      {
        Object.keys(appState.workouts).map(workoutID => {
          return (
            <View style={[styles.marginBottom, styles.workoutButtonRow]}>
              <Button 
                key={workoutID}
                text={appState.workouts[workoutID].name}
                type='tertiary'
                style={styles.workoutButtonStyle}
                onPress={() => {navigation.navigate(placeholders.pages.CreateWorkOutPage, {workoutID})}}
              />
              <Button 
                type='secondary'
                text='x'
                style={styles.deleteButtonStyle}
                onPress={() => {
                  setWorkoutToDelete(workoutID);
                  setDeleteModalVisible(true);
                }}
              />
            </View>
          )
        })
      }
    </ScrollView>
      <StatusBar style="auto" />
    </PageWithTitle>


    <AreYouSureModal 
      visible={deleteModalVisible}
      setVisible={setDeleteModalVisible}
      bodyText={appState.workouts[workoutToDelete] ? `Do you want to delete ${appState.workouts[workoutToDelete].name}?` : null}
      confirmFunction={async () => {
        setDeleteModalVisible(false);
        appStateManipulators.removeWorkout(workoutToDelete);
        setWorkoutToDelete(null);
      }}
    />
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    marginHorizontal: '05%'
  },
  marginBottom: {
    marginBottom: 5
  },
  workoutButtonRow: {
    flexDirection: 'row'
  },
  workoutButtonStyle: {
    flex: 1
  },
  deleteButtonStyle: {
    paddingHorizontal: 10
  }
});
