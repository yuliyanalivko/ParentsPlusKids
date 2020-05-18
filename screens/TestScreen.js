import React from 'react';
import {View, Text, Image, TouchableHighlight, StyleSheet, StatusBar} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {GradientButton} from "../components/GradientButton";
import {CloseHeader} from "../components/CloseHeader";
import {ADD} from '../assets/images';

import colors from '../constants/Colors';
import styleVars from '../constants/Variables';
import commonStyles from '../constants/Styles';
import {ProgressBar} from "../components/ProgressBar";
import {TestResultDialog} from "../components/TestResultDialog";

const TEST = [
    {
        monster: 'Леняш',
        minPoints: 5,
    },
    [{
        question: 'Мама попросила тебя помыть посуду, но скоро начинается любимый мультик!',
        options: [
            {
                option: 'Я побегу смотреть мультик! Посуда никуда не денется.',
                points: 2
            },
            {
                option: 'Перемою посуду и пойду смотреть мультик.',
                points: 0
            },
            {
                option: 'Я помою до начала мультика, что успею, остальное потом.',
                points: 1
            }]
    },
        {
            question: 'Ты знаешь, что тебе нельзя есть мандарины, но ты их любишь.',
            options: [
                {
                    option: 'Я не буду есть, что мне нельзя.',
                    points: 0
                },
                {
                    option: 'Я съем только пару долек!',
                    points: 1
                },
                {
                    option: 'Даже если нельзя, буду есть сколько захочу',
                    points: 2
                }]
        },
        {
            question: 'Ты хочешь новый компьютер, а родители говорят, что не купят.',
            options: [
                {
                    option: 'Я еще раз намекну родителям, что хочу компьютер.',
                    points: 1
                },
                {
                    option: 'Я буду требовать новый компьютер!',
                    points: 2
                },
                {
                    option: 'Я промолчу, потерплю.',
                    points: 0
                }]
        },
        {
            question: 'Тебе нужно встать рано утром. Звонит будильник.',
            options: [
                {
                    option: 'Проснусь и встану без проблем.',
                    points: 0
                },
                {
                    option: 'Полежу еще минут 10 после будильника.',
                    points: 1
                },
                {
                    option: 'Буду спать дальше…',
                    points: 2
                }]
        }]
];

const OptionContainer = props => {
    const isActive = props.active ? props.active : false;
    let textColor = isActive ? '#fff' : colors.secondColor;
    let borderColor = isActive ? colors.GREEN_GRADIENT.end : colors.thirdColor;
    let backgroundColor = isActive ? colors.GREEN_GRADIENT.end : '#fff';

    return (
        <TouchableHighlight underlayColor={'transparent'}
                            onPress={props.onPress}>
            <View style={[styles.optionContainer, {borderColor: borderColor, backgroundColor: backgroundColor}]}>
                <Text style={[styles.option, {color: textColor}]}>{props.option}</Text>
            </View>
        </TouchableHighlight>
    )
};

class TestScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.setOptionActive = this.setOptionActive.bind(this);
        this.state = {
            currentQuestionNumber: 0,
            chosenOption: 0,
            currentQuestionPoints: TEST[1][0].options[0].points,
            pointCount: 0,

            dialogVisible: false
        }
    }

    handleNext() {
        if (this.state.currentQuestionNumber <= TEST.length) {
            const newPoints = TEST[1][this.state.currentQuestionNumber + 1].options[0].points;
            this.setState({
                currentQuestionNumber: 1 + this.state.currentQuestionNumber,
                pointCount: this.state.pointCount + this.state.currentQuestionPoints,
                chosenOption: 0,
                currentQuestionPoints: newPoints
            });
        } else {
            this.setState({
                dialogVisible: true
            })

        }
    }

    setOptionActive(points, index) {
        this.setState({
            chosenOption: index,
            currentQuestionPoints: points
        });
    }

    handleConfirm() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <LinearGradient colors={[colors.mainGradient.start, colors.mainGradient.end]}
                            locations={[0, 1]} start={{x: 0.5, y: 0}} end={{x: .5, y: 1}}
                            style={styles.container}>
                <StatusBar barStyle={'light-content'} backgroundColor={colors.mainGradient.start}/>
                <CloseHeader onClose={() => this.props.navigation.goBack()}/>
                <Image source={ADD} style={styles.img}/>
                <View style={styles.testContainer}>
                    <ProgressBar captionPosition={'center'}
                                 progress={this.state.currentQuestionNumber + 1}
                                 max={TEST[1].length}/>
                    <View style={styles.questionContainer}>
                        <Text style={styles.question}>
                            {TEST[1][this.state.currentQuestionNumber].question}</Text>
                    </View>
                    {TEST[1][this.state.currentQuestionNumber].options.map((item, index) => (
                        <OptionContainer option={item.option}
                                         active={index === this.state.chosenOption}
                                         onPress={() => this.setOptionActive(item.points, index)}/>
                    ))}
                    <GradientButton title={'Далее'} onPress={this.handleNext}/>
                </View>

                <TestResultDialog visible={this.state.dialogVisible}
                                  message={'Отлично! Этот монстр не был обнаружен внутри тебя. Ты молодец!'}
                                  onConfirm={this.handleConfirm}
                />
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    img: {
        width: 250,
        height: 250
    },
    testContainer: {
        width: styleVars.COMPONENT_WIDTH,
        borderRadius: styleVars.BORDER_RADIUS,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: styleVars.INNER_PADDING,
        position: 'absolute',
        bottom: styleVars.SCREEN_PADDING_HORIZONTAL
    },
    questionContainer: {
        marginVertical: styleVars.COMPONENT_GAP,
        height: 70,
        justifyContent: 'center',
        textAlign: 'center'

    },
    question: {
        ...commonStyles.mainText, ...{
            fontSize: 18,
        }
    },
    optionContainer: {
        borderRadius: styleVars.BORDER_RADIUS,
        borderWidth: 0.8,
        width: styleVars.COMPONENT_WIDTH - 2 * styleVars.INNER_PADDING,
        alignItems: 'flex-start',
        paddingHorizontal: styleVars.INNER_PADDING,
        marginBottom: styleVars.COMPONENT_GAP,
        minHeight: 64,
        justifyContent: 'center'
    },
    option: {...commonStyles.secondaryText, ...{}}

});

export default TestScreen;
