import { useState, useEffect, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet} from 'react-native';

import placeholders from '../../placeholders';

import PageWithTitle from '../../components/PageWithTitle';
import Button from '../../components/Button';
import AddEditExerciseModal from '../../components/AddEditExerciseModal';

import ExerciseRow from './ExerciseRow';


export default function ViewExercises({navigation, appState, appStateManipulators}) {
  const [isAddExerciseModalVisible, setIsAddExerciseModalVisible] = useState(false);

  const ExercisesRows = () => {
    const exerciseButtons = Object.keys(appState.exercises).map((exerciseID) => {
      return (
        <ExerciseRow exerciseID={exerciseID} appState={appState} appStateManipulators={appStateManipulators} key={exerciseID}/>
      )
    })

    return (
      <ScrollView style={styles.exerciseButtonsScrollView}>
        <Button 
          type='quartery'
          text='+ Create New Exercise'
          style={styles.addExerciseButton}
          onPress={() => {setIsAddExerciseModalVisible(true)}}
        />
        {exerciseButtons}
      </ScrollView>
    )
  }
  
  return (
    <PageWithTitle title='Saved Exercises'>
      <ExercisesRows />
      <StatusBar style="auto" />

      <AddEditExerciseModal 
        visible={isAddExerciseModalVisible}
        setVisible={setIsAddExerciseModalVisible}
        appStateManipulators={appStateManipulators}
      />
    </PageWithTitle>
  );
}

const styles = StyleSheet.create({
  exerciseButtonsScrollView: {
    paddingHorizontal: 10
  },

  addExerciseButton: {
    marginBottom: 10
  }

});
