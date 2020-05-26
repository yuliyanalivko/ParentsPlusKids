import React from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar, KeyboardAvoidingView} from "react-native";
import {GradientButton} from "../../components/GradientButton";
import Input from "../../components/Input";
import {CloseHeader} from "../../components/CloseHeader";
import {Dropdown} from "react-native-material-dropdown";

import colors from "../../constants/Colors";
import commonStyles from "../../constants/Styles";
import {validateEmail} from "../../constants/Functions";
import {validatePassword} from "../../constants/Functions";
import styleVars from "../../constants/Variables";

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

export class RegistrationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.setBtnOpacity = this.setBtnOpacity.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.state = {
            userName: '',
            email: '',
            gender: 'Женский',
            role: FEMALE_ROLES[0].value,
            password: '',
            confirmPassword: '',

            btnOpacity: .5,
            errorOpacity: 0,
            errorText: ''
        }
    }

    setBtnOpacity() {

        let errorOpacity = 0;
        let btnOpacity = .5;
        let errorText;
        if (this.state.password && this.state.confirmPassword) {
            errorText = (this.state.password !== this.state.confirmPassword) ? 'Пароли должны совпадать' :
                !validatePassword(this.state.password) ? 'Пароль должен содержать хотя бы 8 символов' : '';
            errorOpacity = (errorText === '') ? 0 : 1;
            btnOpacity = (this.state.userName && this.state.email)
            && (errorOpacity === 0) ? 1 : .5;
        }

        this.setState({
            errorText: errorText,
            errorOpacity: errorOpacity,
            btnOpacity: btnOpacity
        })
    }

    updateState(field, value) {
        field === 'userName' ? this.setState({userName: value}) :
            field === 'email' ? this.setState({email: value}) :
                field === 'gender' ? this.setState({gender: value}) :
                    field === 'role' ? this.setState({role: value}) :
                        field === 'password' ? this.setState({password: value}) :
                            field === 'confirmPassword' ? this.setState({confirmPassword: value}) : 0;

        if (field === 'gender' && this.props.route.params.userType==='parent') {
            this.setState({
                role: value === 'Женский' ? FEMALE_ROLES[0].value : MALE_ROLES[0].value
            });
        }
        this.setBtnOpacity()
    }

    handleConfirm() {
        if (this.state.btnOpacity === 1) {
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
                                errorText: 'Этот email уже используется',
                                errorOpacity: 1
                            });
                            return;
                        }
                    }
                    if (!validateEmail(this.state.email)) {
                        this.setState({
                            errorText: 'Email введен неверно',
                            errorOpacity: 1
                        });
                        return;
                    }
                    else {
                        alert('userName: ' + this.state.userName + '\n' +
                            'email: ' + this.state.email + '\n' +
                            'gender: ' + this.state.gender + '\n' +
                            'role: ' + this.state.role + '\n' +
                            'password: ' + this.state.password + '\n' +
                            'confirmPassword: ' + this.state.confirmPassword + '\n');
                        this.props.navigation.navigate('ChildNavigator');
                    }
                });
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'}/>
                <CloseHeader onClose={() => this.props.navigation.goBack()}/>
                <ScrollView contentContainerStyle={styles.scrollSection}>
                    <Text style={styles.title}>Регистрация</Text>

                    <Input label={'Имя'} maxLength={50}
                           onChangeText={(value) => this.updateState('userName', value)}/>
                    <Input label={'Электронная почта'} autoCompleteType={'email'}
                           textContentType={'emailAddress'} maxLength={254}
                           onChangeText={(value) => this.updateState('email', value)}/>
                    <Dropdown label='Пол'
                              value={'Женский'}
                              data={[{value: 'Мужской'}, {value: 'Женский'}]}
                              textColor={colors.mainText}
                              baseColor={colors.secondColor}
                              fontSize={16}
                              selectedItemColor={colors.mainText}
                              disabledItemColor={colors.secondColor}
                              containerStyle={{
                                  width: '100%',
                                  marginTop: -18,
                                  paddingBottom: 2
                              }}
                              onChangeText={(value) => this.updateState('gender', value)}
                    />
                    {this.props.route.params.userType === 'parent' &&
                    <Dropdown label='Роль'
                              value={this.state.gender === 'Женский' ? FEMALE_ROLES[0].value : MALE_ROLES[0].value}
                              data={this.state.gender === 'Женский' ? FEMALE_ROLES : MALE_ROLES}
                              textColor={colors.mainText}
                              baseColor={colors.secondColor}
                              fontSize={16}
                              selectedItemColor={colors.mainText}
                              disabledItemColor={colors.secondColor}
                              containerStyle={{
                                  width: '100%'
                              }}
                              onChangeText={(value) => this.updateState('role', value)}
                    />}
                    <Input label={'Пароль'} secureTextEntry={true} password={true}
                           onChangeText={(value) => this.updateState('password', value)}
                           style={{paddingTop: 20}}
                    />
                    <Input label={'Подтвердите пароль'} secureTextEntry={true} password={true}
                           onChangeText={(value) => this.updateState('confirmPassword', value)}/>

                    <Text style={[commonStyles.error, {opacity: this.state.errorOpacity}]}>
                        {this.state.errorText}</Text>

                    <View style={{
                        opacity: this.state.btnOpacity
                    }}>
                        <GradientButton title={'Зарегистрироваться'}
                                        width={styleVars.COMPONENT_WIDTH}
                                        onPress={this.handleConfirm}
                        />
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {...commonStyles.loginScreenContainer},
    scrollSection: {...commonStyles.loginScreenScrollSection},
    title: {...commonStyles.loginScreenTitle},
});
