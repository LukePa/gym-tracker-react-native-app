import AsyncStorage from "@react-native-async-storage/async-storage";

import placeholders from "../placeholders";

export default async function getAllExercises() {
    try {
        return JSON.parse(await AsyncStorage.getItem(placeholders.storageKeys.exercises));
    } catch (e) {
        return false;
    }
} 