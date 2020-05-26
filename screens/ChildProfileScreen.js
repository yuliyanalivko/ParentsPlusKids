import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, StatusBar, AsyncStorage, ActivityIndicator, Text} from "react-native";
import {TitleHeader} from "./../components/TitleHeader";
import {SectionHeader} from "./../components/SectionHeader";

import commonStyles from './../constants/Styles';
import styleVars from './../constants/Variables'
import {ChildPoints} from "../components/ChildPoints";
import {Member} from "../components/Member";
import colors from "../constants/Colors";


export class ChildProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.getUserParams = this.getUserParams.bind(this);
        this.navigateToParent = this.navigateToParent.bind(this);
        this.state = {
            isLoading: true
        }
    }

    getUserParams = () => {
        console.log('getParams');
        try {
            const userId = AsyncStorage.getItem('userId')
                .then(async (value) => {
                    console.log('userId: ' + value);
                    await fetch(`http://10.0.2.2:9000/users/${value}`)
                        .then(response => response.json())
                        .then(user => {
                            try {
                                AsyncStorage.setItem('userName', user.name);
                                AsyncStorage.setItem('gender', user.gender);
                                AsyncStorage.setItem('role', user.role);
                                console.log('gender: ' + user.gender);
                            } catch (e) {
                                console.log('ChildProfileScreen getUserParams(fetch) error')
                            }
                        })
                });
        } catch (error) {
            console.log('ChildProfileScreen getUserParams error')
        }
    };

    componentDidMount = async () => {
        try {
            AsyncStorage.removeItem('parentId');
        } catch (error) {
            console.log('ParentProfileScreen componentDidMount(removeItem) error')
        }
        await this.getUserParams();
        let questionsBuf = [];
        try {
            const userId = await AsyncStorage.getItem('userId')
                .then((value) => {
                    console.log('userId2: ' + value);
                    const day = new Date().getDate();
                    const month = new Date().getMonth() + 1;
                    const year = new Date().getFullYear();
                    const date = year + '-' + month + '-' + day;
                    fetch(`http://10.0.2.2:9000/dayquestions/${value}/${date}`)
                        .then(response => response.json())
                        .then(questions => questionsBuf = questions)
                });
            const familyId = await AsyncStorage.getItem('familyId')
                .then((value) => {
                    console.log('familyId: ' + value);
                    fetch(`http://10.0.2.2:9000/familymembers/${value}`)
                        .then(response => response.json())
                        .then(users => {
                            const userId = AsyncStorage.getItem('userId')
                                .then(userId => {
                                    const family = users.filter(user => user.id !== parseInt(userId));
                                    console.log('family: ' + this.state.family);
                                    this.setState({
                                        FAMILY: family,
                                        isLoading: false,
                                        QUESTIONS: questionsBuf
                                    });
                                })
                        })

                });
        } catch (error) {
            console.log('ChildProfileScreen componentDidMount error')
        }
    };

    navigateToParent(parentId, parentName) {
        /*try {
            AsyncStorage.setItem('parentId', parentId.toString());
        } catch (error) {
            console.log('ChildProfileScreen navigateToParent error')
        }*/
        this.props.navigation.navigate('Parent', {parentId: parentId, parentName: parentName})
    }

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
            <View style={styles.container}>
                <StatusBar barStyle={'dark-content'} backgroundColor='#fff'/>
                <TitleHeader title='МОЙ АККАУНТ'
                             onPress={() => this.props.navigation.navigate('Settings')}/>
                <ChildPoints points={24}/>

                <ScrollView contentContainerStyle={styles.scrollSection}>
                    <View style={styles.section}>
                        <SectionHeader title={'Семья'}/>
                        <ScrollView horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    style={{
                                        marginRight: -styleVars.SCREEN_PADDING_HORIZONTAL,
                                        marginBottom: styleVars.COMPONENT_GAP
                                    }}>
                            {this.state.FAMILY.length > 0 &&
                            this.state.FAMILY.map(item => (
                                <Member name={item.name}
                                        onPress={() => this.navigateToParent(item.id, item.name)}/>
                            ))}
                            {this.state.FAMILY.length === 0 &&
                            <Text style={commonStyles.emptyContentText}>Список пуст</Text>}
                        </ScrollView>

                        <SectionHeader title={'Награды'}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {...commonStyles.screenContainer},
    questionHead: {
        alignSelf: 'stretch'
    },
    section: {
        marginTop: styleVars.SECTION_MARGIN
    },
    scrollSection: {
        ...commonStyles.scrollSection, ...{
            paddingTop: 0
        }
    }
});
