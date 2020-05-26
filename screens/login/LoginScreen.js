import React from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar, KeyboardAvoidingView} from "react-native";
import {GradientButton} from "../../components/GradientButton";
import Input from "../../components/Input";
import {CloseHeader} from "../../components/CloseHeader";

import colors from "../../constants/Colors";
import commonStyles from "../../constants/Styles";
import styleVars from "../../constants/Variables";
import {TextButton} from "../../components/TextButton";

import {AsyncStorage} from 'react-native';

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
                                const _storeData = async () => {
                                    try {
                                       await AsyncStorage.setItem('userId', json.userId.toString());
                                        await AsyncStorage.setItem('email', json.email);
                                        await AsyncStorage.setItem('userType', json.userType);
                                        await AsyncStorage.setItem('familyId', json.familyId.toString());
                                    } catch (e) {
                                        console.log('LoginScreen handleConfirm error')
                                    }
                                };
                                _storeData();

                                if (json.userType === 'parent') {
                                    this.props.navigation.navigate('ParentNavigator')
                                } else if (json.userType === 'child') {
                                    this.props.navigation.navigate('ChildNavigator')
                                }
                                return;
                            }
                        }
                        this.setState({
                            errorOpacity: 1
                        })
                    }
                )
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
                                        width={styleVars.COMPONENT_WIDTH}
                                        onPress={this.handleConfirm}
                        />
                    </View>

                    <TextButton title={'Забыли пароль?'} color={colors.secondColor}
                                onPress={() => this.props.navigation.navigate('PasswordRecovery')}/>

                    <Text style={[commonStyles.error, {opacity: this.state.errorOpacity, marginTop: 16}]}>
                        Вы ввели неправильный логин или пароль. Попробуйте еще раз</Text>

                    <View style={{
                        position: "absolute",
                        bottom: styleVars.HEADER_HEIGHT
                    }}>
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
