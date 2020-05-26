import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import TabBarIcon from './../components/TabBarIcon';
import {BackHandler} from "react-native";

import {ParentProfileScreen} from "./../screens/ParentProfileScreen";
import ConversationsScreen from "./../screens/ConversationsScreen";

import colors from './../constants/Colors'

const BottomTab = createBottomTabNavigator();

export class ParentBottomTabNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }

/*        componentWillMount = () => {
            BackHandler.addEventListener('hardwareBackPress', this.handleBack);
        };
        componentWillUnmount = () => {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
        };*/

    handleBack() {
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
            }}>
                <BottomTab.Screen
                    name="Profile"
                    component={ParentProfileScreen}
                    options={{
                        title: 'Мой аккаунт',
                        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-code-working"/>,
                    }}
                />
                <BottomTab.Screen
                    name="Conversations"
                    component={ConversationsScreen}
                    options={{
                        title: 'Беседы',
                        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-book"/>,
                    }}
                />
            </BottomTab.Navigator>
        );
    }
}
