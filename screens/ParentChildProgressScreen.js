import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, StatusBar, ActivityIndicator, AsyncStorage, Text} from "react-native";
import MonsterProgress from "./../components/MonsterProgress";

import commonStyles from "../constants/Styles";
import colors from "../constants/Colors";

class ParentChildProgressScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            MONSTERS: []
        }
    }

    componentDidMount = async () => {
        const getMonsters =  () => {
            const userId = AsyncStorage.getItem('childId')
                .then(async(value) => {
                    await fetch(`http://10.0.2.2:9000/childmonsters/${value}`)
                        .then(response => response.json())
                        .then(monsters =>
                            this.setState({
                            MONSTERS: monsters,
                            isLoading: false
                        }));
                });
        };
        getMonsters();
    };

    render() {
        if(this.state.isLoading){
        return(
            <View style={{flex: 1, marginTop: '30%'}}>
                <ActivityIndicator color={colors.activeColor} size={'large'}/>
            </View>
        )
    }
        return (
            <View style={styles.container}>
                <StatusBar barStyle={'dark-content'} backgroundColor='#fff'
                           navigation={this.props.navigation}
                />
                <ScrollView contentContainerStyle={styles.scrollSection}>
                    {this.state.MONSTERS.length <= 0 &&
                    <Text style={commonStyles.emptyContentText}>Монстры не обнаружены</Text>
                    }
                    {this.state.MONSTERS.length > 0 && this.state.MONSTERS.map(item => (
                        <MonsterProgress name={item.monsterName}
                                         description={item.description}
                                         progress={item.progress}
                        />
                    ))}
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {...commonStyles.screenContainer, ...{}},
    scrollSection: {...commonStyles.scrollSection, ...{}}
});
export default ParentChildProgressScreen;
