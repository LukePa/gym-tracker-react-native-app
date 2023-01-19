import AsyncStorage from "@react-native-async-storage/async-storage";

import placeholders from "../placeholders";

export default async function getAllWorkouts() {
    try {
        return JSON.parse(await AsyncStorage.getItem(placeholders.storageKeys.workouts));
    } catch (e) {
        return false;
    }
}