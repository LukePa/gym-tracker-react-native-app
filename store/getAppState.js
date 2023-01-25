import AsyncStorage from "@react-native-async-storage/async-storage";
import placeholders from "../placeholders";

export default async function getAppState() {
    const retrievedState = JSON.parse(await AsyncStorage.getItem(placeholders.storageKeys.appState));
    
    if (retrievedState === null) {
        const appState = {
            workouts: {},
            exercises: {},
            currentWorkout: null
        }
        
        AsyncStorage.setItem(placeholders.storageKeys.appState, JSON.stringify(appState));
        return appState
    }

    return retrievedState;   
}