import React from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar, KeyboardAvoidingView} from "react-native";
import {GradientButton} from "../../components/GradientButton";
import Input from "../../components/Input";
import {CloseHeader} from "../../components/CloseHeader";

import colors from "../../constants/Colors";
import commonStyles from "../../constants/Styles";
import styleVars from "../../constants/Variables";
import {Dropdown} from "react-native-material-dropdown";
import {TextButton} from "../../components/TextButton";

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
            let errorText;
            let errorOpacity;
            errorText = this.state.code === '1'? 'Код неверен' : '';
            errorOpacity = errorText === '' ? 0 : 1;

            this.setState({
                errorText: errorText,
                errorOpacity: errorOpacity
            });
            if (errorText === ''){
                this.props.navigation.navigate('Registration')
            }
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
                           onChangeText={this.updateState}/>

                    <View style={{opacity: this.state.btnOpacity}}>
                        <GradientButton title={'Далее'}
                                        onPress={this.handleConfirm}/>
                    </View>

                    <Text style={[commonStyles.error,{opacity: this.state.errorOpacity, marginTop:16}]}>
                        {this.state.errorText}</Text>
                    <View style={{
                        position: "absolute",
                        bottom: styleVars.HEADER_HEIGHT
                    }}>
                        <TextButton title={'Зарегистрироваться без кода'}
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
