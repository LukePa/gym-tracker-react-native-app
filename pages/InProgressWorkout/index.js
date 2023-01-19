import {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import placeholders from '../../placeholders';
import { getCurrentWorkout, getAllExercises } from '../../store';

import PageWithTitle from '../../components/PageWithTitle';

export default function InProgressWorkout({navigation}) {
    const [workout, setWorkout] = useState(null);
    const [exercises, setExercises] = useState(null);

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
        <PageWithTitle title={workout.name}> 

        </PageWithTitle>
    )
}