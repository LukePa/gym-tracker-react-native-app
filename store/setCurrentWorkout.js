import AsyncStorage from "@react-native-async-storage/async-storage";

import placeholders from "../placeholders";

export default async function setCurrentWorkout(workoutId) {
    try {
        await AsyncStorage.setItem(placeholders.storageKeys.currentWorkout, workoutId);
        return true;
    } catch (e) {
        return false;
    }
}