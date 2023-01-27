import {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import placeholders from '../../placeholders';

import PageWithTitle from '../../components/PageWithTitle';
import Button from '../../components/Button';
import AreYouSureModal from '../../components/AreYouSureModal';
import AddEditExerciseModal from '../../components/AddEditExerciseModal';



export default function InProgressWorkout({navigation, appState, appStateManipulators}) {
    const [editExerciseModalVisible, setEditExerciseModalVisible] = useState(false);
    const [exerciseToEdit, setExerciseToEdit] = useState(appState.currentWorkout.exercises[0]);
    const [areYouSureFinishVisible, setAreYouSureFinishVisible] = useState(false);

    if (!appState.currentWorkout) {
        navigation.navigate(placeholders.pages.HomePage);
        return <></>
    }
    

    const exerciseButtons = appState.currentWorkout.exercises.map(exercise => {
        return (
            <Button 
                key={exercise.id} 
                text={appState.exercises[exercise.id].name}
                type='secondary'
                style={styles.exerciseButton}
                onPress={() => {
                    setExerciseToEdit(exercise.id);
                    setEditExerciseModalVisible(true);
                }}
            />
        )
    })

    return (
        <>
        <PageWithTitle title={appState.currentWorkout.name} titleMarginTop={40} titleMarginBotton={10}> 
            <View style={styles.pageBody} >
                <Button 
                    text='Finish Workout' 
                    type='quartery' 
                    onPress={() => setAreYouSureFinishVisible(true)}
                />
                <View style={styles.exercisesContainer}>
                <ScrollView>
                    {exerciseButtons}
                </ScrollView>
                </View>
            </View>


            <AreYouSureModal 
                visible={areYouSureFinishVisible} 
                setVisible={setAreYouSureFinishVisible}
                confirmFunction={async () => {
                    await appStateManipulators.setCurrentWorkout(null);
                    navigation.navigate(placeholders.pages.HomePage);
                }}
                />
        </PageWithTitle>

        <AddEditExerciseModal 
            appState={appState}
            appStateManipulators={appStateManipulators}
            exerciseID={exerciseToEdit}
            visible={editExerciseModalVisible} 
            setVisible={setEditExerciseModalVisible}
        />
        </>
    )
}

const styles = StyleSheet.create({
    page: {
        marginTop: 20
    },

    pageBody: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 10
    },

    exercisesContainer: {
        flex: 1,
        backgroundColor: placeholders.colors.lightAccent.standard,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5
    },

    exerciseButton: {
        marginBottom: 5
    }
});