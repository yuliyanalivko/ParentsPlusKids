import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, StatusBar, Text, Modal} from "react-native";
import {TitleHeader} from "./../components/TitleHeader";
import {SectionHeader} from "./../components/SectionHeader";

import commonStyles from './../constants/Styles';
import styleVars from './../constants/Variables';
import {DayQuestion} from "../components/DayQuestion";
import {Member} from "../components/Member";
import colors from "../constants/Colors";
import {GradientButton} from "../components/GradientButton";

const FAMILY = [
    {
        id: '1',
        name: 'Артем',
    },
    {
        id: '2',
        name: 'Марина',
    },
    {
        id: '3',
        name: 'Тима',
    }
];
const QUESTIONS = [
    {
        question: 'Это какой-то вопрос?',
        answer: 'А это ответ',
        isAnswered: true
    },
    {
        question: 'А это какой-то ну очень длинный вопрос?',
        answer: null,
        isAnswered: false
    }
];

export const ParentProfileScreen = (props) => {

    const [dialogVisible, setDialogVisible] = useState(false);
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor='#fff'/>
            <TitleHeader title='МОЙ АККАУНТ'
                         onPress={() => props.navigation.navigate('Settings')}/>

            <ScrollView contentContainerStyle={styles.scrollSection}>
                <SectionHeader title={'Вопрос дня'}
                               imgUri={'https://reactnative.dev/img/tiny_logo.png'}/>

                {QUESTIONS.length > 0 &&
                QUESTIONS.map(item => (
                    <DayQuestion question={item.question}
                                 answer={item.answer}
                                 isAnswered={item.isAnswered}
                                 toAnswer={!item.isAnswered}/>
                ))}
                {QUESTIONS.length <= 0 &&
                <Text style={commonStyles.emptyContentText}>Список вопросов пуст</Text>
                }
                <View style={styles.section}>
                    <SectionHeader title={'Семья'}
                                   icon={'add'}
                                   onPressIcon={() => {
                                       setDialogVisible(true)
                                   }}/>
                    <ScrollView horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    marginRight: -styleVars.SCREEN_PADDING_HORIZONTAL,
                                    marginBottom: styleVars.COMPONENT_GAP
                                }}>
                        {FAMILY.length > 0 &&
                        FAMILY.map(item => (
                            <Member name={item.name}
                                    onPress={() => props.navigation.navigate('Child')}/>
                        ))}
                        {FAMILY.length <= 0 &&
                        <Text style={commonStyles.emptyContentText}>Список пуст</Text>}
                    </ScrollView>
                </View>
            </ScrollView>
            <AddMemberDialog visible={dialogVisible}
                             onConfirm={() => {
                                 setDialogVisible(false)
                             }}
            />
        </View>
    );
};

const AddMemberDialog = props => {
    return (
        <Modal transparent={true}
               visible={props.visible}>
            <View style={styles.dialogBackground}>

                <View style={styles.dialogContainer}>
                    <Text style={styles.title}>
                        Поделитесь этим кодом с членом Вашей семьи, чтобы он мог присоединиться к Вам!</Text>
                    <Text style={styles.text}>12-65-fgb-ds</Text>
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
    dialogContainer: {...commonStyles.dialogContainer, ...{
            padding: styleVars.INNER_PADDING
        }},
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
