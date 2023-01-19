import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import placeholders from '../../placeholders';
import { createExercise } from '../../store';

import PageWithTitle from '../../components/PageWithTitle';
import Input from '../../components/Input';
import Button from '../../components/Button';


export default function CreateExercise({ navigation }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [units, setUnits] = useState('');

  const onFormSubmit = async () => {
    try{
      if (name && amount && units) {
        const success = await createExercise({name, amount, units})
        if (success) {
          navigation.replace(placeholders.pages.ViewExercisesPage);
        } else {
          alert('Exercise creation failed')
        }
      } else {
        alert('Please fill in all missing values')
      }
    } catch (e) {
      console.log(e.message)
    }
    
  }

  return (
    <PageWithTitle title='Lets Create An Exercise!!'>
      <View style={styles.formContainer}>
        <Input 
          keyboardType='default'
          placeholder='Exercise Name'
          value={name}
          onChangeValue={setName}
          style={styles.nameInput}
        />
        <View style={styles.measurementFieldsContainer}>
          <Input 
            keyboardType='numeric' 
            placeholder='Starting Amount' 
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
          navigation.navigate(placeholders.pages.HomePage);
        }}/>
        <Button text='Save' style={styles.button} type='primary' onPress={onFormSubmit}/>
      </View>
      <StatusBar style="auto" />
    </PageWithTitle>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'flex-start',
    flex: 0,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 300,
  }, 

  nameInput: {
    marginBottom: 20,
    flex: 0
  },

  measurementFieldsContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  amountInput: {
    flex: 1,
    marginRight: 20
  },

  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 50,
    justifyContent: 'space-between',
    padding: 20,
  },

  button: {
    width: '45%',
  }
});
