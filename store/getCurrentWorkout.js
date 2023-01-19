import AsyncStorage from "@react-native-async-storage/async-storage";
import placeholders from "../placeholders";

export default async function getCurrentWorkout() {
    try {
        const currentWorkoutId = await AsyncStorage.getItem(placeholders.storageKeys.currentWorkout);
        if (!currentWorkoutId) {
            return null;
        }

        const allWorkouts = JSON.parse(await AsyncStorage.getItem(placeholders.storageKeys.workouts));
        
        if (Object.keys(allWorkouts).includes(currentWorkoutId)) {
            return allWorkouts[currentWorkoutId];
        }

        return false;
    } catch (e) {
        return false;
    }
}