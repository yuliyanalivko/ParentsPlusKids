import React from 'react';
import {View, Text, Image, StyleSheet, TouchableHighlight} from 'react-native';
import TaskDialog from "./TaskDialog";

import styleVars from './../constants/Variables';
import colors from "./../constants/Colors";
import commonStyles from "./../constants/Styles";

export default class Task extends React.Component {

    constructor(props) {
        super(props);
        this.showDialog = this.showDialog.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.state = {
            dialogVisible: false
        };
    }

    showDialog() {
        this.setState({
            dialogVisible: true
        })
    }

    handleCancel() {
        this.setState({
            dialogVisible: false
        })
    }

    handleAdd() {
        this.setState({
            dialogVisible: false
        })
    }

    render() {
        return (
            <TouchableHighlight underlayColor={'transparent'}
                                onPress={this.showDialog}
            >
                <View style={[styles.container, commonStyles.shadow]}>
                    <Text style={styles.task} numberOfLines={2}>{this.props.task}</Text>
                    <View style={styles.paramsLine}>
                        <View style={styles.param}>
                            <Image style={styles.icon}
                                   source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
                            <Text style={styles.paramText}>{this.props.starCount}</Text>
                        </View>
                        <View style={styles.param}>
                            <Image style={styles.icon}
                                   source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
                            <Text style={styles.paramText}>{this.props.leadTime}</Text>
                        </View>
                        <View style={styles.param}>
                            <Image style={styles.icon}
                                   source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
                            <Text style={styles.paramText}>{this.props.monster}</Text>
                        </View>
                    </View>

                    <TaskDialog visible={this.state.dialogVisible}
                                task={this.props.task}
                                leadTime={this.props.leadTime}
                                starCount={this.props.starCount}
                                onCancel={this.handleCancel}
                                onAdd={this.handleAdd}
                    />
                </View>
            </TouchableHighlight>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        ...commonStyles.componentContainer, ...{

            height: 102,
            justifyContent: 'space-between',
            padding: styleVars.INNER_PADDING,
        }
    },
    task: {...commonStyles.mainText, ...{}},
    paramsLine: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 14
    },
    param: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 20,
    },
    icon: {
        height: 16,
        width: 16
    },
    paramText: {
        fontSize: 14,
        color: colors.secondColor,
        marginLeft: 8
    }
});
