import {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import placeholders from '../../placeholders';
import { getCurrentWorkout, getAllExercises, removeCurrentWorkout } from '../../store';

import PageWithTitle from '../../components/PageWithTitle';
import Button from '../../components/Button';
import AreYouSureModal from '../../components/AreYouSureModal';
import AddEditExerciseModal from '../../components/AddEditExerciseModal';


const ExercisesScrollView = ({exercises, getAndSetExercises}) => {
    const [editExerciseVisible, setEditExerciseVisible] = useState(false);
    const [exerciseToEdit, setExerciseToEdit] = useState(Object.keys(exercises)[0]);

    const exerciseButtons = Object.keys(exercises).map(exerciseId => {
        return (
            <Button 
                key={exerciseId} 
                text={exercises[exerciseId].name}
                type='secondary'
                style={exerciseScrollViewStyles.exerciseButton}
                onPress={() => {
                    setExerciseToEdit(exerciseId);
                    setEditExerciseVisible(true);
                }}
            />
        )
    })

    return (
        <ScrollView>
            { exerciseButtons }

            <AddEditExerciseModal 
                editObject={{uuid: exerciseToEdit, exercises}} 
                visible={editExerciseVisible} 
                setVisible={setEditExerciseVisible}
                confirmCallback={getAndSetExercises}
            />
        </ScrollView>
    )
} 

const exerciseScrollViewStyles = StyleSheet.create({
    exerciseButton: {
        marginBottom: 5
    }
})




export default function InProgressWorkout({navigation}) {
    const [workout, setWorkout] = useState(null);
    const [exercises, setExercises] = useState(null);
    const [areYouSureFinishVisible, setAreYouSureFinishVisible] = useState(false);

    const getAndSetWorkout = async () => {
        const retrievedWorkout = await getCurrentWorkout();
        if (retrievedWorkout === false) {
            console.log(retrievedWorkout)
            alert('Something went wrong, navigating home');
            navigation.navigate(placeholders.pages.HomePage);
        } else if (retrievedWorkout === null) {
            alert("You shouldn't be on this page, please tell Luke if you see this");
            navigation.navigate(placeholders.pages.HomePage);
        } else {
            setWorkout(retrievedWorkout);
        }
    }

    const getAndSetExercises = async () => {
        const retrievedExercises = await getAllExercises();
        if (retrievedExercises === false) {
            alert('Something went wrong, navigating home');
            navigation.navigate(placeholders.pages.HomePage);
        } else if (retrievedExercises === null) {
            alert("You shouldn't be on this page, please tell Luke if you see this");
            navigation.navigate(placeholders.pages.HomePage);
        } else {
            setExercises(retrievedExercises);
        }
    }

    useEffect(() => {
        getAndSetWorkout();
        getAndSetExercises();
    }, [])

    
    if (!exercises || !workout) {
        return <PageWithTitle title='Loading Workout'></PageWithTitle>
    } 

    return (
        <PageWithTitle title={workout.name} titleMarginTop={40} titleMarginBotton={10}> 
            <View style={styles.pageBody} >
                <Button 
                    text='Finish Workout' 
                    type='quartery' 
                    onPress={() => setAreYouSureFinishVisible(true)}
                />
                <View style={styles.exercisesContainer}>
                    <ExercisesScrollView exercises={exercises} getAndSetExercises={getAndSetExercises}/>
                </View>
            </View>


            <AreYouSureModal 
                visible={areYouSureFinishVisible} 
                setVisible={setAreYouSureFinishVisible}
                confirmFunction={async () => {
                    await removeCurrentWorkout();
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