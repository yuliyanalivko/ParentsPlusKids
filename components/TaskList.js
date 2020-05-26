import React from 'react';
import {StyleSheet, View, ScrollView, Text, FlatList} from "react-native";
import Task from "./Task";
import commonStyles from '../constants/Styles';
import styleVars from '../constants/Variables';
import colors from "../constants/Colors";
import {setLeadTime} from "../constants/Functions";

const TaskList = (props) => {
        return (
            <View style={[styles.container, props.style]}>
                {console.log('data: '+props.data)}
                {props.data.length > 1 &&
                <ScrollView contentContainerStyle={styles.scrollSection}>
                    <View style={styles.section}>
                        <FlatList
                            style={styles.flatList}
                            data={props.data}
                            keyExtractor={item => item.id}
                            renderItem={({item}) =>
                                <Task task={item}/>}
                        />
                    </View>
                </ScrollView>}
                {props.data.length === 0 &&
                <Text style={[commonStyles.emptyContentText, {marginTop: 50}]}>Список заданий пуст</Text>
                }
            </View>
        );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: colors.bgColor,
        minHeight: styleVars.WINDOW_HEIGHT
    },
    scrollSection: {
        ...commonStyles.scrollSection, ...{
            width: styleVars.WINDOW_WIDTH
        }
    },
    flatList: {
        marginVertical: styleVars.COMPONENT_GAP
    },
    section: {
        alignSelf: 'stretch',
        width: styleVars.WINDOW_WIDTH,
        margin: -styleVars.SCREEN_PADDING_HORIZONTAL
    },
    sectionHeader: {
        marginTop: 24
    },
});
export default TaskList;
