import React from 'react';
import {StyleSheet, View, ScrollView, StatusBar, Text} from "react-native";
import {SectionHeader} from "./../components/SectionHeader";

import commonStyles from "./../constants/Styles";
import styleVars from './../constants/Variables';
import colors from "../constants/Colors";
import {TitleHeader} from "../components/TitleHeader";
import {NotPassedTest} from "../components/NotPassedTest";
import MonsterProgress from "../components/MonsterProgress";

const NOT_PASSED_TESTS = [
    {
        title: 'Леняш',
        description: 'Отсутствие силы воли'
    },
    {
        title: 'Невнимашка',
        description: 'Невнимательность'
    }
];
const MONSTERS = [
    {
        name: 'Опоздун',
        description: 'Непунктуальность',
        progress: 2
    },
    {
        name: 'Неряш',
        description: 'Неряшливость',
        progress: 4
    },
    {
        name: 'Дапотомчик',
        description: 'Откладывание дел "на потом"',
        progress: 5
    },
    {
        name: 'УменяНеПолучайка',
        description: 'Сдаваться, когда не получается',
        progress: 7
    },
    /*    {
            name: 'Леняш',
            description: 'Отсутствие силы воли',
            progress: 7
        },
        {
            name: 'Невнимашка',
            description: 'Невнимательность',
            progress: 9
        },*/

];

export const ChildMonstersScreen = props => {

    return (
        <View style={[styles.container, props.style]}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
            <TitleHeader title={'МОИ МОНСТРЫ'}
                         onPress={() => props.navigation.navigate('Settings')}/>

            <ScrollView contentContainerStyle={styles.scrollSection}>
                <View style={styles.section}>
                    {NOT_PASSED_TESTS.length > 0 &&
                    <SectionHeader title={'Непройденные тесты'}/>}
                    {NOT_PASSED_TESTS.map(item => (
                        <NotPassedTest title={item.title} description={item.description}
                                       onPress={() => props.navigation.navigate('Test')}/>
                    ))
                    }
                    {MONSTERS.length > 0 &&
                    <SectionHeader title={'Мои монстры'}/>
                    }
                    {MONSTERS.map(item => (
                        <MonsterProgress name={item.name}
                                         description={item.description}
                                         progress={item.progress}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {...commonStyles.screenContainer, ...{}},
    scrollSection: {
        ...commonStyles.scrollSection, ...{
        }
    },
    section: {
        alignSelf: 'stretch',
        marginTop: -styleVars.SCREEN_PADDING_HORIZONTAL,
        paddingBottom: styleVars.SCREEN_PADDING_HORIZONTAL
    }
});
export default ChildMonstersScreen;
