import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView, KeyboardAvoidingView, TouchableHighlight} from "react-native";
import {CloseHeader} from "../components/CloseHeader";
import Input from "../components/Input";
import {Dropdown} from "react-native-material-dropdown";
import {TextButton} from "../components/TextButton";
import {ChangeAvatarDialog} from "../components/ChangeAvatarDialog";
import {ConfirmDialog} from "../components/ConfirmDialog";
import {ChangePasswordDialog} from "../components/ChangePasswordDialog";

import styleVars from './../constants/Variables'
import commonStyles from './../constants/Styles';
import colors from "../constants/Colors";
import {validatePassword} from "../constants/Functions";
import {validateEmail} from "../constants/Functions";
import {ADD} from "../assets/images";

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

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.updateState = this.updateState.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showDialog = this.showDialog.bind(this);

        this.state = {
            userName: '',
            email: '',
            gender: '',
            role: '',
            errorText: '',
            errorOpacity: 0,

            avatarDialogVisible: false,
            closeDialogVisible: false,
            passwordDialogVisible: false
        }
    }

    handleCancel(field) {
        field === 'avatarDialogVisible' ? this.setState({avatarDialogVisible: false}) :
            field === 'closeDialogVisible' ? this.setState({closeDialogVisible: false}) :
                field === 'passwordDialogVisible' ? this.setState({passwordDialogVisible: false}) : 0;
    }

    showDialog(field) {
        field === 'avatarDialogVisible' ? this.setState({avatarDialogVisible: true}) :
            field === 'closeDialogVisible' ? this.setState({closeDialogVisible: true}) :
                field === 'passwordDialogVisible' ? this.setState({passwordDialogVisible: true}) : 0;
    }

    handleConfirm(field) {
        field === 'avatarDialogVisible' ? this.setState({avatarDialogVisible: false}) :
            field === 'closeDialogVisible' ? this.setState({closeDialogVisible: false}) :
                field === 'passwordDialogVisible' ? this.setState({passwordDialogVisible: false}) : 0;
        if (field === 'closeDialogVisible') {
            this.props.navigation.navigate('Welcome');
        }
    }

    updateState(field, value) {
        field === 'userName' ? this.setState({userName: value}) :
            field === 'email' ? this.setState({email: value}) :
                field === 'gender' ? this.setState({gender: value}) :
                    field === 'role' ? this.setState({role: value}) : 0;

        if (field === 'gender') {
            this.setState({
                role: value === 'Женский' ? FEMALE_ROLES[0].value : MALE_ROLES[0].value
            });
        }
    }

    handleSave() {
        const errorText = this.state.userName.length <= 0 ? 'Имя не может быть пустым' :
            validateEmail(this.state.email) ? '' : 'Email введен неверно';
        this.setState({
            errorText: errorText,
            errorOpacity: errorText === '' ? 0 : 1
        });
        if (errorText === '') {
            this.props.navigation.goBack();
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}
                                  behavior={"padding"}>
                <CloseHeader title={'Настройки'}
                             onClose={() => this.props.navigation.goBack()}
                             onSave={this.handleSave}/>
                <ScrollView contentContainerStyle={styles.scrollSection}>
                    <View style={styles.head}>
                        <TouchableHighlight underlayColor={'transparent'}
                                            onPress={() => this.showDialog('avatarDialogVisible')}>
                            <Image style={styles.img}
                                   source={ADD}/>
                        </TouchableHighlight>
                        <View style={styles.headText}>
                            <Input value={'Александра Александра'} inputStyle={styles.name}
                                   multiline maxLength={50}
                                   onChangeText={(value) =>this.updateState('userName', value)}/>
                        </View>
                    </View>
                    <Dropdown label='Пол'
                              value={'Женский'}
                              data={[{value: 'Мужской'}, {value: 'Женский'}]}
                              textColor={colors.mainText}
                              baseColor={colors.secondColor}
                              fontSize={16}
                              selectedItemColor={colors.mainText}
                              disabledItemColor={colors.secondColor}
                              containerStyle={{
                                  width: '100%'
                              }}
                              onChangeText={(value) =>this.updateState('gender', value)}
                    />
                    <Dropdown label='Роль'
                              value={'Мама'}
                              data={FEMALE_ROLES}
                              textColor={colors.mainText}
                              baseColor={colors.secondColor}
                              fontSize={16}
                              selectedItemColor={colors.mainText}
                              disabledItemColor={colors.secondColor}
                              containerStyle={{
                                  width: '100%',
                                  paddingBottom: 18
                              }}
                              onChangeText={(value) =>this.updateState('role', value)}
                    />
                    <Input label={'Электронная почта'} value={'Электронная почта'}
                           autoCompleteType={'email'}
                           onChangeText={(value) =>this.updateState('email', value)}/>

                    <Text style={{
                        color: colors.RED_GRADIENT.end,
                        opacity: this.state.errorOpacity,
                        alignSelf: 'flex-start',
                        marginBottom: 12,
                        marginTop: -28
                    }}>{this.state.errorText}</Text>

                    <View style={{marginTop: 30, alignItems: 'flex-start', width: '100%'}}>
                        <TextButton title={'Изменить пароль'}
                                    onPress={() => this.showDialog('passwordDialogVisible')}/>
                    </View>

                    <View style={{marginTop: 30, alignItems: 'flex-start', width: '100%'}}>
                        <TextButton title={'Выйти из аккаунта'}
                                    onPress={() => this.showDialog('closeDialogVisible')}/>
                    </View>
                </ScrollView>

                <ChangeAvatarDialog visible={this.state.avatarDialogVisible}
                                    onConfirm={() => this.handleConfirm('avatarDialogVisible')}/>

                <ConfirmDialog visible={this.state.closeDialogVisible}
                               title={'Выйти'}
                               text={'Вы уверены, что хотите выйти?'}
                               buttonTitle={'Выйти'}
                               onConfirm={() => this.handleConfirm('closeDialogVisible')}
                               onCancel={() => this.handleCancel('closeDialogVisible')}
                />
                <ChangePasswordDialog visible={this.state.passwordDialogVisible}
                                      onCancel={() => this.handleCancel('passwordDialogVisible')}
                                      onConfirm={() => this.handleConfirm('passwordDialogVisible')}/>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {...commonStyles.screenContainer, ...{}},
    scrollSection: {
        ...commonStyles.scrollSection, ...{
            marginTop: styleVars.COMPONENT_GAP,
        }
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        marginBottom: styleVars.COMPONENT_GAP * 2
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 60,
        marginRight: styleVars.SCREEN_PADDING_HORIZONTAL
    },
    headText: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: styleVars.COMPONENT_WIDTH - 80 - styleVars.SCREEN_PADDING_HORIZONTAL,
    },
    name: {
        borderColor: '#ffffffff',
        fontSize: 20
    }
});
