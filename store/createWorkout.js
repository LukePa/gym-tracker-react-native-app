import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

import placeholders from "../placeholders";


export default async function createWorkout({name, exercises}) {
    try {
        const uuidString = uuid.v4();
        const workoutObject = {};
        workoutObject[uuidString] = {name, exercises};

        await AsyncStorage.mergeItem(placeholders.storageKeys.workouts, JSON.stringify(workoutObject));
        return true;
    } catch (e) {
        return false;
    }
}