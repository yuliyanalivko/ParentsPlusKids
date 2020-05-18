import React from 'react';
import {StyleSheet, View, ScrollView, StatusBar} from "react-native";
import MonsterProgress from "./../components/MonsterProgress";

import commonStyles from "../constants/Styles";

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
    {
        name: 'Леняш',
        description: 'Отсутствие силы воли',
        progress: 7
    },
    {
        name: 'Невнимашка',
        description: 'Невнимательность',
        progress: 9
    },

];

export const ParentChildProgressScreen = props => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor='#fff'
                       navigation={props.navigation}
            />
            <ScrollView contentContainerStyle={styles.scrollSection}>
                {MONSTERS.map(item => (
                    <MonsterProgress name={item.name}
                                     description={item.description}
                                     progress={item.progress}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {...commonStyles.screenContainer, ...{}},
    scrollSection: {...commonStyles.scrollSection, ...{}}
});
export default ParentChildProgressScreen;
