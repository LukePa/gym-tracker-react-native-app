import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import placeholders from '../../placeholders';

import PageWithTitle from '../../components/PageWithTitle';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SelectExerciseModal from '../../components/SelectExerciseModal';

export default function CreateWorkout({navigation, appState, appStateManipulators}) {
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [selectExerciseModalVisible, setSelectExerciseModalVisible] = useState(false);

  const ExercisesButtons = () => {
    return exercises.map((id) => {
      return <Button 
                key={id} 
                text={appState.exercises[id].name} 
                type='primary'
                style={styles.exerciseButton}
                onPress={() => {
                  const exercisesCopy = exercises;
                  const exerciseIndex = exercisesCopy.indexOf(id);
                  if (exerciseIndex !== -1) {
                    exercisesCopy.splice(exerciseIndex, 1);
                    setExercises([...exercisesCopy]);
                  }
                }}
              />
    })
  }

  const onPressSave = async () => {
    if (name === '') {
      alert('Please enter a name for the workout');
      return;
    }
    if (exercises.length === 0) {
      alert('At least one exercise must be added');
      return;
    }

    const success = await appStateManipulators.setWorkout({name, exercises});
    if (success === true) {
      navigation.navigate(placeholders.pages.HomePage);
      return true;
    } else {
      alert('Workout creation failed');
      return false;
    }
  }

  return (
    <PageWithTitle title='Lets Create A Workout!!' titleMarginTop={80} titleMarginBotton={40}>
      <View style={styles.pageBodyContainer}>
        <Input 
          placeholder='Workout name' 
          value={name} 
          style={styles.nameInput}
          onChangeValue={(value) => setName(value)}
        />

        <Button type='secondary' text='+ Add An Exercise' onPress={() => setSelectExerciseModalVisible(true)} />
        <View style={styles.exercisesContainer}>
          <ScrollView persistentScrollbar={true}>
            <Text style={styles.removeExerciseInstructionText}>EXERCISES (press to remove)</Text>
            <ExercisesButtons />
          </ScrollView>
        </View>

        <View style={styles.buttonSection}>
          <Button 
            text='Cancel' 
            type='quartery' 
            style={styles.buttonSectionButton} 
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Button 
            text='Save' 
            type='primary' 
            style={styles.buttonSectionButton} 
            onPress={onPressSave}
          />
        </View>

      </View>
      <StatusBar style="auto" />

      <SelectExerciseModal 
        visible={selectExerciseModalVisible} 
        setVisible={setSelectExerciseModalVisible} 
        appState={appState}
        appStateManipulators={appStateManipulators}
        onSelectCallback={(id) => {
          if (!exercises.includes(id)){
            setExercises([...exercises, id])
          }
        }}
      />
    </PageWithTitle>
  );
}

const styles = StyleSheet.create({
  pageBodyContainer: {
    flex: 1,
    marginHorizontal: 10
  },

  nameInput: {
    marginBottom: 20
  },

  exercisesContainer: {
    flex: 1,
    backgroundColor: placeholders.colors.lightAccent.standard,
    marginBottom: 10,
    marginTop: 2,
    borderRadius: 5,
    padding: 10
  },

  removeExerciseInstructionText: {
    color: placeholders.colors.lightShade.standard,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center'
  },

  exerciseButton: {
    marginBottom: 5,
    marginRight: 10
  },

  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 5
  },

  buttonSectionButton : {
    paddingHorizontal: 40
  }
});
