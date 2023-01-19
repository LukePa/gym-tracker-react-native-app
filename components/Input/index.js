import React from "react";
import {View, TextInput, StyleSheet} from 'react-native';

import placeholders from "../../placeholders";

export default function Input({ placeholder, keyboardType, value, onChangeValue, style }) {
    const placeholderText = placeholder || '';
    const keyboardMode = keyboardType || 'default';

    return (
        <View style={[styles.container, style]}>
            <TextInput 
                style={styles.textInputStyle}
                value={value}
                onChangeText={onChangeValue}
                placeholder={placeholderText}
                placeholderTextColor={placeholders.colors.lightAccent.standard}
                keyboardType={keyboardMode}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0
    },

    textInputStyle: {
        backgroundColor: placeholders.colors.lightShade.standard,
        color: placeholders.colors.darkShade.standard,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        fontSize: 16
    }
});