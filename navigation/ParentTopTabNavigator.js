import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import * as React from 'react';

import ParentChildTasksScreen from "../screens/ParentChildTasksScreen";
import ParentChildProgressScreen from "../screens/ParentChildProgressScreen";

import colors from './../constants/Colors';

const Tab = createMaterialTopTabNavigator();

export default function ParentTopTabNavigator() {
    return (
        <Tab.Navigator backBehavior={'initialRoute'}
                       tabBarOptions={{
                           activeTintColor: colors.activeColor,
                           labelStyle: {
                               fontSize: 12,
                               fontWeight: '700' },
                           style: { backgroundColor:  '#fff',},
                           indicatorStyle: {
                               backgroundColor:  colors.activeColor,
                               borderRadius:4,
                               height: 6
                           }
                       }}>
            <Tab.Screen name="ChildTasks" component={ParentChildTasksScreen}
                        options={{ tabBarLabel: 'Задания'}}/>
            <Tab.Screen name="ChildProgress" component={ParentChildProgressScreen}
                        options={{ tabBarLabel: 'Прогресс'}}/>
        </Tab.Navigator>
    );
}
