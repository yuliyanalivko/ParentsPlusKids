import React from 'react';
import {StyleSheet, View, ScrollView, StatusBar, Text, AsyncStorage, ActivityIndicator} from "react-native";
import {SectionHeader} from "./../components/SectionHeader";
import {DayQuestion} from "../components/DayQuestion";

import commonStyles from "./../constants/Styles";
import styleVars from './../constants/Variables';
import {InputDialog} from "../components/InputDialog";
import {BackHeader} from "../components/BackHeader";
import colors from "../constants/Colors";

const QUESTIONS = [
    {
        question: 'Это какой-то вопрос?',
        answer: null,
        isAnswered: false
    },
    {
        question: 'А это какой-то ну очень длинный вопрос?',
        answer: 'А это какой-то нууу очень-очень длинный ответ',
        isAnswered: true
    }
];

export class ChildParentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.state = {
            isLoading: true,
            dialogVisible: false
        }
    }

    showDialog() {
        this.setState(({
            dialogVisible: true
        }))
    }

    hideDialog() {
        this.setState(({
            dialogVisible: false
        }))
    }

    handleConfirm() {}

    componentDidMount = async () => {
        let questionsBuf = [], userIdBuf;
        try {
            const userId = AsyncStorage.getItem('userId')
                .then(async (value) => {
                    userIdBuf=parseInt(value);
                            const day = new Date().getDate();
                            const month = new Date().getMonth() + 1;
                            const year = new Date().getFullYear();
                            const date = year + '-0' + month + '-' + day;
                            await fetch(`http://10.0.2.2:9000/dayquestions/${this.props.route.params.parentId}/${date}`)
                                .then(response => response.json())
                                .then(questions => {
                                    questions = questions.filter(user => user.id !== parseInt(userId));
                                    questionsBuf = questions;
                                });

                            this.setState({
                                QUESTIONS: questionsBuf,
                                isLoading: false,
                                userId: userIdBuf})
                        });
        } catch (error) {
            // Error retrieving data
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
            <View style={[styles.container, this.props.style]}>
                <StatusBar barStyle={'dark-content'} backgroundColor='#fff'/>

                <BackHeader name={this.props.route.params.parentName}
                            navigation={this.props.navigation}/>

                <ScrollView contentContainerStyle={styles.scrollSection}>
                    <View style={styles.section}>
                        <SectionHeader title={'Вопрос дня'}
                                       icon={'add'}
                                       onPressIcon={this.showDialog}/>
                        {this.state.QUESTIONS.length > 0 &&
                        this.state.QUESTIONS.map(item => (
                            <DayQuestion question={item.question}
                                         answer={item.answer}
                                         isAnswered={item.isAnswered}
                            />
                        ))
                        }
                        {this.state.QUESTIONS.length <= 0 &&
                        <Text style={commonStyles.emptyContentText}>Список вопросов пуст</Text>
                        }

                        <InputDialog visible={this.state.dialogVisible}
                                     onCancel={this.hideDialog}
                                     onConfirm={this.handleConfirm}
                                     title={'Задать вопрос'}
                                     label={'Введите вопрос:'}
                                     buttonTitle={'Задать'}
                        />

                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {...commonStyles.screenContainer,...{} },
    scrollSection: {
        ...commonStyles.scrollSection, ...{
            width: styleVars.WINDOW_WIDTH
        }
    },
    flatList: {
        marginVertical: styleVars.COMPONENT_GAP
    },
    section: {
        alignSelf: 'stretch',
        width: styleVars.WINDOW_WIDTH,
        margin: -styleVars.SCREEN_PADDING_HORIZONTAL
    }
});
