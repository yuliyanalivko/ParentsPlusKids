import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    StatusBar,
    SectionList,
    Text,
    AsyncStorage,
    ActivityIndicator
} from "react-native";
import {SectionHeader} from "./../components/SectionHeader";
import {DayQuestion} from "../components/DayQuestion";
import ChildTaskList from "../components/ChildTaskList";

import commonStyles from "./../constants/Styles";
import styleVars from './../constants/Variables';
import colors from "../constants/Colors";
import {InputDialog} from "../components/InputDialog";
import {TitleHeader} from "../components/TitleHeader";

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

class ChildTasksScreen extends React.Component {
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

    handleConfirm() {
    }

    componentDidMount = async () => {
        let questionsBuf = [], currentTasksBuf = [], prevTasksBuf = [], userIdBuf;
        try {
            const userId = AsyncStorage.getItem('userId')
                .then(async (value) => {
                    userIdBuf = parseInt(value);
                    const day = new Date().getDate();
                    const month = new Date().getMonth() + 1;
                    const year = new Date().getFullYear();
                    const date = year + '-0' + month + '-' + day;
                    await fetch(`http://10.0.2.2:9000/dayquestions/${value}/${date}`)
                        .then(response => response.json())
                        .then(questions => {
                            questions = questions.filter(user => user.id !== parseInt(userId));
                            questionsBuf = questions;
                        });
                    await fetch(`http://10.0.2.2:9000/childtasks/${value}/`)
                        .then(response => response.json())
                        .then(childTasks => {
                            prevTasksBuf = childTasks.filter(task => task.status === 'completed' || task.status === 'failed');
                            currentTasksBuf = childTasks.filter(task => task.status === 'pending' || task.status === 'unconfirmed');
                        });

                    this.setState({
                        QUESTIONS: questionsBuf,
                        CURRENT_TASKS: currentTasksBuf,
                        PREVIOUS_TASKS: prevTasksBuf,
                        isLoading: false,
                        userId: userIdBuf
                    })
                });
        } catch (error) {
            // Error retrieving data
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
            <View style={[styles.container, this.props.style]}>
                <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
                <TitleHeader title={'МОИ ЗАДАНИЯ'}
                             onPress={() => this.props.navigation.navigate('Settings')}/>

                <ScrollView contentContainerStyle={styles.scrollSection}>
                    <View style={styles.section}>
                        <SectionHeader title={'Вопрос дня'}/>
                        {this.state.QUESTIONS.length > 0 &&
                        this.state.QUESTIONS.map(item => (
                            <DayQuestion question={item.question}
                                         answer={item.answer}
                                         isAnswered={item.isAnswered}
                                         toAnswer={!item.isAnswered}
                            />
                        ))}
                        {this.state.QUESTIONS.length <= 0 &&
                        <Text style={commonStyles.emptyContentText}>Список вопросов пуст</Text>}

                        <ChildTaskList data={this.state.CURRENT_TASKS} sectionTitle={'Текущие'}
                                       onDelete={this.onDelete}
                                       userType={'child'}
                                       userId={this.state.userId}
                        />
                        <ChildTaskList data={this.state.PREVIOUS_TASKS} sectionTitle={'Ранее'}
                                       userType={'child'}
                                       userId={this.state.userId}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {...commonStyles.screenContainer, ...{}},
    scrollSection: {
        ...commonStyles.scrollSection, ...{}
    },
    section: {
        alignSelf: 'stretch',
        paddingBottom: styleVars.SCREEN_PADDING_HORIZONTAL,
        margin: -styleVars.SCREEN_PADDING_HORIZONTAL
    }
});
export default ChildTasksScreen;
