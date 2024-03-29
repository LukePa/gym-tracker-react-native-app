import { useState } from 'react';
import { Modal, View, Text, ScrollView, StyleSheet, Platform, NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;

import placeholders from '../../placeholders';

import Button from '../Button';
import AddEditExerciseModal from '../AddEditExerciseModal';


export default function SelectExerciseModal({visible, setVisible, onSelectCallback, appState, appStateManipulators}) {
    const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);

    const ExerciseButtons = () => {
        return Object.entries(appState.exercises).map(([id, exerciseInfo]) => {
            return (
                <Button 
                    key={id}
                    text={exerciseInfo.name} 
                    type='primary'
                    style={styles.exerciseButton}
                    onPress={async () => {
                        if (typeof onSelectCallback === 'function'){
                            await onSelectCallback(id);
                        }
                        setVisible(false);
                    }}
                />
            )
            
        })
    }

    return (
        <>
        <Modal
            animationType='slide'
            visible={visible}
            onRequestClose={() => setVisible(false)}
            transparent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalContainer}>
                    <View style={styles.exercisesContainer}>
                        <ScrollView persistentScrollbar={true} >
                            <Button text='+ Add New Exercise' type='secondary' style={styles.exerciseButton} onPress={() => {
                                setVisible(false);
                                setAddExerciseModalVisible(true);
                            }}/>
                            <ExerciseButtons />
                        </ScrollView>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button text='Cancel' type='quartery' onPress={() => {setVisible(false)}} />
                    </View>
                </View>
            </View>

            
        </Modal>

        <AddEditExerciseModal 
            visible={addExerciseModalVisible}
            setVisible={setAddExerciseModalVisible}
            appState={appState}
            appStateManipulators={appStateManipulators}
            confirmCallback={() => {
                setVisible(true);
            }}
            cancelCallback={() => {
                setVisible(true);
            }}
        />
        </>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        marginBottom: Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT
    },

    modalContainer: {
        flex: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: placeholders.colors.darkShade.standard,
        elevation: 5,
        height: '80%',
        width: '80%',
        borderRadius: 5
    },

    exercisesContainer: {
        flex: 0,
        height: '80%',
        width: '80%',
        backgroundColor: placeholders.colors.lightAccent.standard,
        padding: 10,
        marginTop: 20,
        borderRadius: 5
    },

    exerciseButton: {
        marginBottom: 5,
        marginRight: 5
    },  

    buttonContainer: {
        flex: 0,
        alignSelf: 'stretch',
        padding: 10
    }
})