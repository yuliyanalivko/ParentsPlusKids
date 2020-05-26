import React from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar, KeyboardAvoidingView, AsyncStorage} from "react-native";
import {GradientButton} from "../../components/GradientButton";
import Input from "../../components/Input";
import {CloseHeader} from "../../components/CloseHeader";

import colors from "../../constants/Colors";
import commonStyles from "../../constants/Styles";
import styleVars from "../../constants/Variables";

export class PasswordRecoveryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.setBtnOpacity = this.setBtnOpacity.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.state = {
            email: '',
            password: '',

            step: 1,

            btnOpacity: .5,
            errorOpacity: 0,
            errorText: ''
        }
    }

    setBtnOpacity() {
        const btnOpacity = (this.state.step === 1 && this.state.email.length >= 1) ? 1 :
            (this.state.step === 2 && this.state.password.length >= 1) ? 1 : .5;
        this.setState({
            btnOpacity: btnOpacity
        })
    }

    updateState(value) {
        if (this.state.step === 1) {
            this.setState({email: value});
        } else {
            this.setState({password: value})
        }
        this.setBtnOpacity();
    }

    handleConfirm() {
        if (this.state.btnOpacity === 1) {
            let errorOpacity;
            let errorText;
            let btnOpacity;

            if (this.state.step === 1) {
                const body = {email: this.state.email};
                fetch('http://10.0.2.2:9000/login', {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: {'Content-Type': 'application/json'},
                })
                    .then(res => res.json())
                    .then(json => {
                        for (const key in json) {
                            if (json.hasOwnProperty(key)) {
                                this.setState({
                                    step: 2,
                                    errorText: '',
                                    errorOpacity: 0
                                });
                                return;
                            }
                        }
                        this.setState({
                            errorText: 'Пользователь с таким адресом электронной почты не найден',
                            errorOpacity: 1
                        });
                    });
            }
            if (this.state.step === 2) {
                const body = {email: this.state.email, password: this.state.password};
                fetch('http://10.0.2.2:9000/login', {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: {'Content-Type': 'application/json'},
                })
                    .then(res => res.json())
                    .then(json => {
                        for (const key in json) {
                            if (json.hasOwnProperty(key)) {
                                this.props.navigation.navigate('ChildNavigator');
                                return;
                            }
                        }
                        this.setState({
                            errorText: 'Неверный пароль',
                            errorOpacity: 1
                        });
                    });
            }
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'}/>
                <CloseHeader onClose={() => this.props.navigation.goBack()}/>
                <ScrollView contentContainerStyle={styles.scrollSection}>

                    <Text style={styles.title}>{'Восстановление пароля'}</Text>

                    <Text style={styles.text}>
                        {this.state.step === 1 ? 'Введите ваш email' : 'Мы отправили пароль на Ваш email. Пожалуйста, введите его.'}
                    </Text>

                    {this.state.step === 1 &&
                    <Input label={'Электронная почта'} autoCompleteType={'email'}
                           textContentType={'emailAddress'} maxLength={254}
                           onChangeText={this.updateState}/>}
                    {this.state.step === 2 &&
                    <Input label={'Пароль'} secureTextEntry={true} password={true}
                           onChangeText={this.updateState}/>}

                    <View style={{opacity: this.state.btnOpacity}}>
                        <GradientButton title={'Далее'}
                                        width={styleVars.COMPONENT_WIDTH}
                                        onPress={this.handleConfirm}/>
                    </View>

                    <Text style={{
                        color: colors.RED_GRADIENT.end,
                        opacity: this.state.errorOpacity,
                        alignSelf: 'flex-start',
                        marginTop: 16
                    }}>{this.state.errorText}</Text>

                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const
    styles = StyleSheet.create({
        container: {...commonStyles.loginScreenContainer},
        scrollSection: {...commonStyles.loginScreenScrollSection},
        title: {...commonStyles.loginScreenTitle},
        text: {
            ...commonStyles.mainText, ...{
                marginBottom: 16,
                height: 48,
                width: '100%',
                justifyContent: 'flex-start'
            }
        }
    });
