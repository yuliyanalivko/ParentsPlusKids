import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {BackHandler } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import { ChildProfileScreen } from "../screens/ChildProfileScreen";
import ChildTasksScreen from "../screens/ChildTasksScreen";
import ChildMonstersScreen from "../screens/ChildMonstersScreen";

import colors from '../constants/Colors'

const BottomTab = createBottomTabNavigator();

import {StackActions} from '@react-navigation/native';

export class ChildBottomTabNavigator extends React.Component {
/*

    componentWillMount = () => {
        BackHandler.addEventListener('hardwareBackPress', BackHandler.exitApp);
    };
    componentWillUnmount = () => {
        BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp);
    };
*/    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }


    componentWillMount = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    };
    componentWillUnmount = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    };

    handleBack() {
        /*this.props.navigation.dispatch(
            StackActions.replace('ChildNavigator')
        );*/
        BackHandler.exitApp();
    }

    render() {
        return (
            <BottomTab.Navigator tabBarOptions={{
                activeTintColor: colors.activeColor,
                labelStyle: {
                    fontSize: 12,
                    fontWeight: '700'
                },
                indicatorStyle: {
                    backgroundColor: colors.activeColor,
                    borderRadius: 4,
                    height: 6
                }
            }} backBehavior={'initialRoute'}>
                <BottomTab.Screen
                    name="ChildProfile"
                    component={ChildProfileScreen}
                    options={{
                        title: 'Мой аккаунт',
                        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-code-working"/>,
                    }}
                />
                <BottomTab.Screen
                    name="ChildTasks"
                    component={ChildTasksScreen}
                    options={{
                        title: 'Задания',
                        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-book"/>,
                    }}
                />
                <BottomTab.Screen
                    name="ChildMonsters"
                    component={ChildMonstersScreen}
                    options={{
                        title: 'Монстры',
                        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-book"/>,
                    }}
                />
            </BottomTab.Navigator>
        );
    }
}
