import React from 'react';
import {StyleSheet, View} from "react-native";
import BackAddTaskHeader from "../components/BackAddTaskHeader";
import AddTaskTopTabNavigator from "../navigation/AddTaskTopTabNavigator";

import colors from './../constants/Colors';
import styleVars from './../constants/Variables';

export const AddTaskScreen = props => {
    return (
        <View style={styles.container}>
            <BackAddTaskHeader title='Задания'
                               actionIcon='add'
                               navigation={props.navigation}
            />
            <AddTaskTopTabNavigator/>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgColor,
        minHeight: styleVars.WINDOW_HEIGHT+styleVars.HEADER_HEIGHT,
    }
});
