import React from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar, KeyboardAvoidingView} from "react-native";
import {GradientButton} from "../../components/GradientButton";
import Input from "../../components/Input";
import {CloseHeader} from "../../components/CloseHeader";

import colors from "../../constants/Colors";
import commonStyles from "../../constants/Styles";
import styleVars from "../../constants/Variables";
import {TextButton} from "../../components/TextButton";

export class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.setBtnOpacity = this.setBtnOpacity.bind(this);

        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);

        this.handleConfirm = this.handleConfirm.bind(this);
        this.state = {
            email: '',
            password: '',

            btnOpacity: .5,
            errorOpacity: 0
        }
    }

    setBtnOpacity() {

        const btnOpacity = (this.state.password && this.state.email) ? 1 : .5;

        this.setState({
            btnOpacity: btnOpacity
        })
    }

    updateEmail(value) {
        this.setState({email: value});
        this.setBtnOpacity();
    }

    updatePassword(value) {
        this.setState({password: value});
        this.setBtnOpacity();
    }

    handleConfirm() {
        if (this.state.btnOpacity === 1) {
            if (this.state.email === '1' || this.state.password === '1') {
                this.setState({errorOpacity: 1});
                return;
            }
            alert(
                'email: ' + this.state.email + '\n' + 'password: ' + this.state.password);
            this.props.navigation.navigate('ChildNavigator');

        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'}/>
                <CloseHeader onClose={() => this.props.navigation.goBack()}/>
                <ScrollView contentContainerStyle={styles.scrollSection}>
                    <Text style={styles.title}>Вход</Text>

                    <Input label={'Электронная почта'} autoCompleteType={'email'}
                           textContentType={'emailAddress'} maxLength={254}
                           onChangeText={this.updateEmail}/>

                    <Input label={'Пароль'} secureTextEntry={true} password={true}
                           onChangeText={this.updatePassword}/>

                    <View style={{
                        opacity: this.state.btnOpacity,
                        marginBottom: 18,
                    }}>
                        <GradientButton title={'Войти'}
                                        onPress={this.handleConfirm}
                        />
                    </View>

                    <TextButton title={'Забыли пароль?'} color={colors.thirdColor}
                                onPress={() => this.props.navigation.navigate('PasswordRecovery')}/>

                    <Text style={[commonStyles.error,{opacity: this.state.errorOpacity, marginTop:16}]}>
                        Вы ввели неправильный логин или пароль. Попробуйте еще раз</Text>

                    <View style={{
                        position: "absolute",
                        bottom: styleVars.HEADER_HEIGHT
                    }}>
                        <TextButton title={'Нет аккаунта? Зарегистрируйтесь!'}
                                    onPress={() => this.props.navigation.navigate('EnterCode')}/>
                    </View>
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
