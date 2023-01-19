
export default function isValidEditObject(editObject) {
    if (!editObject) {
        return true;
    }

    if (!(editObject.uuid && editObject.exercises)) {
        return false;
    }

    return true;
}