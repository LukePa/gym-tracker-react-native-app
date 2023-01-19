import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';

import placeholders from './placeholders';

import Home from './pages/Home';
import CreateExercise from './pages/CreateExercise';
import CreateWorkout from './pages/CreateWorkout';
import ViewExercises from './pages/ViewExercises';
import ViewWorkouts from './pages/ViewWorkouts';
import SelectWorkout from './pages/SelectWorkout';
import InProgressWorkout from './pages/InProgressWorkout';


const Stack = createStackNavigator ();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={placeholders.pages.HomePage} component={Home} />
        <Stack.Screen name={placeholders.pages.CreateExercisePage} component={CreateExercise} />
        <Stack.Screen name={placeholders.pages.CreateWorkOutPage} component={CreateWorkout} />
        <Stack.Screen name={placeholders.pages.ViewExercisesPage} component={ViewExercises} />
        <Stack.Screen name={placeholders.pages.ViewWorkoutsPage} component={ViewWorkouts} />
        <Stack.Screen name={placeholders.pages.SelectWorkoutPage} component={SelectWorkout} />
        <Stack.Screen name={placeholders.pages.InProgressWorkout} component={InProgressWorkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
