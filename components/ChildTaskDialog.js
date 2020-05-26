import React, {Component} from "react";
import {Text, View, StyleSheet, Modal, Image, TouchableHighlight} from "react-native";


import styleVars from './../constants/Variables';
import colors from './../constants/Colors';
import commonStyles from './../constants/Styles';
import {GradientButton} from "./GradientButton";
import {LinearGradient} from "expo-linear-gradient";
import {TextButton} from "./TextButton";

export default class ChildTaskDialog extends Component {

    constructor(props) {
        super(props);
        this.gradient = this.props.gradient ? this.props.gradient : colors.mainGradient;
    }

    render() {
        const {task} = this.props.task;
        return (
            <Modal transparent={true}
                   visible={this.props.visible}>
                <View style={styles.dialogBackground}>

                    <View style={styles.dialogContainer}>

                        <LinearGradient start={{x: 0.49, y: 0.0}} end={{x: 0.51, y: 1.0}}
                                        locations={[0, 1]}
                                        colors={[this.gradient.end, this.gradient.start]}
                                        style={styles.gradient}>
                            <View style={styles.header}>
                                <View style={styles.user}>
                                    <Image style={styles.userImg}
                                           source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
                                    <View>
                                        <Text style={styles.parentName}>{this.props.task.parentName}</Text>
                                        <Text style={styles.date}>{this.props.task.date.substring(0,10)}</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableHighlight underlayColor={'transparent'}
                                                onPress={this.props.onCancel}>
                                <Image style={styles.closeIcon}
                                       source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
                            </TouchableHighlight>
                        </LinearGradient>

                        <View style={styles.content}>
                            <Text style={styles.task}>{this.props.task.taskText}</Text>

                            <View style={styles.paramsLine}>
                                <View style={styles.param}>
                                    <Image style={styles.icon}
                                           source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
                                    <Text style={styles.paramText}>{this.props.task.points}</Text>
                                </View>
                                {this.props.task.leadTime &&
                                <View style={styles.param}>
                                    <Image style={styles.icon}
                                           source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
                                    <Text style={styles.paramText}>{this.props.task.leadTime}</Text>
                                </View>
                                }
                                {this.props.task.monster &&
                                <View style={styles.param}>
                                    <Image style={styles.icon}
                                           source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
                                    <Text style={styles.paramText}>{this.props.task.monster}</Text>
                                </View>
                                }
                            </View>

                            <View style={styles.buttons}>
                               { console.log(this.props.task)}
                                {this.props.confirmButtonType === 'delete' &&
                                this.props.task.parentId === this.props.userId &&
                                <TextButton buttonColor={colors.RED_GRADIENT.end} title={'Удалить'}
                                            onPress={this.props.onConfirm}/>
                                }

                                {this.props.confirmButtonType === 'confirm' && this.props.userType === 'child' &&
                                <GradientButton title={'Подтвердить'}
                                                onPress={this.props.onConfirm}/>
                                }

                                {this.props.confirmButtonType === 'confirm' && this.props.userType === 'parent'
                                    && this.props.task.parentId === this.props.userId &&
                                <GradientButton title={'Подтвердить'}
                                                onPress={this.props.onConfirm}/>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    dialogBackground: {...commonStyles.dialogBackground,...{} },
    dialogContainer: {...commonStyles.dialogContainer,...{}},
    gradient: {...commonStyles.dialogGradient, ...{}},
    closeIcon: {
        height: 36,
        width: 36,
    },
    content: {...commonStyles.dialogContent,...{marginTop: 0}},
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between'
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImg: {...commonStyles.userIcon, ...{marginRight: 8} },
    parentName: {
        ...commonStyles.mainText, ...{
            fontSize: 16,
            color: '#fff'
        }
    },
    date: {
        ...commonStyles.secondaryText, ...{
            fontSize: 12,
            color: '#fff',
            lineHeight: 16
        }
    },
    task: {
        ...commonStyles.mainText, ...{
        }
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
    paramsLine: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 14
    },
    param: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 20,
    },
    icon: {
        height: 16,
        width: 16
    },
    paramText: {
        fontSize: 14,
        color: colors.secondColor,
        marginLeft: 8
    }
});
