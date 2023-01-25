import { useState, useEffect, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import placeholders from '../../placeholders';
import { getAllWorkouts, setCurrentWorkout } from '../../store';

import PageWithTitle from "../../components/PageWithTitle";
import Button from "../../components/Button";




export default function SelectWorkout({navigation, appState, appStateManipulators}) {

    const WorkoutsButtons = () => {
        return Object.keys(appState.workouts).map(id => {
            return <Button 
                        text={appState.workouts[id].name} 
                        key={id} 
                        style={styles.buttonStyle} 
                        type='secondary'
                        onPress={async () => {
                            const success = await appStateManipulators.setCurrentWorkout(id);
                            if (success) {
                                navigation.navigate(placeholders.pages.InProgressWorkout);
                            } else {
                                alert('Issue occured while selecting workout');
                            }
                        }}
                    />
        })
    }


    return (
        <PageWithTitle title='What Are We Working On?'>
            <View style={styles.buttonSection}>
                <ScrollView>
                    <Button 
                        text='+ Create a New Workout' 
                        type='quartery'
                        style={styles.buttonStyle}
                        onPress={() => navigation.navigate(placeholders.pages.CreateWorkOutPage)} 
                    />
                    <WorkoutsButtons />
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