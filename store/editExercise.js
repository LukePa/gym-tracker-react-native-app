import AsyncStorage from "@react-native-async-storage/async-storage";

import placeholders from "../placeholders";


export default async function createExercise({uuid, name, amount, units}) {
    try {
        const exerciseObject = {};
        exerciseObject[uuid] = {name, amount, units};

        await AsyncStorage.mergeItem(placeholders.storageKeys.exercises, JSON.stringify(exerciseObject));
        return true;
    } catch (e) {
        return false;
    } 
}