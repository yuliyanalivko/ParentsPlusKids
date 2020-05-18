import React from "react";
import {Text, View, StyleSheet, Modal, Image, TouchableHighlight, ScrollView} from "react-native";

import styleVars from './../constants/Variables';
import colors from './../constants/Colors';
import commonStyles from './../constants/Styles';
import {GradientButton} from "./GradientButton";
import {LinearGradient} from "expo-linear-gradient";
import Input from "./Input";
import {TextButton} from "./TextButton";
import {validatePassword} from "../constants/Functions";

export class ChangePasswordDialog extends React.Component {
    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.state = {
            buttonTitle: this.props.buttonTitle ? this.props.buttonTitle : 'Подтвердить',
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            btnOpacity: .5
        }
    }

    onConfirm() {
        if (this.state.btnOpacity === 1) {
            let errorText = '';
            let errorOpacity = 0;
            if (this.state.oldPassword === '1') {
                errorText = 'Старый пароль введен неверно';
                errorOpacity = 1;
            }
            this.setState({
                errorOpacity: errorOpacity,
                errorText: errorText
            });
            this.props.onConfirm();
        }
    }

    updateState(field, value) {
        field === 'oldPassword' ? this.setState({oldPassword: value}) :
            field === 'newPassword' ? this.setState({newPassword: value}) :
                field === 'ConfirmPassword' ? this.setState({confirmPassword: value}) : 0;
        let errorText = '';
        let errorOpacity = 0;
        let btnOpacity = .5;
        if (this.state.newPassword && this.state.confirmPassword) {
            errorText = (this.state.newPassword !== this.state.confirmPassword) ?
                'Пароли должны совпадать' : !validatePassword(this.state.password) ?
                    'Пароль должен содержать хотя бы 8 символов' : '';
            errorOpacity = errorText === '' ? 0 : 1;
            btnOpacity = (this.state.oldPassword && errorText === '') ? 1 : .5;
            this.setState({
                errorText: errorText,
                errorOpacity: errorOpacity,
                btnOpacity: btnOpacity
            })
        }
    }

    render() {
        return (
            <Modal transparent={true}
                   visible={this.props.visible}>
                <View style={styles.dialogBackground}>

                    <View style={styles.dialogContainer}>

                        <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                                        locations={[0, 1]}
                                        colors={[colors.mainGradient.end, colors.mainGradient.start]}
                                        style={styles.gradient}>
                            <Text style={styles.title}>Изменение пароля</Text>
                        </LinearGradient>

                        <View style={styles.content}>
                            <Input label={'Старый пароль'}
                                   maxLength={50}
                                   onChangeText={(value) => this.updateState('oldPassword', value)}
                            />

                            <Input label={'Новый пароль'}
                                   maxLength={50}
                                   onChangeText={(value) => this.updateState('newPassword', value)}
                            />

                            <Input label={'Подтвердите новый пароль'}
                                   maxLength={50}
                                   onChangeText={(value) => this.updateState('ConfirmPassword', value)}
                            />

                            <Text style={[commonStyles.error,{opacity: this.state.errorOpacity}]}>
                                {this.state.errorText}</Text>

                            <View style={[styles.buttons, {opacity: this.state.btnOpacity}]}>
                                <TextButton title={'Отмена'} style={{width: 160}} color={colors.secondColor}
                                            onPress={this.props.onCancel}/>
                                <GradientButton title={'Ок'}
                                                onPress={this.onConfirm}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    dialogBackground: {...commonStyles.dialogBackground, ...{}},
    dialogContainer: {...commonStyles.dialogContainer, ...{padding: 0}},
    gradient: {...commonStyles.dialogGradient, ...{}},
    title: {...commonStyles.dialogTitle, ...{}},
    content: {...commonStyles.dialogContent},
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        marginTop: 16
    },
});
