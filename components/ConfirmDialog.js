import React from "react";
import {Text, View, StyleSheet, Modal} from "react-native";
import {GradientButton} from "./GradientButton";

import styleVars from './../constants/Variables';
import colors from './../constants/Colors';
import commonStyles from './../constants/Styles';
import {TextButton} from "./TextButton";

const DATA = [
    {
        id: 1,
        isSelected: true
    },
    {
        id: 2,
        isSelected: false
    },
    {
        id: 3,
        isSelected: false
    },
];

export const ConfirmDialog = props => {
    const buttonTitle = props.buttonTitle ? props.buttonTitle : "Подтвердить";
    const title = props.title ? props.title : "Подтверждение";
    const text = props.title ? props.text : "Подтвердите действие";
    return (
        <Modal transparent={true}
               visible={props.visible}>
            <View style={styles.dialogBackground}>

                <View style={styles.dialogContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.text}>{text}</Text>
                    <View style={styles.buttons}>
                        <TextButton title={'Отмена'} color={colors.secondColor}
                                    style={{width: 160}}  onPress={props.onCancel}/>
                        <GradientButton title={buttonTitle} onPress={props.onConfirm}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    dialogBackground: {...commonStyles.dialogBackground,...{} },
    dialogContainer: {...commonStyles.dialogContainer,...{}},
    title: {...commonStyles.dialogTitle, ...{}},
    text: {
        ...commonStyles.mainText, ...{
            marginTop: 12,
            color: colors.secondColor
        }
    },
    buttons: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 28
    }

});
