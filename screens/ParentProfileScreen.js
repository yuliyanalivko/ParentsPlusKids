import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, StatusBar, Text, Modal, AsyncStorage, ActivityIndicator} from "react-native";

import {TitleHeader} from "./../components/TitleHeader";
import {SectionHeader} from "./../components/SectionHeader";
import {DayQuestion} from "../components/DayQuestion";
import {GradientButton} from "../components/GradientButton";
import {Member} from "../components/Member";

import commonStyles from './../constants/Styles';
import styleVars from './../constants/Variables';
import colors from "../constants/Colors";


export class ParentProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.navigateToChild = this.navigateToChild.bind(this);
        this.getUserParams = this.getUserParams.bind(this);
        this.state = {
            isLoading: true,
            dialogVisible: false,
            FAMILY: [],
            QUESTIONS: [],
        }
    }

    navigateToChild = (childId) => {
        try {
            AsyncStorage.setItem('childId', childId.toString());
        } catch (error) {
            console.log('ParentProfileScreen navigateChild error')
        }
        this.props.navigation.navigate('Child');
    };

    getUserParams = async () => {
        try {
            const userId = AsyncStorage.getItem('userId')
                .then((value) => {
                    fetch(`http://10.0.2.2:9000/users/${value}`)
                        .then(response => response.json())
                        .then(user => {
                            console.log(user);
                            try {
                                AsyncStorage.setItem('userName', user.name);
                                AsyncStorage.setItem('gender', user.gender);
                                AsyncStorage.setItem('role', user.role);
                            } catch (e) {
                                console.log('ParentProfileScreen getUsersParams(fetch) error')
                            }
                        })
                });
        } catch (error) {
            console.log('ParentProfileScreen getUsersParams error')
        }
    };

    componentDidMount = async () => {
        try {
            AsyncStorage.removeItem('childId');
        } catch (error) {
            console.log('ParentProfileScreen componentDidMount(removeItem) error')
        }
        this.getUserParams();
        console.log('getParams');
        let questionsBuf=[];
        try {
            const userId = await AsyncStorage.getItem('userId')
                .then((value) => {
                    const day = new Date().getDate();
                    const month = new Date().getMonth() + 1;
                    const year = new Date().getFullYear();
                    const date = year + '-' + month + '-' + day;
                    fetch(`http://10.0.2.2:9000/dayquestions/${value}/${date}`)
                        .then(response => response.json())
                        .then(questions => questionsBuf=questions)
                });
            const familyId = await AsyncStorage.getItem('familyId')
                .then((value) => {
                    fetch(`http://10.0.2.2:9000/familymembers/${value}`)
                        .then(response => response.json())
                        .then(users => {
                            const userId = AsyncStorage.getItem('userId')
                                .then(userId => {
                                    const family = users.filter(user => user.id !== parseInt(userId));
                                    console.log('q: '+questionsBuf);
                                    this.setState({
                                        FAMILY: family,
                                        isLoading: false,
                                        QUESTIONS: questionsBuf
                                    });
                                })
                        })

                });
        } catch (error) {
            console.log('ParentProfileScreen componentDidMount error')
        }
    };

    render() {
        if(this.state.isLoading){
            return (
                <View style={{flex: 1, marginTop: '30%'}}>
                    {console.log('loading')}
                    <ActivityIndicator color={colors.activeColor} size={'large'}/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                {console.log('render screen')}
                <StatusBar barStyle={'dark-content'} backgroundColor='#fff'/>
                <TitleHeader title='МОЙ АККАУНТ'
                             onPress={() => this.props.navigation.navigate('Settings')}/>

                <ScrollView contentContainerStyle={styles.scrollSection}>
                    <SectionHeader title={'Вопрос дня'}
                                   imgUri={'https://reactnative.dev/img/tiny_logo.png'}/>

                    {this.state.QUESTIONS.length > 0 &&
                    this.state.QUESTIONS.map(item => (
                        <DayQuestion question={item.question}
                                     answer={item.answer}
                                     editable={item.answer === null}/>
                    ))}
                    {this.state.QUESTIONS.length <= 0 &&
                    <Text style={commonStyles.emptyContentText}>Список вопросов пуст</Text>
                    }
                    <View style={styles.section}>
                        <SectionHeader title={'Семья'}
                                       icon={'add'}
                                       onPressIcon={() => this.setState({dialogVisible: true})}/>
                        <ScrollView horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    style={{
                                        marginRight: -styleVars.SCREEN_PADDING_HORIZONTAL,
                                        marginBottom: styleVars.COMPONENT_GAP
                                    }}>
                            {this.state.FAMILY.length > 0 &&
                            this.state.FAMILY.map(item => (
                                <Member id={item.id}
                                        name={item.name}
                                        onPress={() => this.navigateToChild(item.id)}/>
                            ))}
                            {this.state.FAMILY.length <= 0 &&
                            <Text style={commonStyles.emptyContentText}>Список пуст</Text>}
                        </ScrollView>
                    </View>
                </ScrollView>
                <AddMemberDialog visible={this.state.dialogVisible}
                                 onConfirm={() => this.setState({dialogVisible: false})}/>
            </View>
        );
    }
};

const AddMemberDialog = props => {
    const [code, setCode] = useState(null);

    async function getCode() {
        console.log('getCode');
        try {
            const familyId = await AsyncStorage.getItem('familyId')
                .then((value) => {
                    fetch(`http://10.0.2.2:9000/familycode/${value}`)
                        .then(response => response.json())
                        .then(value => setCode(value.code))
                });
        } catch (error) {
            console.log('ParentProfileScreen getCode error')
        }
    }

    useEffect(() => {
        getCode();
    }, [1]);

    return (
        <Modal transparent={true}
               visible={props.visible}>
            {console.log('render dialog')}
            <View style={styles.dialogBackground}>
                <View style={styles.dialogContainer}>
                    <Text style={styles.title}>
                        Поделитесь этим кодом с членом Вашей семьи, чтобы он мог присоединиться к Вам!</Text>
                    <Text style={styles.text}>{code}</Text>
                    <GradientButton title={'Ок'} onPress={props.onConfirm}/>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {...commonStyles.screenContainer, ...{}},
    scrollSection: {
        ...commonStyles.scrollSection, ...{
            paddingTop: 0
        }
    },

    dialogBackground: {...commonStyles.dialogBackground, ...{}},
    dialogContainer: {
        ...commonStyles.dialogContainer, ...{
            padding: styleVars.INNER_PADDING
        }
    },
    title: {
        ...commonStyles.mainText, ...{
            color: colors.secondColor,
            textAlign: 'center',
            marginBottom: 20
        }
    },
    text: {
        ...commonStyles.mainText, ...{
            fontSize: 28,
            lineHeight: 30,
            marginBottom: 20
        }
    }
});
