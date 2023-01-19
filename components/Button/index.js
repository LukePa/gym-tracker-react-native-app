import {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import placeholders from '../../placeholders'


const buttonTypes = {
    primary: {
        defaultBackground: placeholders.colors.main.standard,
        pressedBackground: placeholders.colors.lightShade.standard,
        defaultText: placeholders.colors.lightShade.standard,
        pressedText: placeholders.colors.darkAccent.standard,
        defaultBorder: placeholders.colors.main.standard,
        pressedBorder: placeholders.colors.lightShade.standard
    }, 

    secondary: {
        defaultBackground: placeholders.colors.darkAccent.standard,
        pressedBackground: placeholders.colors.main.standard,
        defaultText: placeholders.colors.lightShade.standard,
        pressedText: placeholders.colors.lightShade.standard,
        defaultBorder: placeholders.colors.darkAccent.standard,
        pressedBorder: placeholders.colors.main.standard
    },

    tertiary: {
        defaultBackground: placeholders.colors.lightAccent.standard,
        pressedBackground: placeholders.colors.darkAccent.standard,
        defaultText: placeholders.colors.lightShade.standard,
        pressedText: placeholders.colors.lightShade.standard,
        defaultBorder: placeholders.colors.lightAccent.standard,
        pressedBorder: placeholders.colors.darkAccent.standard
    },

    quartery: {
        defaultBackground: placeholders.colors.darkShade.standard,
        pressedBackground: placeholders.colors.lightAccent.standard,
        defaultText: placeholders.colors.lightShade.standard,
        pressedText: placeholders.colors.lightShade.standard,
        defaultBorder: placeholders.colors.lightShade.standard,
        pressedBorder: placeholders.colors.lightShade.standard
    }
}

export default function Button({text, onPress, onLongPress, type, style}) {
    const [isPressedIn, setIsPressedIn] = useState(false);

    const onPressIn = () => {
        setIsPressedIn(true);
    } 

    const onPressOut = () => {
        setIsPressedIn(false);
    }

    
    let colorScheme = {};
    if (type && Object.keys(buttonTypes).includes(type)) {
        colorScheme = buttonTypes[type];
    } else {
        colorScheme = buttonTypes.primary;
    }

    return (
        <Pressable 
            onPress={onPress} 
            onLongPress={onLongPress} 
            onPressIn={onPressIn} 
            onPressOut={onPressOut} 
            style={[style, styles.buttonContainer, {
                backgroundColor: colorScheme[isPressedIn ? 'pressedBackground' : 'defaultBackground'],
                borderColor: colorScheme[isPressedIn ? 'pressedBorder' : 'defaultBorder']
            }]}
        >
            <View style={styles.textContainer}>
                <Text style={[styles.text, {color: colorScheme[isPressedIn ? 'pressedText' : 'defaultText']}]}>
                    {text}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 18
    },  

    textContainer: {
        flex: 0,
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 20,
        paddingBottom: 20,
        margin: 0,
    },

    buttonContainer: {
        borderRadius: 4,
        borderWidth: 1,
        elevation: 6
    },    
});