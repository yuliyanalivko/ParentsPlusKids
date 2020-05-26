import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
    StatusBar,
    AsyncStorage,
    ActivityIndicator
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {GradientButton} from "../components/GradientButton";
import {CloseHeader} from "../components/CloseHeader";
import {ADD} from '../assets/images';

import colors from '../constants/Colors';
import styleVars from '../constants/Variables';
import commonStyles from '../constants/Styles';
import {ProgressBar} from "../components/ProgressBar";
import {TestResultDialog} from "../components/TestResultDialog";

/*const TEST = [
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
];*/

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
            isLoading: true,
            TEST: [],

            dialogVisible: false
        }
    }

    handleNext() {
        if (this.state.currentQuestionNumber < this.state.TEST.questions.length-1) {
            const newPoints = this.state.TEST.questions[this.state.currentQuestionNumber + 1].answers[0].points;
            this.setState({
                currentQuestionNumber: 1 + this.state.currentQuestionNumber,
                pointCount: this.state.pointCount + this.state.currentQuestionPoints,
                chosenOption: 0,
                currentQuestionPoints: newPoints
            });
        } else {
            this.setState({
                dialogVisible: true,
                pointCount: this.state.pointCount + this.state.currentQuestionPoints
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

    componentDidMount = async () => {
        const getTest = async () => {
            let testBuf = [];
            const {testId} = this.props.route.params;
            let questions = [];
            await fetch(`http://10.0.2.2:9000/test/${testId}`)
                .then(response => response.json())
                .then(test => {
                    test.forEach(item => {
                        const answers = JSON.parse(item.answers);
                        const points = JSON.parse(item.points);
                        let answersArr = [];
                        answers.forEach((answer, ind) => {
                            answersArr.push({
                                answer: answers[ind],
                                points: points[ind]
                            });
                        });
                        questions.push({
                            question: item.question,
                            answers: answersArr
                        })
                    });
                    this.setState({
                        TEST: {
                            monster: test[0].monster,
                            minPoints: test[0].minPoints,
                            questions: questions,
                        },
                        currentQuestionNumber: 0,
                        chosenOption: 0,
                        currentQuestionPoints: questions[0].answers[0].points,
                        pointCount: 0,
                        isLoading: false
                    });
                });
        };
        getTest();
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, marginTop: '30%'}}>
                    <ActivityIndicator color={colors.activeColor} size={'large'}/>
                </View>
            )
        }
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
                                 max={this.state.TEST.questions.length}/>
                    <View style={styles.questionContainer}>
                        <Text style={styles.question}>
                            {this.state.TEST.questions[this.state.currentQuestionNumber].question}</Text>
                    </View>
                    {this.state.TEST.questions[this.state.currentQuestionNumber].answers.map((item, index) => (
                        <OptionContainer option={item.answer+'-'+item.points}
                                         active={index === this.state.chosenOption}
                                         onPress={() => this.setOptionActive(item.points, index)}/>
                    ))}
                    <GradientButton title={'Далее'} onPress={this.handleNext}/>
                </View>

                <TestResultDialog visible={this.state.dialogVisible}
                                  monster={this.state.TEST.monster}
                                  message={this.state.pointCount<=this.state.TEST.minPoints?
                                      'Отлично! Этот монстр не был обнаружен внутри тебя. Ты молодец!':
                                      `О-оу, кажется, в тебе живет монстр... Давай прогоним его вместе!`
                                  }
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
