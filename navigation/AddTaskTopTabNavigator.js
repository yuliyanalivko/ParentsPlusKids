import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import * as React from 'react';

import TaskList from "../components/TaskList";

import colors from './../constants/Colors';

const Tab = createMaterialTopTabNavigator();

const EASY_TASKS = [
    {
        task: 'Помыть посуду',
        starCount: '1',
        leadTime: '1 день',
        monster: 'Леняш'
    },
    {
        task: 'Помочь однокласснику с любым школьным предметом',
        starCount: '2',
        leadTime: '1 день',
        monster: 'Леняш'
    },
    {
        task: 'Говорить весь день комплименты другим ',
        starCount: '3',
        leadTime: '1 день',
        monster: 'Леняш'
    },
    {
        task: 'Напиши историю под названием «Моя идеальная школа». Ответь на вопросы: какие-то вопросы и тд и тп ляляля жужужу',
        starCount: '5',
        leadTime: '1 неделя',
        monster: 'Леняш'
    }
];

const MEDIUM_TASKS = [
    {
        task: 'Помыть посуду',
        starCount: '1',
        leadTime: '1 день',
        monster: 'Леняш'
    },
    {
        task: 'Помочь однокласснику с любым школьным предметом',
        starCount: '2',
        leadTime: '1 день',
        monster: 'Леняш'
    },
    {
        task: 'Говорить весь день комплименты другим ',
        starCount: '3',
        leadTime: '1 день',
        monster: 'Леняш'
    },
    {
        task: 'Напиши историю под названием «Моя идеальная школа». Ответь на вопросы: какие-то вопросы и тд и тп ляляля жужужу',
        starCount: '5',
        leadTime: '1 неделя',
        monster: 'Леняш'
    }
];

const DIFFICULT_TASKS = [
    /*{
        task: 'Помыть посуду',
        starCount: '1',
        leadTime: '1 день'
    },
    {
        task: 'Помочь однокласснику с любым школьным предметом',
        starCount: '2',
        leadTime: '1 день'
    },
    {
        task: 'Говорить весь день комплименты другим ',
        starCount: '3',
        leadTime: '1 день'
    },
    {
        task: 'Напиши историю под названием «Моя идеальная школа». Ответь на вопросы: какие-то вопросы и тд и тп ляляля жужужу',
        starCount: '5',
        leadTime: '1 неделя'
    }*/
];
const CUSTOM_TASKS = [
    /*{
        task: 'Помыть посуду',
        starCount: '1',
        leadTime: '1 день'
    },
    {
        task: 'Помочь однокласснику с любым школьным предметом',
        starCount: '2',
        leadTime: '1 день'
    },
    {
        task: 'Говорить весь день комплименты другим ',
        starCount: '3',
        leadTime: '1 день'
    },
    {
        task: 'Напиши историю под названием «Моя идеальная школа». Ответь на вопросы: какие-то вопросы и тд и тп ляляля жужужу',
        starCount: '5',
        leadTime: '1 неделя'
    }*/
];

function EasyTaskListComponent () {
    return(
        <TaskList data={EASY_TASKS}/>
    )
}
function MediumTaskListComponent () {
    return(
        <TaskList data={MEDIUM_TASKS}/>
    )
}
function DifficultTaskListComponent () {
    return(
        <TaskList data={DIFFICULT_TASKS}/>
    )
}
function CustomTaskListComponent () {
    return(
        <TaskList data={CUSTOM_TASKS}/>
    )
}

export default function AddTaskTopTabNavigator() {
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
            <Tab.Screen name="EasyTaskList" component={EasyTaskListComponent}
                        options={{ tabBarLabel: 'Легкие'}}/>
            <Tab.Screen name="MediumTaskList" component={MediumTaskListComponent}
                        options={{ tabBarLabel: 'Средние'}}/>
            <Tab.Screen name="DifficultTaskList" component={DifficultTaskListComponent}
                        options={{ tabBarLabel: 'Сложные'}}/>
           {/* <Tab.Screen name="CustomTaskList" component={CustomTaskListComponent}
                        options={{ tabBarLabel: 'Мои задания'}}/>*/}
        </Tab.Navigator>
    );
}
