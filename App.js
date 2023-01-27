import {useState, useEffect} from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import uuid from 'react-native-uuid';

import placeholders from './placeholders';
import { getAppState, saveAppState, wipeData } from './store';

import Home from './pages/Home';
import CreateWorkout from './pages/CreateWorkout';
import ViewExercises from './pages/ViewExercises';
import ViewWorkouts from './pages/ViewWorkouts';
import SelectWorkout from './pages/SelectWorkout';
import InProgressWorkout from './pages/InProgressWorkout';


const Stack = createStackNavigator ();

export default function App() {
  const [ appState, setAppState ] = useState(null);

  useEffect(() => {
    const asyncUseEffect = async () => {
      const retrievedState = await getAppState();
      setAppState(retrievedState)
    }

    try {
      asyncUseEffect();
    } catch(e) {
      console.log(e)
    }
    
  }, [])



  const appStateManipulators = {}

  appStateManipulators.setExercise = async ({id, name, amount, units}) => {
    try {
      if (!(name && amount && units)) {
        return false;
      }

      const exerciseID = (typeof id === 'string' && Object.keys(appState.exercises).includes(id)) ? id : uuid.v4();

      appState.exercises[exerciseID] = {name, amount, units};
      setAppState({...appState});
      await saveAppState(appState);
      return true;
    } catch (e) {
      return false;
    }
  }

  appStateManipulators.removeExercise = async (id) => {
    try {
      // Remove this exercise from any workouts containing it
      Object.keys(appState.workouts).forEach((workoutID) => {
        if (!appState.workouts[workoutID].exercises) {
          return;
        }

        const exerciseIndex = appState.workouts[workoutID].exercises.indexOf(id);
        if (exerciseIndex > -1) {
          appState.workouts[workoutID].exercises.splice(exerciseIndex, 1)
        }
      })

      delete appState.exercises[id];
      setAppState({...appState});
      await saveAppState(appState);
      return true;
    } catch (e) {
      console.log(e)
      return false;
    }
  }

  appStateManipulators.setWorkout = async ({id, name, exercises}) => {
    try {
      if (!(name && exercises) || exercises.length === 'undefined') {
        return false;
      }

      const workoutID = (typeof id === 'string' && Object.keys(appState.workouts).includes(id)) ? id : uuid.v4();
      appState.workouts[workoutID] = {name, exercises};
      setAppState({...appState});
      await saveAppState(appState);
      return true;
    } catch (e) {
      return false;
    }
  }

  appStateManipulators.setCurrentWorkout = async (id) => {
    try {
      let currentWorkout = {}

      if (id === null || id === undefined) {
        currentWorkout = null;
      } else if (!(typeof id === 'string' && appState.workouts[id] !== undefined)) {
        return false;
      } else {
        currentWorkout.name = appState.workouts[id].name;
        currentWorkout.exercises = appState.workouts[id].exercises.map(exercise => {
          return {id: exercise, checked: false}
        })
      }

      setAppState({...appState, currentWorkout});
      await saveAppState(appState);
      return true;
    } catch (e) {
      return false;
    }
  }

  appStateManipulators.resetData = async () => {
    try {
      await wipeData();
      const resetAppState = await getAppState();
      setAppState(resetAppState);
    } catch(e) {
      return false;
    }
  }



  if (appState === null) {
    return <Text>Loading...</Text>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={placeholders.pages.HomePage}>
          {(props) => <Home appState={appState} appStateManipulators={appStateManipulators} {...props} />}
        </Stack.Screen>
        <Stack.Screen name={placeholders.pages.CreateWorkOutPage}>
          {(props) => <CreateWorkout appState={appState} appStateManipulators={appStateManipulators} {...props} />}
        </Stack.Screen>
        <Stack.Screen name={placeholders.pages.ViewExercisesPage}>
          {(props) => <ViewExercises appState={appState} appStateManipulators={appStateManipulators} {...props} />}
        </Stack.Screen>
        <Stack.Screen name={placeholders.pages.ViewWorkoutsPage}>
          {(props) => <ViewWorkouts appState={appState} appStateManipulators={appStateManipulators} {...props} />}
        </Stack.Screen>
        <Stack.Screen name={placeholders.pages.SelectWorkoutPage}>
          {(props) => <SelectWorkout appState={appState} appStateManipulators={appStateManipulators} {...props} />}
        </Stack.Screen>
        <Stack.Screen name={placeholders.pages.InProgressWorkout}>
          {(props) => <InProgressWorkout appState={appState} appStateManipulators={appStateManipulators} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
