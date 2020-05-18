import React from "react";
import {Text, View, StyleSheet, Modal, Image, TouchableHighlight} from "react-native";

import styleVars from './../constants/Variables';
import colors from './../constants/Colors';
import commonStyles from './../constants/Styles';
import {GradientButton} from "./GradientButton";
import {LinearGradient} from "expo-linear-gradient";
import Input from "./Input";

export class InputDialog extends React.Component {
    constructor(props) {
        super(props);
        this.setBtnOpacity = this.setBtnOpacity.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.state = {
            buttonTitle: this.props.buttonTitle ? this.props.buttonTitle : 'Подтвердить',
            text: "",
            btnOpacity: .5
        }
    }

    onConfirm() {
        const self = this;
        const textValue = this.refs['text'].state.text;
        setTimeout(() => {
            self.setState({
                text: textValue,
                btnOpacity: 0.5
            });
            self.props.onConfirm();
            self.props.onCancel();
        }, 1);
    }

    setBtnOpacity() {
        if (this.refs['text'].state.isValid) {
            this.setState({
                btnOpacity: 1
            });
        } else {
            this.setState({
                btnOpacity: 0.5
            });
        }
    }

    render() {
        return (
            <Modal transparent={true}
                   visible={this.props.visible}>
                <View style={styles.dialogBackground}>

                    <View style={styles.dialogContainer}>

                        <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                                        locations={[0, 1]}
                                        colors={[colors.mainGradient.end, colors.mainGradient.start]}
                                        style={styles.gradient}>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <TouchableHighlight underlayColor={'transparent'}
                                                onPress={this.props.onCancel}>
                                <Image style={styles.closeIcon}
                                       source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
                            </TouchableHighlight>
                        </LinearGradient>

                        <View style={styles.content}>
                            <Input label={this.props.label}
                                   maxLength={50}
                                   ref={'text'}
                                   onChangeText={this.setBtnOpacity}
                            />

                            <View style={[styles.buttons, {opacity: this.state.btnOpacity}]}>
                                <GradientButton title={this.props.buttonTitle}
                                                onPress={this.onConfirm}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    dialogBackground: {...commonStyles.dialogBackground,...{} },
    dialogContainer: {...commonStyles.dialogContainer,...{}},
    gradient: {...commonStyles.dialogGradient, ...{}},
    title: {
        ...commonStyles.mainText, ...{
            color: "#fff",
            fontSize: 20
        }
    },
    closeIcon: {
        height: 36,
        width: 36,
    },
    content: {...commonStyles.dialogContent},
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-evenly',
        marginTop: 16
    },
    buttonTitleStyle: {
        color: colors.secondColor,
        fontWeight: '700'
    }
});
