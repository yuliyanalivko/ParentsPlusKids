import React from 'react';
import {StyleSheet, View, ScrollView, Text, FlatList} from "react-native";
import Task from "./Task";
import commonStyles from '../constants/Styles';
import styleVars from '../constants/Variables';
import colors from "../constants/Colors";

class AddTaskScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                {this.props.data.length > 1 &&
                <ScrollView contentContainerStyle={styles.scrollSection}>
                    <View style={styles.section}>
                        <FlatList
                            style={styles.flatList}
                            data={this.props.data}
                            keyExtractor={item => item.id}
                            renderItem={({item}) =>
                                <Task task={item.task}
                                      starCount={item.starCount}
                                      leadTime={item.leadTime}
                                      monster={item.monster}/>}
                        />
                    </View>
                </ScrollView>}
                {this.props.data.length === 0 &&
                <Text style={[commonStyles.emptyContentText, {marginTop: 50}]}>Список заданий пуст</Text>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: colors.bgColor,
        minHeight: styleVars.WINDOW_HEIGHT,
        /* paddingBottom: styleVars.HEADER_HEIGHT*/
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
export default AddTaskScreen;
