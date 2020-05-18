import React from 'react';
import {StyleSheet, View, ScrollView, StatusBar, SectionList, Text} from "react-native";
import {SectionHeader} from "./../components/SectionHeader";
import {DayQuestion} from "../components/DayQuestion";
import ChildTask from "./../components/ChildTask";
import ChildTaskList from "../components/ChildTaskList";

import commonStyles from "./../constants/Styles";
import styleVars from './../constants/Variables';
import colors from "../constants/Colors";
import {GradientButton} from "../components/GradientButton";
import {InputDialog} from "../components/InputDialog";
import {BackHeader} from "../components/BackHeader";

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

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <StatusBar barStyle={'dark-content'} backgroundColor='#fff'/>

                <BackHeader name={'Мама'}
                            navigation={this.props.navigation}/>

                <ScrollView contentContainerStyle={styles.scrollSection}>
                    <View style={styles.section}>
                        <SectionHeader title={'Вопрос дня'}
                                       icon={'add'}
                                       onPressIcon={this.showDialog}/>
                        {QUESTIONS.length > 0 &&
                        QUESTIONS.map(item => (
                            <DayQuestion question={item.question}
                                         answer={item.answer}
                                         isAnswered={item.isAnswered}
                            />
                        ))
                        }
                        {QUESTIONS.length <= 0 &&
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
