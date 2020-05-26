import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, StatusBar, Text, AsyncStorage, ActivityIndicator} from "react-native";
import {SectionHeader} from "./../components/SectionHeader";

import commonStyles from "./../constants/Styles";
import styleVars from './../constants/Variables';
import {TitleHeader} from "../components/TitleHeader";
import {NotPassedTest} from "../components/NotPassedTest";
import MonsterProgress from "../components/MonsterProgress";
import colors from "../constants/Colors";

export class ChildMonstersScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount = async () => {
        const getMonsters = () => {
            let monstersBuf = [], testsBuf = [];
            const userId = AsyncStorage.getItem('userId')
                .then(async (value) => {
                    await fetch(`http://10.0.2.2:9000/childmonsters/${value}`)
                        .then(response => response.json())
                        .then(monsters => monstersBuf = monsters);
                    await fetch(`http://10.0.2.2:9000/tests/${value}`)
                        .then(response => response.json())
                        .then(tests => testsBuf = tests);
                    this.setState({
                        MONSTERS: monstersBuf,
                        TESTS: testsBuf,
                        isLoading: false
                    })
                });
        };
        getMonsters();
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, marginTop: '30%'}}>
                    <ActivityIndicator color={colors.activeColor} size={'large'}/>
                </View>
            )
        }
        return (
            <View style={[styles.container, this.props.style]}>
                <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
                <TitleHeader title={'МОИ МОНСТРЫ'}
                             onPress={() => this.props.navigation.navigate('Settings')}/>

                <ScrollView contentContainerStyle={styles.scrollSection}>
                    <View style={styles.section}>
                        {this.state.TESTS.length > 0 &&
                        <SectionHeader title={'Непройденные тесты'}/>}
                        {this.state.TESTS.map(item => (
                            <NotPassedTest id={item.id}
                                           title={item.monster} description={item.description}
                                           onPress={() => this.props.navigation.navigate('Test', {testId:item.id})}/>
                        ))
                        }
                        {console.log(this.state.MONSTERS)}
                        {this.state.MONSTERS.length > 0 &&
                        <SectionHeader title={'Мои монстры'}/>
                        }
                        {this.state.MONSTERS.map(item => (
                            <MonsterProgress name={item.monsterName}
                                             description={item.description}
                                             progress={item.progress}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {...commonStyles.screenContainer, ...{}},
    scrollSection: {
        ...commonStyles.scrollSection, ...{}
    },
    section: {
        alignSelf: 'stretch',
        marginTop: -styleVars.SCREEN_PADDING_HORIZONTAL,
        paddingBottom: styleVars.SCREEN_PADDING_HORIZONTAL
    }
});
export default ChildMonstersScreen;
