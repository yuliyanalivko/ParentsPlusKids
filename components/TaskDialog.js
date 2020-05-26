import React, {Component} from "react";
import {Text, TouchableHighlight, View, StyleSheet, Modal, Image} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

import styleVars from './../constants/Variables';
import colors from './../constants/Colors';
import commonStyles from './../constants/Styles';
import {GradientButton} from "./GradientButton";

export const TaskDialog = props => {

    const gradient = colors.mainGradient;

    return (
        <Modal transparent={true}
               visible={props.visible}>
            <View style={styles.dialogBackground}>

                <View style={styles.dialogContainer}>
                    <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                                    locations={[0, 1]}
                                    colors={[gradient.end, gradient.start]}
                                    style={styles.gradient}>
                        <Text style={styles.title}>Задание</Text>
                        <TouchableHighlight underlayColor={'transparent'}
                                            onPress={props.onCancel}>
                            <Image style={styles.closeIcon}
                                   source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
                        </TouchableHighlight>
                    </LinearGradient>

                    <View style={styles.content}>
                        <Text style={styles.task}>{props.task.taskText}</Text>

                        <View style={styles.paramsBlock}>
                            <View style={styles.param}>
                                <Image style={styles.icon}
                                       source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
                                <Text style={styles.caption}>Баллы: </Text>
                                <Text style={styles.paramText}>{props.task.points}</Text>
                            </View>
                            <View style={styles.param}>
                                <Image style={styles.icon}
                                       source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
                                <Text style={styles.caption}>Время исполнения: </Text>
                                <Text style={styles.paramText}>{props.task.leadTime}</Text>
                            </View>
                        </View>

                        <View style={styles.buttons}>
                            <GradientButton title={'Добавить'}
                                            gradientColors={[colors.buttonGradient.start, colors.buttonGradient.end]}
                                            onPress={props.onAdd}/>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({

    dialogBackground: {...commonStyles.dialogBackground, ...{}},
    dialogContainer: {...commonStyles.dialogContainer, ...{}},
    gradient: {...commonStyles.dialogGradient, ...{}},
    title: {...commonStyles.dialogTitle, ...{}},
    closeIcon: {
        height: 36,
        width: 36,
    },
    content: {
        padding: styleVars.INNER_PADDING,
        alignSelf: 'stretch',
        borderBottomLeftRadius: styleVars.BORDER_RADIUS,
        borderBottomRightRadius: styleVars.BORDER_RADIUS,
    },
    task: {
        ...commonStyles.mainText, ...{}
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-evenly',
        marginTop: 24
    },
    buttonTitleStyle: {
        color: colors.secondColor,
        fontWeight: '700'
    },
    paramsBlock: {
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        marginTop: 14
    },
    param: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 20,
    },
    caption: {
        ...commonStyles.secondaryText, ...{
            marginRight: 4,
            fontSize: 14
        }

    },
    icon: {
        height: 16,
        width: 16,
        marginRight: 8
    },
    paramText: {
        ...commonStyles.secondaryText, ...{
            color: colors.mainText,
            fontSize: 14
        }
    }
});
