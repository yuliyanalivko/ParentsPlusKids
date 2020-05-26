import React from 'react';
import {StyleSheet, View, ScrollView, AsyncStorage} from "react-native";
import {TitleHeader} from "./../components/TitleHeader";
import Topic from "./../components/Topic";

import styleVars from './../constants/Variables';
import commonStyles from './../constants/Styles';

const TOPICS = [
    {
        title: 'Доброта',
        articleText: 'Кого из персонажей твоих любимых мультфильмов ты считаешь добрым и почему? ' +
            'Представь, что герои тра ля ля жу жу жу с головой я  не дружу'
    },
    {
        title: 'Ляпота',
        articleText: 'Кого из персонажей твоих любимых мультфильмов ты считаешь добрым и почему? ' +
            'Представь, что герои тра ля ля жу жу жу с головой я  не дружу'
    },
    {
        title: 'Доброта',
        articleText: 'Кого из персонажей твоих любимых мультфильмов ты считаешь добрым и почему? ' +
            'Представь, что герои тра ля ля жу жу жу с головой я  не дружу'
    }
];

class ConversationsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ARTICLES: []
        }
    }
    componentDidMount = async () => {
        fetch('http://10.0.2.2:9000/articles')
            .then(response => response.json())
            .then(articles => {
                console.log('Articls: '+articles);
                this.setState({ARTICLES: articles})})
    };


    render() {
        return (
            <View style={[styles.container, commonStyles.shadow]}>
                <TitleHeader title='Семейные беседы'/>
                <ScrollView contentContainerStyle={styles.scrollSection}>
                    {this.state.ARTICLES.map(item => (
                        <Topic title={item.title} innerText={item.articleText}/>
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
