import React from 'react';
import {Text, StyleSheet, View, Image, TouchableHighlight} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {GradientButton} from "./GradientButton";
import {QUESTION} from "../assets/images";
import {DONE} from "../assets/images";
import {PENDING} from "../assets/images";
import {CROSS} from "../assets/images";

import styleVars from './../constants/Variables';
import colors from "./../constants/Colors";
import commonStyles from "./../constants/Styles";
import ChildTaskDialog from "./ChildTaskDialog";

class ChildTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: this.props.task.status,
            gradient: (this.props.task.status === 'pending') ? colors.mainGradient
                : (this.props.task.status === 'unconfirmed') ? colors.BLUE_GRADIENT
                    : (this.props.task.status === 'completed') ? colors.GREEN_GRADIENT
                        : colors.RED_GRADIENT,
            confirmButtonType: (this.props.userType === 'parent' && this.props.task.status === 'pending') ? 'delete'
                : (this.props.userType === 'parent' && this.props.task.status === 'unconfirmed'
                    || this.props.userType === 'child' && this.props.task.status === 'pending') ? 'confirm'
                    : null,
            icon: (this.props.task.status === 'pending') ? PENDING
                : (this.props.task.status === 'unconfirmed') ? QUESTION
                    : (this.props.task.status === 'completed') ? DONE
                        : CROSS,

            dialogVisible: false,

            leadTime: (this.props.task.leadTime === 1) ? this.props.task.leadTime + ' день' :
                (this.props.task.leadTime >= 2 && this.props.task.leadTime <= 4) ? this.props.task.leadTime + ' дня' :
                    this.props.task.leadTime + ' дней'
        }
    }

    confirmTask() {
        if (this.props.user === 'parent') {
            this.setState({
                status: 'done',
                icon: DONE,
                gradient: colors.GREEN_GRADIENT
            });
        }
        if (this.props.user === 'child') {
            this.setState({
                status: 'unconfirmed',
                icon: QUESTION,
                gradient: colors.BLUE_GRADIENT
            });
        }
    }

    showDlg() {
        this.setState({
            dialogVisible: true
        })
    }

    handleCancel() {
        this.setState({
            dialogVisible: false
        })
    }

    handleConfirm() {
        this.setState({
                dialogVisible: false
            }
        );
        if (this.state.confirmButtonType === 'confirm') {
            this.confirmTask()
        }
        if (this.state.confirmButtonType === 'delete') {
            this.props.onDelete(this.props.id);
        }
    }

    render() {
        return (
            <TouchableHighlight underlayColor={'transparent'}
                                onPress={this.showDlg.bind(this)}>

                <View style={[styles.container, commonStyles.shadow, this.props.style]}>
                    <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                                    locations={[0, 1]}
                                    colors={[this.state.gradient.start, this.state.gradient.end]}
                                    style={styles.gradient}>
                        <Image
                            style={styles.icon}
                            source={this.state.icon}
                        />
                    </LinearGradient>
                    <View style={styles.taskContent}>
                        <Text style={styles.task}
                              numberOfLines={2}>
                            {this.props.task.taskText}</Text>
                        <View style={styles.dateButton}>
                            {(this.state.status === 'unconfirmed' && this.props.userType === 'parent'
                                && this.props.userId === this.props.task.parentId) &&
                            <GradientButton title={'Подтвердить'} style={styles.button}
                                            onPress={this.showDlg.bind(this)}/>}

                            {(this.state.status === 'pending' && this.props.userType === 'child') &&
                            <GradientButton title={'Выполнено'} style={styles.button}
                                            onPress={this.showDlg.bind(this)}/>}
                            <Text style={styles.date}>{this.props.task.date.substring(0,10)}</Text>
                        </View>
                    </View>

                    <ChildTaskDialog visible={this.state.dialogVisible}
                                     task={this.props.task}
                                     confirmButtonType={this.state.confirmButtonType}
                                     onCancel={this.handleCancel.bind(this)}
                                     onConfirm={this.handleConfirm.bind(this)}
                                     gradient={this.state.gradient}
                                     userId={this.props.userId}
                                     userType = {this.props.userType}

                    />
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...commonStyles.componentContainer, ...{
            flexDirection: 'row',
            minHeight: 94
        }
    },
    gradient: {
        width: 76,
        borderTopLeftRadius: styleVars.BORDER_RADIUS,
        borderBottomLeftRadius: styleVars.BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userImg: {
        width: 36,
        height: 36,
        margin: styleVars.INNER_PADDING
    },
    taskContent: {
        flexShrink: 1,
        padding: styleVars.INNER_PADDING,
        alignSelf: 'stretch',
        width: '100%',
        justifyContent: 'space-between'
    },
    task: {
        ...commonStyles.mainText, ...{
            alignSelf: 'stretch',
        }
    },
    dateButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10
    },
    date: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.secondColor,
        alignSelf: 'flex-end',
        marginLeft: 'auto',
    },
    icon: {
        height: 56,
        width: 56
    },

    dialogBackground: {
        flex: 1,
        width: '100%',
        backgroundColor: '#1c1e2eaa',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialogContainer: {
        backgroundColor: colors.bgColor,
        borderRadius: styleVars.BORDER_RADIUS,
        width: '90%',
        height: 'auto',
        padding: styleVars.INNER_PADDING,
        alignItems: 'center'
    },
    header: {
        ...commonStyles.mainText, ...{
            fontSize: 22,
            marginBottom: 16
        }
    },
    description: {
        ...commonStyles.secondaryText, ...{}
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-evenly',
        marginTop: 16
    },
    buttonTitleStyle: {
        color: colors.secondColor,
        fontWeight: '700'
    }
});

export default ChildTask;
