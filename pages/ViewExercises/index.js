import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, StyleSheet} from 'react-native';

import placeholders from '../../placeholders';

import PageWithTitle from '../../components/PageWithTitle';
import Button from '../../components/Button';
import AddEditExerciseModal from '../../components/AddEditExerciseModal';
import AreYouSureModal from '../../components/AreYouSureModal';


export default function ViewExercises({navigation, appState, appStateManipulators}) {
  const [exerciseToEdit, setExerciseToEdit] = useState(null);
  const [isAddEditExerciseModalVisible, setIsAddEditExerciseModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);


    const exerciseButtons = Object.keys(appState.exercises).map((exerciseID) => {
      return (
          <View key={exerciseID} style={styles.exerciseButtonRow}>
            <Button 
              text={appState.exercises[exerciseID].name} 
              type='tertiary' 
              style={styles.exerciseButton} 
              onPress={() => {
                setExerciseToEdit(exerciseID);
                setIsAddEditExerciseModalVisible(true);
              }}
            />
            <Button 
              text='x'
              type='secondary'
              style={styles.removeExerciseButton}
              onPress={() => {
                setExerciseToEdit(exerciseID)
                setIsDeleteModalVisible(true);
              }}
            />
          </View>
      )
    })

  
  return (
    <PageWithTitle title='Saved Exercises'>
      <ScrollView style={styles.exerciseButtonsScrollView}>
        <Button 
          type='quartery'
          text='+ Create New Exercise'
          style={styles.addExerciseButton}
          onPress={() => {
            setExerciseToEdit(null);
            setIsAddEditExerciseModalVisible(true);
          }}
        />
        {exerciseButtons}
      </ScrollView>
      <StatusBar style="auto" />

      <AddEditExerciseModal 
        exerciseID={exerciseToEdit}
        visible={isAddEditExerciseModalVisible}
        setVisible={setIsAddEditExerciseModalVisible}
        appState={appState}
        appStateManipulators={appStateManipulators}
      />
      <AreYouSureModal 
            visible={isDeleteModalVisible}
            setVisible={setIsDeleteModalVisible}
            cancelButtonText='No'
            confirmButtonText='Yes'
            bodyText={`Are you sure you want to delete ${appState.exercises[exerciseToEdit] ? appState.exercises[exerciseToEdit].name : 'this exercise'}?`}
            confirmFunction={async () => {
                await appStateManipulators.removeExercise(exerciseToEdit);
            }}
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
  },

  exerciseButtonRow: {
    marginBottom: 10,
    flexDirection: 'row'
  },

  exerciseButton: {
      flex: 1
  },

  removeExerciseButton: {
      paddingHorizontal: 10
  }

});
