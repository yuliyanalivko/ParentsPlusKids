import React from 'react';
import {StyleSheet,
    View,
    ScrollView,
    StatusBar,
    Text,
    AsyncStorage,
    ActivityIndicator} from "react-native";
import {SectionHeader} from "./../components/SectionHeader";
import {DayQuestion} from "../components/DayQuestion";
import ChildTaskList from "../components/ChildTaskList";

import commonStyles from "./../constants/Styles";
import styleVars from './../constants/Variables';
import colors from './../constants/Colors';
import {InputDialog} from "../components/InputDialog";


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

class ParentChildTasksScreen extends React.Component {
    constructor(props) {
        super(props);
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.state = {
            isLoading: true,
            dialogVisible: false,
            QUESTIONS: [],
            CURRENT_TASKS: [],
            PREVIOUS_TASKS: []

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
        let questionsBuf = [], currentTasksBuf =[], prevTasksBuf =[], userIdBuf;
        try {
            const userId = AsyncStorage.getItem('userId')
                .then((value) => {
                    userIdBuf=parseInt(value);
                    const childId = AsyncStorage.getItem('childId')
                        .then(async(value) => {
                            this.setState({childId: value});
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
                                    currentTasksBuf = childTasks.filter(task => task.status === 'pending' || task.status === 'unconfirmed');;
                                });

                            this.setState({
                                QUESTIONS: questionsBuf,
                                CURRENT_TASKS: currentTasksBuf,
                                PREVIOUS_TASKS: prevTasksBuf,
                                isLoading: false,
                                userId: userIdBuf})
                        });
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
            <StatusBar barStyle={'dark-content'} backgroundColor='#fff'/>

            {console.log('loaded')}
            <ScrollView contentContainerStyle={styles.scrollSection}>
                <View style={styles.section}>
                    <SectionHeader title={'Вопрос дня'}
                                   icon={'add'}
                                   onPressIcon={this.showDialog}/>
                    {this.state.QUESTIONS.length > 0 &&
                    this.state.QUESTIONS.map(item => (
                        <DayQuestion question={item.question}
                                     answer={item.answer}
                                     editable={false}
                        />
                    ))
                    }
                    {this.state.QUESTIONS.length <= 0 &&
                    <Text style={commonStyles.emptyContentText}>Сегодня вопросов нет</Text>
                    }

                    <InputDialog visible={this.state.dialogVisible}
                                 onCancel={this.hideDialog}
                                 onConfirm={this.handleConfirm}
                                 title={'Задать вопрос'}
                                 label={'Введите вопрос:'}
                                 buttonTitle={'Задать'}
                    />

                    <ChildTaskList data={this.state.CURRENT_TASKS} sectionTitle={'Текущие'}
                                   onDelete={this.onDelete}
                                   navigation={this.props.navigation}
                                   childId={this.props.childId}
                                   userType={'parent'}
                                   userId={this.state.userId}
                    />
                    <ChildTaskList data={this.state.PREVIOUS_TASKS} sectionTitle={'Ранее'}
                                   childId={this.props.childId}
                                   userType={'parent'}
                                   userId={this.state.userId}/>

                </View>
            </ScrollView>
        </View>
    );}
}

const styles = StyleSheet.create({
    container: {...commonStyles.screenContainer, ...{}},
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
