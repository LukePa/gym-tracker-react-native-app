import AsyncStorage from "@react-native-async-storage/async-storage";
import placeholders from "../placeholders";
import isValidAppState from "../utils/isValidAppState";

export default async function saveAppState(newAppState) {
    if (!isValidAppState(newAppState)) {
        throw new Error('Invalid app state given when saving app state')
    }

    await AsyncStorage.setItem(placeholders.storageKeys.appState, JSON.stringify(newAppState));
    return true;
}