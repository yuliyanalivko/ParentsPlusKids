import {StyleSheet, TextInput, View, Text} from "react-native";
import React from "react";

import colors from "./../constants/Colors";
import commonStyles from "../constants/Styles";

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.changeText = this.changeText.bind(this);
        this.inputColor = (this.props.inputColor) ? (this.props.inputColor) : colors.mainText;
        this.maxLength = this.props.maxLength ? this.props.maxLength : 256;
        this.state = {
           // text: this.props.value!==null ? this.props.value : "none",
            inputColor: colors.mainText,
            isValid: this.props.value ? true : false
        }
    }

    changeText(newText) {
        const self = this;
        setTimeout(function () {
            self.setState({
                text: newText,
                isValid: (newText !== "")
            });

            if (self.props.pattern) {
                if (typeof self.props.pattern === 'string') {
                    const condition = new RegExp(self.props.pattern, 'g');
                    const isValid = condition.test(self.state.text);
                    if (isValid) {
                        self.setState({
                            inputColor: colors.mainText,
                            isValid: true
                        })
                    } else {
                        self.setState({
                            inputColor: colors.RED_GRADIENT.end,
                            isValid: false
                        });
                    }
                }
            }

            if (self.props.onChangeText) {
                self.props.onChangeText(newText);
            }
        }, 1);
    }
/*
    changeTextColor() {
        if (typeof this.props.pattern === 'string') {
            const condition = new RegExp(this.props.pattern, 'g');
            const isValid = condition.test(this.state.text);
            if (isValid) {
                this.setState({
                    inputColor: colors.mainText,
                })
            } else {
                this.setState({
                    inputColor: colors.RED_GRADIENT.end,
                    isValid: false
                });
            }

        }
    }*/

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                {this.props.label &&
                <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>}
                <TextInput onChangeText={this.changeText}
                           style={[styles.input, this.props.inputStyle, {color: this.state.inputColor}]}
                           defaultValue={this.props.value}
                           maxLength={this.maxLength}
                           keyboardType={this.props.keyboardType}
                           multiline={(this.props.multiline) ? true : false}
                           textContentType={this.props.textContentType ? this.props.textContentType : 'none'}
                           secureTextEntry={this.props.secureTextEntry}
                           autoCompleteType={this.props.autoCompleteType ? this.props.autoCompleteType : 'off'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        marginBottom: 30,
    },
    label: {
        ...commonStyles.secondaryText, ...{
            fontSize: 12,
            lineHeight: 12
        }
    },
    input: {
        ...commonStyles.mainText, ...{
            minHeight: 20,
            borderBottomWidth: 0.6,
            borderColor: colors.thirdColor,
            alignSelf: 'stretch',
            fontSize: 16,
        }
    }
});
export default Input;
