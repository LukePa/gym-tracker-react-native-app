import Checkbox from 'expo-checkbox';
import { StyleSheet, View } from 'react-native';

import placeholders from '../../placeholders';

export default function CheckboxButton({isChecked, setChecked}) {
    return (
        <View style={styles.checkboxContainer}>
            <Checkbox value={isChecked} onValueChange={setChecked} style={styles.checkbox}/>
        </View>
    )
} 



const styles = StyleSheet.create({
    checkboxContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: placeholders.colors.darkAccent.standard,
        borderRadius: 5,
        paddingHorizontal: 10
    },

    checkbox: {
        borderColor: placeholders.colors.darkAccent.standard,
        backgroundColor: placeholders.colors.lightShade.standard,
        width: 30,
        height: 30
    }
})