import { View, Text, StyleSheet } from 'react-native';

import placeholders from '../../placeholders';

export default function PageWithTitle({title, children, titleMarginTop, titleMarginBotton}) {
    if (typeof titleMarginTop !== 'number') {
        titleMarginTop = 140;
    }
    if (typeof titleMarginBotton !== 'number') {
        titleMarginBotton = 64
    }

    return (
        <View style={styles.container}>
            <View style={[styles.titleContainer, {marginBottom: titleMarginBotton, marginTop: titleMarginTop}]}>
                <View style={styles.titleTextContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: placeholders.colors.darkShade.standard,
        alignItems: 'stretch',
    },

    title: {
        color: placeholders.colors.lightShade.standard,
        fontSize: 28,
        fontWeight: 'bold',
      },
    
      titleTextContainer: {
        backgroundColor: placeholders.colors.main.standard,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        elevation: 5
      },
  
      titleContainer: {
        alignSelf: 'center'
      }
})