import React from 'react';
import {Image, Text, StyleSheet, View, TextInput} from 'react-native';

import styleVars from './../constants/Variables';
import colors from "./../constants/Colors";
import commonStyles from "./../constants/Styles";
import {LinearGradient} from "expo-linear-gradient";
import {GradientButton} from "./GradientButton";
import {InputDialog} from "./InputDialog";

export class DayQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.state = {
            editable: this.props.editable,
            bgGradient: (!this.props.editable)? {start: colors.componentBgColor, end: colors.componentBgColor}
                : colors.mainGradient,
            answer: (this.props.answer === null) ? 'Нет ответа' : (this.props.answer),
            answerStyle: (this.props.answer === null) ? styles.noAnswer : styles.answered,
            questionColor: (!this.props.editable) ? colors.mainText : '#fff',

            dialogVisible: false
        }
    }

    showDialog() {
        this.setState(({
            dialogVisible: true
        }))
    }

    hideDialog() {
        this.setState(({
            dialogVisible: false
        }))
    }

    handleConfirm() {
        this.setState({
            editable: false,
            bgGradient: {start: colors.componentBgColor, end: colors.componentBgColor},
            answer: this.refs['answer'].state.text,
            answerStyle: styles.answered,
            questionColor: colors.mainText
        });
        this.forceUpdate();
    }

    render() {
        return (
            <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                            locations={[0, 1]}
                            colors={[this.state.bgGradient.start, this.state.bgGradient.end]}
                            style={[styles.container, commonStyles.shadow]}>
                <Image
                    style={styles.userIcon}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                <View style={styles.textContent} ref={'textContent'}>
                    <Text style={[styles.question, {color: this.state.questionColor}]}>
                        {this.props.question}</Text>
                    {!this.state.editable &&
                    <Text style={this.state.answerStyle}>
                        {this.state.answer}</Text>
                    }
                    {this.state.editable &&
                    <GradientButton title={'Ответить'} /*style={{width: 40}}*/
                                    onPress={this.showDialog}/>
                    }
                </View>

                <InputDialog visible={this.state.dialogVisible}
                             onCancel={this.hideDialog}
                             onConfirm={this.handleConfirm}
                             title={'Ответить'}
                             label={'Введите ответ:'}
                             buttonTitle={'Ответить'}
                             ref={'answer'}
                />
            </LinearGradient>
        )
    }
};
const styles = StyleSheet.create({
    container: {
        ...commonStyles.componentContainer, ...{
            padding: styleVars.INNER_PADDING,
            flexDirection: 'row',
        }
    },
    head: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        marginBottom: 10
    },
    userIcon: {
        ...commonStyles.userIcon, ...{
            marginRight: styleVars.INNER_PADDING
        }
    },
    textContent: {
        flexDirection: 'column',
        flexShrink: 1
    },
    question: {
        ...commonStyles.mainText, ...{
            marginBottom: 8
        }
    },
    answered: {
        ...commonStyles.secondaryText, ...{
            flexWrap: 'wrap',
            fontWeight: '700',
            fontSize: 16
        }
    },
    noAnswer: {
        ...commonStyles.secondaryText, ...{
            flexWrap: 'wrap'
        }
    },
    textInput: {
        alignSelf: 'stretch',
        height: 48,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12
    }
});
