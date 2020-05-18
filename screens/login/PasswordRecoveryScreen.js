import React from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar, KeyboardAvoidingView} from "react-native";
import {GradientButton} from "../../components/GradientButton";
import Input from "../../components/Input";
import {CloseHeader} from "../../components/CloseHeader";

import colors from "../../constants/Colors";
import commonStyles from "../../constants/Styles";
import styleVars from "../../constants/Variables";
import {Dropdown} from "react-native-material-dropdown";

const FEMALE_ROLES = [
    {value: 'Мама'},
    {value: 'Бабушка'},
    {value: 'Сестра'},
    {value: 'Тетя'},
    {value: 'Другое'}
];

const MALE_ROLES = [
    {value: 'Папа'},
    {value: 'Дедушка'},
    {value: 'Брат'},
    {value: 'Дядя'},
    {value: 'Другое'}
];

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
                let step;
                errorText = (this.state.email === '1') ?
                    'Пользователь с таким адресом электронной почты не найден' : '';
                errorOpacity = errorText === '' ? 0 : 1;
                step = errorText === '' ? 2 : 1;
                btnOpacity = (step === 1) ? 1 : .5;

                const self = this;
                setTimeout(() => {
                    self.setState({
                        step: step,
                        errorText: errorText,
                        errorOpacity: errorOpacity,
                        btnOpacity: btnOpacity
                    });
                }, 1);


            }
            if (this.state.step === 2) {
                errorText = (this.state.password === '1') ? 'Неверный код' : '';
                errorOpacity = (errorText === '') ? 0 : 1;
                const self = this;
                setTimeout(() => {
                    self.setState({
                        errorText: errorText,
                        errorOpacity: errorOpacity,
                    });
                    if (errorText === '') {
                        alert('email: ' + this.state.email + '\n' +
                            'password: ' + this.state.password);
                        this.props.navigation.navigate('ChildNavigator');
                    }
                }, 1);
            }
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'}/>
                <CloseHeader onClose={() => this.props.navigation.goBack()}/>
                <ScrollView contentContainerStyle={styles.scrollSection}>

                    <Text style={styles.title}>{this.state.step === 1 ?
                        'Введите адрес вашей электронной почты' : 'Введите код'}</Text>

                    {this.state.step === 1 &&
                    <Input label={'Электронная почта'} autoCompleteType={'email'}
                           textContentType={'emailAddress'} maxLength={254}
                           onChangeText={this.updateState}/>}
                    {this.state.step === 2 &&
                    <Input label={'Пароль'} secureTextEntry={true} password={true}
                           onChangeText={this.updateState}/>}

                    <View style={{opacity: this.state.btnOpacity}}>
                        <GradientButton title={'Далее'}
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

const styles = StyleSheet.create({
    container: {...commonStyles.loginScreenContainer},
    scrollSection: {...commonStyles.loginScreenScrollSection },
    title: {...commonStyles.loginScreenTitle},
});
