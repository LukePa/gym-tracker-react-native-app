import {Modal, View, Text, StyleSheet, Platform, NativeModules} from 'react-native';
const { StatusBarManager } = NativeModules;

import placeholders from '../../placeholders';

import Button from '../Button';


export default function AreYouSureModal({cancelButtonText, confirmButtonText, bodyText, setVisible, visible, confirmFunction}) {

    return (
        <Modal
            animationType='slide'
            visible={visible}
            onRequestClose={() => setVisible(false)}
            transparent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalContainer}>
                    <Text style={styles.bodyTextStyle}>{bodyText ? bodyText : 'Are you sure?'}</Text>
                    <View style={styles.buttonSection}>
                        <Button
                            text={cancelButtonText ? cancelButtonText : 'No'}
                            type='tertiary'
                            onPress={() => setVisible(false)}
                            style={styles.buttonStyle}
                        />
                        <Button 
                            text={confirmButtonText ? confirmButtonText : 'Yes'}
                            type='primary'
                            onPress={async () => {
                                await confirmFunction();
                                setVisible(false);
                            }}
                            style={styles.buttonStyle}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT
    },

    modalContainer: {
        flex: 0,
        backgroundColor: placeholders.colors.darkShade.standard,
        padding: 20, 
        marginHorizontal: 15,
        borderRadius: 20,
        elevation: 20
    },

    bodyTextStyle: {
        color: placeholders.colors.lightShade.standard,
        fontSize: 18,
        marginBottom: 20
    },
    
    buttonSection: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    buttonStyle: {
        paddingHorizontal: 20
    }
})