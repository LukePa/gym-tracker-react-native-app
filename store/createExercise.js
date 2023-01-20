import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

import placeholders from "../placeholders";


export default async function createExercise({name, amount, units}) {
    try {
        const uuidString = uuid.v4();
        const exerciseObject = {};
        exerciseObject[uuidString] = {name, amount, units};

        await AsyncStorage.mergeItem(placeholders.storageKeys.exercises, JSON.stringify(exerciseObject));
        return true;
    } catch (e) {
        return false;
    } 
}