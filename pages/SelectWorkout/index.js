import { useState, useEffect, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import placeholders from '../../placeholders';
import { getAllWorkouts, setCurrentWorkout } from '../../store';

import PageWithTitle from "../../components/PageWithTitle";
import Button from "../../components/Button";




export default function SelectWorkout({navigation}) {
    const [workouts, setWorkouts] = useState(null);

    const getAndSetWorkouts = async () => {
        const retrievedWorkouts = await getAllWorkouts();

        if (workouts === false) {
            alert('Issue occured while getting workouts');
            navigation.navigate(placeholders.pages.HomePage);
            return;
        }

        setWorkouts(retrievedWorkouts);
    }

    const renderWorkouts = () => {
        if (!workouts) {
            return null;
        }

        return Object.keys(workouts).map(id => {
            return <Button 
                        text={workouts[id].name} 
                        key={id} 
                        style={styles.buttonStyle} 
                        type='secondary'
                        onPress={async () => {
                            const res = await setCurrentWorkout(id);
                            if (res) {
                                navigation.navigate(placeholders.pages.InProgressWorkout);
                            } else {
                                alert('Issue occured while selecting workout');
                            }
                        }}
                    />
        })
    }


    useEffect(() => {
        getAndSetWorkouts();
    }, [])


    return (
        <PageWithTitle title='What Are We Working On?!'>
            <View style={styles.buttonSection}>
                <ScrollView>
                    <Button 
                        text='+ Create a New Workout' 
                        type='quartery'
                        style={styles.buttonStyle}
                        onPress={() => navigation.navigate(placeholders.pages.CreateWorkOutPage)} 
                    />
                    {renderWorkouts()}
                </ScrollView>
            </View>
        </PageWithTitle>
    )
}


const styles = StyleSheet.create({
    buttonSection: {
        flex: 1,
        paddingHorizontal: 20
    },

    buttonStyle: {
        marginBottom: 5
    },
})