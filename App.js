import {useState, useEffect} from 'react';
import { Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import uuid from 'react-native-uuid';

import placeholders from './placeholders';
import { getAppState, saveAppState, wipeData } from './store';
import { isValidAppState } from './utils/isValidAppState';

import Home from './pages/Home';
import CreateExercise from './pages/CreateExercise';
import CreateWorkout from './pages/CreateWorkout';
import ViewExercises from './pages/ViewExercises';
import ViewWorkouts from './pages/ViewWorkouts';
import SelectWorkout from './pages/SelectWorkout';
import InProgressWorkout from './pages/InProgressWorkout';


const Stack = createStackNavigator ();

export default function App() {
  const [ appState, setAppState ] = useState(null);

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
      delete appState.exercises[id];
      Object.keys(appState.workouts).forEach((workoutID) => {
        if (!appState.workouts[workoutID].exercises) {
          return;
        }

        const exerciseIndex = appState.workout[workoutID].exercises.includes(id);
        if (exerciseIndex > -1) {
          appState.workout[workoutID].exercises.splice(exerciseIndex, 1)
        }
      })

      setAppState({...appState});
      await saveAppState(appState);
      return true;
    } catch (e) {
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
      if (id === null || id === undefined) {
        appState.currentWorkout = null;
      } else if (!(typeof id === 'string' && appState.workouts[id] !== undefined)) {
        return false;
      } else {
        appState.currentWorkout = appState.workouts[id];
      }

      setAppState({...appState});
      await saveAppState(appState);
      return true;
    } catch (e) {
      return false;
    }
  }



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



  if (appState === null) {
    return <Text>Loading...</Text>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={placeholders.pages.HomePage}>
          {(props) => <Home appState={appState} appStateManipulators={appStateManipulators} {...props} />}
        </Stack.Screen>
        <Stack.Screen name={placeholders.pages.CreateExercisePage}>
          {props => <CreateExercise 
            appState={appState}
            appStateManipulators={appStateManipulators}
            {...props} 
          />}
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
