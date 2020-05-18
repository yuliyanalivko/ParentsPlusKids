import React from 'react';
import {View, Image, Text, StyleSheet, TouchableHighlight} from 'react-native';

import styleVars from './../constants/Variables';
import commonStyles from "./../constants/Styles";
import {AddCustomTaskDialog} from "./AddCustomTaskDialog";

export default class BackAddTaskHeader extends React.Component {

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
            <View style={styles.container}>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => this.props.navigation.goBack()}>
                    <Image style={styles.icon}
                           source={{
                               uri: 'https://reactnative.dev/img/tiny_logo.png',
                           }}
                    />
                </TouchableHighlight>
                <Text style={styles.text}>{this.props.title}</Text>
                <View style={styles.hiddenBlock}>
                    {this.props.actionIcon &&
                    <View>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={this.showDialog}>
                            <Image style={styles.icon}
                                   source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
                        </TouchableHighlight>

                        <AddCustomTaskDialog visible={this.state.dialogVisible}
                                             onCancel={this.handleCancel}
                                             onAdd={this.handleAdd}/>
                    </View>
                    }
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        height: styleVars.HEADER_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingHorizontal: styleVars.SCREEN_PADDING_HORIZONTAL,
    },
    text: {...commonStyles.headerTitle, ...{}},
    backIcon: {
        height: 48,
        width: 48
    },
    hiddenBlock: {
        width: 48,
        height: '100%',
        justifyContent: 'center'
    },
    icon: {
        height: styleVars.HEADER_HEIGHT * 0.8,
        width: styleVars.HEADER_HEIGHT * 0.8,
        borderRadius: styleVars.HEADER_HEIGHT * 0.5,
        alignSelf: 'flex-end'
    },
});
