import { useState, useEffect } from 'react';
import {View, Modal, Text, StyleSheet, Platform, NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;

import placeholders from '../../placeholders';

import Button from '../Button';
import Input from '../Input';

export default function AddEditExerciseModal ({exerciseID, appState, appStateManipulators, visible, setVisible, confirmCallback}) {    
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [units, setUnits] = useState('');

    useEffect(() => {
        if (visible && exerciseID) {
            setName(appState.exercises[exerciseID].name);
            setAmount(appState.exercises[exerciseID].amount);
            setUnits(appState.exercises[exerciseID].units);
        } else if (visible) {
            setName('');
            setAmount('');
            setUnits('');
        }
    }, [visible])

    const onFormSubmit = async () => {
        try {
            if (!(name && amount && units)) {
                alert('Please fill in all fields');
                return;
            }

            const success = await appStateManipulators.setExercise({id: exerciseID, name, amount, units})
            if (success) {
                if (typeof confirmCallback === 'function') {
                    await confirmCallback();
                }

                setVisible(false);
            } else {
                alert(exerciseID ? 'Exercise edit failed' : 'Exercise creation failed');
            }
        } catch (e) {
            console.log(e.message);
        } 
    }

    return (
        <Modal
            animationType='slide'
            visible={visible}
            onRequestClose={() => setVisible(false)}
            transparent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{`${exerciseID ? 'Edit' : 'New'} Exercise`}</Text>
                    <View style={styles.formContainer}>
                        <Input 
                            keyboardType='default'
                            value={name}
                            onChangeValue={setName}
                            placeholder='Name'
                        />
                        <View style={styles.measurementFieldsContainer}>
                            <Input
                                keyboardType='numeric' 
                                placeholder={`${exerciseID ? '' : 'Starting '}Amount`} 
                                value={amount} 
                                onChangeValue={setAmount} 
                                style={styles.amountInput} 
                            />
                            <Input 
                                keyboardType='default' 
                                placeholder='Units' 
                                value={units}
                                onChangeValue={setUnits}
                                style={styles.input} 
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button text='Cancel' style={styles.button} type='tertiary' onPress={() => {
                            setVisible(false);
                        }}/>
                        <Button text='Save' style={styles.button} type='primary' onPress={onFormSubmit}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        marginBottom: Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT
    }, 

    modalContainer: {
        flex: 0,
        backgroundColor: placeholders.colors.darkShade.standard,
        padding: 20,
        elevation: 10,
        marginHorizontal: 15
    },

    title: {
        color: placeholders.colors.lightShade.standard,
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20
    },  

    formContainer: {
        marginBottom: 30
    },

    measurementFieldsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },

    amountInput: {
        flex: 1,
        marginRight: 20
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        paddingHorizontal: 20
    }

})