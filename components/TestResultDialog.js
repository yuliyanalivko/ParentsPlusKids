import React from "react";
import {Text, View, StyleSheet, Modal, Image} from "react-native";
import {STAR} from "../assets/images";

import styleVars from './../constants/Variables';
import commonStyles from './../constants/Styles';
import {GradientButton} from "./GradientButton";

export const TestResultDialog = props => {
    return (
        <Modal transparent={true}
               visible={props.visible}>
            <View style={styles.dialogBackground}>

                <View style={styles.dialogContainer}>
                    <Image style={styles.img} source={STAR}/>
                    <Text style={styles.title}>{props.monster}</Text>
                    <Text style={styles.message}>{props.message}</Text>
                    <GradientButton title={'Ок'} onPress={props.onConfirm}/>
                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    dialogBackground: {...commonStyles.dialogBackground, ...{}},
    dialogContainer: {
        ...commonStyles.dialogContainer, ...{
            padding: styleVars.INNER_PADDING
        }
    },
    title: {
        ...commonStyles.mainText, ...{
            fontSize: 28,
            lineHeight: 30,
            marginTop: 2 * styleVars.COMPONENT_GAP,
            marginBottom: styleVars.COMPONENT_GAP
        }
    },
    img: {
        width: "70%",
        height: 200
    },
    message: {
        ...commonStyles.secondaryText, ...{
            fontSize: 16,
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: 2 * styleVars.COMPONENT_GAP
        }
    }
});
