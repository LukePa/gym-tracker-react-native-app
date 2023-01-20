import AsyncStorage from "@react-native-async-storage/async-storage";

import placeholders from "../placeholders";

export default async function removeCurrentWorkout() {
    await AsyncStorage.removeItem(placeholders.storageKeys.currentWorkout);
}