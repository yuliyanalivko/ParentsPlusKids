import React from "react";
import {Text, View, StyleSheet, Modal, Image, TouchableHighlight} from "react-native";

import styleVars from './../constants/Variables';
import colors from './../constants/Colors';
import {CLOSE} from './../assets/images';
import commonStyles from './../constants/Styles';
import {GradientButton} from "./GradientButton";
import {LinearGradient} from "expo-linear-gradient";
import Input from "./Input";
import {Dropdown} from "react-native-material-dropdown";

export class AddCustomTaskDialog extends React.Component {
    constructor(props) {
        super(props);
        this.setTaskOptions = this.setTaskOptions.bind(this);
        this.setBtnOpacity = this.setBtnOpacity.bind(this);
        this.updateState = this.updateState.bind(this);

        this.state = {
            task: '',
            stars: 0,
            leadTime: '1 день',
            btnOpacity: .5
        }
    }

    setTaskOptions() {
        alert(this.state.task + this.state.stars + this.state.leadTime)
        this.props.onCancel();
    }

    updateState(field, value) {
        field === 'task' ? this.setState({task: value}) :
            field === 'stars' ? this.setState({stars: value}) :
                field === 'leadTime' ? this.setState({leadTime: value}) : 0;
        this.setBtnOpacity();
    }

    setBtnOpacity() {
        if (this.state.task && this.state.stars) {
            if (this.state.stars >= 1 && this.state.stars <= 8) {
                this.setState({
                    btnOpacity: 1
                });
            }
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
                            <Text style={styles.title}>Создать задание</Text>
                            <TouchableHighlight underlayColor={'transparent'}
                                                onPress={this.props.onCancel}>
                                <Image style={styles.closeIcon}
                                       source={CLOSE}/>
                            </TouchableHighlight>
                        </LinearGradient>

                        <View style={styles.content}>
                            <Input label={'Введите задание:'}
                                   maxLength={50}
                                   onChangeText={(value) => this.updateState('task', value)}
                            />

                            <Input label={'Количество баллов (1-8):'}
                                   maxLength={1}
                                   keyboardType={'numeric'}
                                   pattern={'[1-8]'}
                                   onChangeText={(value) => this.updateState('stars', value)}
                            />
                            <Dropdown label='Время исполнения'
                                      value={'1 день'}
                                      data={[{value: '1 день'}, {value: '1 неделя'}, {value: 'Бессрочно'}]}
                                      textColor={colors.mainText}
                                      baseColor={colors.secondColor}
                                      fontSize={16}
                                      containerStyle={{fontWeight: '700'}}
                                      selectedItemColor={colors.mainText}
                                      disabledItemColor={colors.secondColor}
                                      onChangeText={(value) => this.updateState('leadtime', value)}/>

                            <View style={[styles.buttons, {opacity: this.state.btnOpacity}]}>
                                <GradientButton title={'Создать'}
                                                onPress={this.setTaskOptions}
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
    dialogBackground: {...commonStyles.dialogBackground, ...{}},
    dialogContainer: {...commonStyles.dialogContainer, ...{}},
    gradient: {...commonStyles.dialogGradient, ...{}},
    title: {...commonStyles.dialogTitle, ...{}},
    closeIcon: {
        height: 36,
        width: 36,
    },
    content: {...commonStyles.dialogContent},
    caption: {
        ...commonStyles.secondaryText, ...{
            color: colors.mainText
        }
    },
    lead: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    buttons: {
        alignSelf: 'center',
        marginTop: 16
    },
    buttonTitleStyle: {
        color: colors.secondColor,
        fontWeight: '700'
    }
});
