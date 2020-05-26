import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import TaskList from "../components/TaskList";
import colors from './../constants/Colors';

const Tab = createMaterialTopTabNavigator();

export default function AddTaskTopTabNavigator() {

    const [TASKS, setTasks] = useState([]);

    useEffect(() => {
        const getTasks =  () => {
             fetch(`http://10.0.2.2:9000/tasks`)
                .then(response => response.json())
                .then(tasks => {
                    setTasks(tasks);
                });
        };
        getTasks();
    }, []);
    const EasyTaskList = () => (
        <TaskList data={TASKS.filter(task => task.points <= 3)}/>
    );
    const MediumTaskList = () => (
        <TaskList data={TASKS.filter(task => task.points >=4 && task.points <= 6)}/>
    );
    const DifficultTaskList = () => (
        <TaskList data={TASKS.filter(task => task.points >= 7)}/>
    );
        return (
            <Tab.Navigator backBehavior={'initialRoute'}
                           tabBarOptions={{
                               activeTintColor: colors.activeColor,
                               labelStyle: {
                                   fontSize: 12,
                                   fontWeight: '700'
                               },
                               style: {backgroundColor: '#fff',},
                               indicatorStyle: {
                                   backgroundColor: colors.activeColor,
                                   borderRadius: 4,
                                   height: 6
                               }
                           }}>
                {console.log('tasks: '+TASKS)}
                <Tab.Screen name="EasyTaskList"
                            component={EasyTaskList}
                            options={{tabBarLabel: 'Легкие'}}/>
                <Tab.Screen name="MediumTaskList"
                            component={MediumTaskList}
                            options={{tabBarLabel: 'Средние'}}/>
                <Tab.Screen name="DifficultTaskList"
                            component={DifficultTaskList}
                            options={{tabBarLabel: 'Сложные'}}/>
            </Tab.Navigator>
        );

}
