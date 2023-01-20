import AsyncStorage from "@react-native-async-storage/async-storage";

import placeholders from "../placeholders";

export default async function hasInProgressWorkout() {
    const currentWorkout = await AsyncStorage.getItem(placeholders.storageKeys.currentWorkout);
    if (currentWorkout) {
        return true;
    } else {
        return false;
    }
}