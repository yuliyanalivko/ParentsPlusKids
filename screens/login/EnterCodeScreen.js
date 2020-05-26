import React from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar, KeyboardAvoidingView} from "react-native";
import {GradientButton} from "../../components/GradientButton";
import Input from "../../components/Input";
import {CloseHeader} from "../../components/CloseHeader";

import commonStyles from "../../constants/Styles";
import styleVars from "../../constants/Variables";
import colors from "../../constants/Colors";
import {TextButton} from "../../components/TextButton";


export class EnterCodeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.setBtnOpacity = this.setBtnOpacity.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.state = {
            code: '',

            step: 1,

            btnOpacity: .5,
            errorOpacity: 0,
            errorText: ''
        }
    }

    setBtnOpacity() {
        this.setState({
            btnOpacity: this.state.code.length > 0 ? 1 : .5
        })

    }

    updateState(value) {
        this.setState({code: value});
        this.setBtnOpacity();
    }

    handleConfirm() {
        if (this.state.btnOpacity === 1) {
            fetch(`http://10.0.2.2:9000/family/${this.state.code}`)
                .then(response => response.json())
                .then(family => {
                    console.log(family);
                    for (const key in family) {
                        if (family.hasOwnProperty(key)) {
                            this.props.navigation.navigate('Registration',
                                {
                                    familyId: family.id,
                                    userType: this.props.route.params.userType
                                });
                            return;
                        }
                    }

                    this.setState({
                        errorText: 'Код неверен',
                        errorOpacity: 1
                    });
                });

        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'}/>
                <CloseHeader onClose={() => this.props.navigation.goBack()}/>
                <ScrollView contentContainerStyle={styles.scrollSection}>

                    <Text style={styles.title}>Введите код</Text>

                    <Input label={'Код'} maxLength={254}
                           onChangeText={(code) => this.updateState(code)}/>

                    <View style={{opacity: this.state.btnOpacity}}>
                        <GradientButton title={'Далее'}
                                        width={styleVars.COMPONENT_WIDTH}
                                        onPress={this.handleConfirm}/>
                    </View>

                    <Text style={[commonStyles.error, {opacity: this.state.errorOpacity, marginTop: 16}]}>
                        {this.state.errorText}</Text>

                    {this.props.route.params.userType === 'parent' &&
                    <TextButton title={'Зарегистрироваться без кода'}
                                onPress={() => this.props.navigation.navigate('Registration', {userType: 'parent'})}/>
                    }

                    <View style={{
                        position: "absolute",
                        bottom: styleVars.HEADER_HEIGHT
                    }}>
                        <TextButton title={'У меня уже есть аккаунт'}
                                    color={colors.secondColor}
                                    onPress={() => this.props.navigation.navigate('Login')}/>
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
