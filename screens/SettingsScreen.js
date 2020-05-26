import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    TouchableHighlight,
    AsyncStorage,
    TextInput, ActivityIndicator
} from "react-native";
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
import {InputDialog} from "../components/InputDialog";

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
            isLoading: true,

            errorText: '',
            errorOpacity: 0,

            avatarDialogVisible: false,
            closeDialogVisible: false,
            passwordDialogVisible: false
        };

    }


    handleCancel(field) {
        field === 'avatarDialogVisible' ? this.setState({avatarDialogVisible: false}) :
            field === 'closeDialogVisible' ? this.setState({closeDialogVisible: false}) :
                    field === 'passwordDialogVisible' ? this.setState({passwordDialogVisible: false}) : 0;
    }

    showDialog(field) {
        field === 'avatarDialogVisible' && this.state.userType === 'child' ? this.setState({avatarDialogVisible: true}) :
            field === 'closeDialogVisible' ? this.setState({closeDialogVisible: true}) :
                field === 'passwordDialogVisible' ? this.setState({passwordDialogVisible: true}) : 0;
    }

    handleConfirm(field) {
        if (field === 'avatarDialogVisible') {
            this.setState({avatarDialogVisible: false});
        } else if (field === 'closeDialogVisible') {
            this.setState({closeDialogVisible: false});
            AsyncStorage.removeItem('userId');
            AsyncStorage.removeItem('userName');
            AsyncStorage.removeItem('gender');
            AsyncStorage.removeItem('role');
            AsyncStorage.removeItem('userType');
            AsyncStorage.removeItem('parentId');
            AsyncStorage.removeItem('childId');
            this.props.navigation.navigate('Welcome');
        } else if (field === 'passwordDialogVisible') {
            this.setState({passwordDialogVisible: false})
        }
    }

    updateState(field, value) {
        field === 'name' ? this.setState({name: value}) :
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
        const errorText = this.state.name.length <= 0 ? 'Имя не может быть пустым' :
            validateEmail(this.state.email) ? '' : 'Email введен неверно';
        this.setState({
            errorText: errorText,
            errorOpacity: errorText === '' ? 0 : 1
        });
        if (errorText === '') {
            const _storeData = async () => {
                try {
                    console.log(this.state.name);
                    //Прописать здесь изменение в бд и если все ок занести изменения в AsyncStorage
                    await AsyncStorage.setItem('email', this.state.email);
                    await AsyncStorage.setItem('userName', this.state.name);
                    await AsyncStorage.setItem('gender', this.state.gender);
                    await AsyncStorage.setItem('role', this.state.role);
                } catch (e) {
                    console.log('SettingsScreen handleSave error');
                }
            };
            _storeData();
            this.props.navigation.goBack();
        }
    }

    componentDidMount = async () => {
        let name = '', gender = 'Женский', role = 'Мама', email = '', userType;
        try {
            const userName = await AsyncStorage.getItem('userName')
                .then(value => name = value);
            const userEmail = await AsyncStorage.getItem('email')
                .then(value => email = value);
            const userGender = await AsyncStorage.getItem('gender')
                .then(value => gender = value);
            const userRole = await AsyncStorage.getItem('role')
                .then(value => role = value);
            const type = await AsyncStorage.getItem('userType')
                .then(value => userType = value);
            console.log(name + ' ' + email + ' ' + gender + ' ' + role + ' ' + userType);
            if (name !== null && gender !== null && email !== null) {

                this.setState({
                    isLoading: false,
                    email: email,
                    gender: gender,
                    role: role,
                    name: name,
                    userType: userType
                })
            }
        } catch (error) {
            console.log('SettingsScreen componentDidMount error');
        }
    };


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, marginTop: '30%'}}>
                    {console.log('loading')}
                    <ActivityIndicator color={colors.activeColor} size={'large'}/>
                </View>
            )
        }
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
                            <Input value={this.state.name} inputStyle={styles.name}
                                   multiline maxLength={50}
                                   onChangeText={(value) => this.updateState('name', value)}/>
                        </View>
                    </View>
                    <Dropdown label='Пол'
                              value={this.state.gender}
                              data={[{value: 'Мужской'}, {value: 'Женский'}]}
                              textColor={colors.mainText}
                              baseColor={colors.secondColor}
                              fontSize={16}
                              selectedItemColor={colors.mainText}
                              disabledItemColor={colors.secondColor}
                              containerStyle={{
                                  width: '100%',
                                  paddingBottom: 28
                              }}
                              onChangeText={(value) => this.updateState('gender', value)}
                    />
                    {/*<Dropdown label='Роль'
                              value={this.state.role}
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
                              onChangeText={(value) => this.updateState('role', value)}
                    />*/}
                    <Input label={'Электронная почта'}
                           value={this.state.email}
                           autoCompleteType={'email'}
                           onChangeText={(value) => this.updateState('email', value)}/>

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
