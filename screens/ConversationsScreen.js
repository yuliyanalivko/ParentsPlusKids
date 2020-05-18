import React from 'react';
import {StyleSheet, View, ScrollView} from "react-native";
import {TitleHeader} from "./../components/TitleHeader";
import Topic from "./../components/Topic";

import styleVars from './../constants/Variables';
import commonStyles from './../constants/Styles';

const TOPICS = [
    {
        title: 'Доброта',
        innerText: 'Кого из персонажей твоих любимых мультфильмов ты считаешь добрым и почему? ' +
            'Представь, что герои тра ля ля жу жу жу с головой я  не дружу'
    },
    {
        title: 'Ляпота',
        innerText: 'Кого из персонажей твоих любимых мультфильмов ты считаешь добрым и почему? ' +
            'Представь, что герои тра ля ля жу жу жу с головой я  не дружу'
    },
    {
        title: 'Доброта',
        innerText: 'Кого из персонажей твоих любимых мультфильмов ты считаешь добрым и почему? ' +
            'Представь, что герои тра ля ля жу жу жу с головой я  не дружу'
    }
];

class ConversationsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={[styles.container, commonStyles.shadow]}>
                <TitleHeader title='Семейные беседы'/>
                <ScrollView contentContainerStyle={styles.scrollSection}>
                    {TOPICS.map(item => (
                        <Topic title={item.title} innerText={item.innerText}/>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {...commonStyles.screenContainer},
    scrollSection: {...commonStyles.scrollSection, ...{}}
});
export default ConversationsScreen;
