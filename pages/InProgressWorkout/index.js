import {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import placeholders from '../../placeholders';

import PageWithTitle from '../../components/PageWithTitle';
import Button from '../../components/Button';
import AreYouSureModal from '../../components/AreYouSureModal';
import AddEditExerciseModal from '../../components/AddEditExerciseModal';


const ExercisesScrollView = ({appState, appStateManipulators}) => {
    const [editExerciseModalVisible, setEditExerciseModalVisible] = useState(false);
    const [exerciseToEdit, setExerciseToEdit] = useState(Object.keys(appState.currentWorkout.exercises)[0]);
    console.log(appState.currentWorkout.exercises)
    const exerciseButtons = Object.keys(appState.currentWorkout.exercises).map(exercise => {
        return (
            <Button 
                key={exercise.id} 
                text={appState.exercises[exercise.id].name}
                type='secondary'
                style={exerciseScrollViewStyles.exerciseButton}
                onPress={() => {
                    setExerciseToEdit(exercise.id);
                    setEditExerciseModalVisible(true);
                }}
            />
        )
    })

    return (
        <ScrollView>
            {exerciseButtons}

            <AddEditExerciseModal 
                appState={appState}
                appStateManipulators={appStateManipulators}
                exerciseID={exerciseToEdit}
                visible={editExerciseModalVisible} 
                setVisible={setEditExerciseModalVisible}
            />
        </ScrollView>
    )
} 

const exerciseScrollViewStyles = StyleSheet.create({
    exerciseButton: {
        marginBottom: 5
    }
})




export default function InProgressWorkout({navigation, appState, appStateManipulators}) {
    const [areYouSureFinishVisible, setAreYouSureFinishVisible] = useState(false);

    
    if (!appState.currentWorkout) {
        navigation.navigate(placeholders.pages.HomePage);
        return <></>
    } 

    return (
        <PageWithTitle title={appState.currentWorkout.name} titleMarginTop={40} titleMarginBotton={10}> 
            <View style={styles.pageBody} >
                <Button 
                    text='Finish Workout' 
                    type='quartery' 
                    onPress={() => setAreYouSureFinishVisible(true)}
                />
                <View style={styles.exercisesContainer}>
                    <ExercisesScrollView appState={appState} appStateManipulators={appStateManipulators}/>
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
    }
});