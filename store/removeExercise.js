import AsyncStorage from "@react-native-async-storage/async-storage";

import placeholders from "../placeholders";

export default async function removeExercise(uuid) {
    try {
        const exercises = JSON.parse(await AsyncStorage.getItem(placeholders.storageKeys.exercises));
        delete exercises[uuid];
        await AsyncStorage.setItem(placeholders.storageKeys.exercises, JSON.stringify(exercises));
        return true;
    } catch(e) {
        return false;
    }
}