import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { removeExercise } from '../../store';

import Button from '../../components/Button';
import AreYouSureModal from '../../components/AreYouSureModal';
import AddEditExerciseModal from '../../components/AddEditExerciseModal';


export default function ExerciseRow({exerciseID, appState, appStateManipulators}) {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    return (
        <View key={exerciseID} style={styles.exerciseButtonRow}>
          <Button 
            text={appState.exercises[exerciseID].name} 
            type='tertiary' 
            style={styles.exerciseButton} 
            onPress={() => {
              setIsEditModalVisible(true);
            }}
          />
          <Button 
            text='x'
            type='secondary'
            style={styles.removeExerciseButton}
            onPress={() => {
              setIsDeleteModalVisible(true);
            }}
          />

          <AddEditExerciseModal 
            visible={isEditModalVisible}
            setVisible={setIsEditModalVisible}
            exerciseID={exerciseID}
            appState={appState}
            appStateManipulators={appStateManipulators}
            confirmCallback={async () => {
              alert('Exercise edit Successful')
            }}
          />

          <AreYouSureModal 
            visible={isDeleteModalVisible}
            setVisible={setIsDeleteModalVisible}
            cancelButtonText='No'
            confirmButtonText='Yes'
            bodyText={`Are you sure you want to delete ${appState.exercises[exerciseID].name}?`}
            confirmFunction={async () => {
                await appStateManipulators.removeExercise(exerciseID);
            }}
          />
        </View>
    )
}

const styles = StyleSheet.create({
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
})