export default function isValidAppState(appState) {
    if (!appState) {
        return false;
    }

    if (!(appState.exercises && typeof appState.exercises === 'object')) {
        return false;
    }

    if (!(appState.workouts && typeof appState.workouts === 'object')) {
        return false;
    }

    if (appState.currentWorkout === undefined) {
        return false;
    }

    return true;
}