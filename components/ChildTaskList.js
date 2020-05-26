import React from 'react';
import {StyleSheet, FlatList, View, Text} from "react-native";
import {SectionHeader} from "./../components/SectionHeader";
import ChildTask from "./../components/ChildTask";

import commonStyles from "./../constants/Styles";
import styleVars from './../constants/Variables';

class ChildTaskList extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.data = this.props.data;
        this.childId=this.props.childId;
    }

    onDelete(id) {
        this.data.find(element => element.id === id);
        this.forceUpdate();
    }

    render() {
        return (
            <View style={{marginBottom: styleVars.COMPONENT_GAP}}>
                {(this.props.sectionTitle === 'Текущие' && this.props.userType==='parent') &&
                <SectionHeader style={styles.sectionHeader}
                               title={this.props.sectionTitle}
                               icon={'add'}
                               onPressIcon={()=>{this.props.navigation.navigate('AddTask')}}
                />}
                {(this.props.sectionTitle === 'Текущие' && this.props.userType==='child') &&
                <SectionHeader style={styles.sectionHeader}
                               title={this.props.sectionTitle}
                />}
                {(this.props.sectionTitle === 'Ранее') &&
                <SectionHeader style={styles.sectionHeader}
                               title={this.props.sectionTitle}
                />}

                {this.props.data.length > 0 &&
                <FlatList
                    style={styles.flatList}
                    data={this.props.data}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <ChildTask task={item}
                                                       id={item.id}
                                                       onDelete={this.onDelete}
                                                       userType = {this.props.userType}
                                                       userId = {this.props.userId}
                    />}
                />
                }
                {this.props.data.length <= 0 &&
                    <Text style={commonStyles.emptyContentText}>Список заданий пуст</Text>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatList: {},
    section: {
        alignSelf: 'stretch',
        width: styleVars.WINDOW_WIDTH,
        //marginHorizontal: -styleVars.SCREEN_PADDING_HORIZONTAL
    },
    sectionHeader: {
        marginTop: 24,
        marginBottom: styleVars.COMPONENT_GAP / 2
    }
});
export default ChildTaskList;
