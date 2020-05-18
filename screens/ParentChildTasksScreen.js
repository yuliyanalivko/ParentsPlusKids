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

const CURRENT_TASKS = [
    {
        task: 'Говорить весь день комплименты другим',
        date: '19-04-2020',
        status: 'pending',
        id: '111',
        points: 1,
        leadTime: '1 день',
        monster: 'Леняш'
    },
    {
        task: 'Помыть посуду',
        date: '18-04-2020',
        status: 'unconfirmed',
        id: '222',
        points: 1,
        leadTime: '1 день',
        monster: 'Леняш'
    }
];

const PREVIOUS_TASKS = [
    {
        task: 'Самостоятельно собраться в школу и ничего не забыть вапрол рпав апрол орпав апролор прпеквапрорпа ввапрропава',
        date: '17-04-2020',
        status: 'completed',
        id: '333',
        points: 1,
        leadTime: '1 день',
        monster: 'Леняш'
    },
    {
        task: 'Нарисуй себя. Напиши, в чём твоя уникальность и суперсила и еще что-то там',
        date: '16-04-2020',
        status: 'failed',
        id: '444',
        points: 1,
        leadTime: '1 день',
        monster: 'Леняш'
    }
];

const TASK_SECTIONS = [
    {
        title: "Текущие",
        data: CURRENT_TASKS
    },
    {
        title: "Ранее",
        data: PREVIOUS_TASKS
    }
];

class ParentChildTasksScreen extends React.Component {
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

                        <ChildTaskList data={CURRENT_TASKS} sectionTitle={'Текущие'}
                                       onDelete={this.onDelete}
                                       navigation={this.props.navigation}
                                       user={'parent'}
                        />
                        <ChildTaskList data={PREVIOUS_TASKS} sectionTitle={'Ранее'}/>

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
    section: {
        alignSelf: 'stretch',
        width: styleVars.WINDOW_WIDTH,
        margin: -styleVars.SCREEN_PADDING_HORIZONTAL,
        paddingBottom: styleVars.SCREEN_PADDING_HORIZONTAL
    },
    sectionHeader: {
        marginTop: 24
    }
});
export default ParentChildTasksScreen;
