import { useState, useEffect, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet} from 'react-native';

import placeholders from '../../placeholders';
import { getAllExercises } from '../../store';

import PageWithTitle from '../../components/PageWithTitle';
import Button from '../../components/Button';
import AddEditExerciseModal from '../../components/AddEditExerciseModal';

import ExerciseRow from './ExerciseRow';


export default function ViewExercises({navigation}) {
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState(null);
  const [isAddExerciseModalVisible, setIsAddExerciseModalVisible] = useState(false);

  const getAndSetExercises = async () => {
    setLoading(true);
    const res = await getAllExercises();
    if (res === false) {
      alert('Issue occured while getting saved exercises');
      navigation.navigate(placeholders.pages.HomePage);
      return;
    } else if (res === null) {
      setExercises({});
    } else {
      setExercises(res);
    }
    setLoading(false);
  }

  const renderExercises = () => {
    const exerciseButtons = Object.keys(exercises).map((exerciseID) => {
      return (
        <ExerciseRow exercises={exercises} exerciseID={exerciseID} getAndSetExercises={getAndSetExercises} key={exerciseID}/>
      )
    })

    return (
      <ScrollView style={styles.exerciseButtonsScrollView}>
        <Button 
          type='quartery'
          text='+ Create New Exercise'
          style={styles.addExerciseButton}
          onPress={() => {setIsAddExerciseModalVisible(true)}}
        />
        {exerciseButtons}
      </ScrollView>
    )
  }

  useLayoutEffect(() => {
    getAndSetExercises();
  }, [])
  
  return (
    <PageWithTitle title='Saved Exercises'>
      {!loading ? renderExercises() : null}
      <StatusBar style="auto" />

      <AddEditExerciseModal 
        visible={isAddExerciseModalVisible}
        setVisible={setIsAddExerciseModalVisible}
        confirmCallback={async () => {
          await getAndSetExercises();
        }}
      />
    </PageWithTitle>
  );
}

const styles = StyleSheet.create({
  exerciseButtonsScrollView: {
    paddingHorizontal: 10
  },

  addExerciseButton: {
    marginBottom: 10
  }

});
