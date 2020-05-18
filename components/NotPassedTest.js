import React from 'react';
import {View, Image, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import colors from '../constants/Colors';
import styleVars from '../constants/Variables';
import commonStyles from '../constants/Styles';

import {ADD} from '../assets/images';
import {GradientButton} from "./GradientButton";

export const NotPassedTest = props => {
    const gradient = (props.title === 'Опоздун') ? colors.NON_PUNCTUAL_GRADIENT
        : (props.title === 'Неряш') ? colors.SLOPPY_GRADIENT
            : (props.title === 'Дапотомчик') ? colors.PUT_THINGS_OFF_GRADIENT
                : (props.title === 'УменяНеПолучайка') ? colors.GIVE_UP_GRADIENT
                    : (props.title === 'Леняш') ? colors.LAZINESS_GRADIENT
                        : (props.title === 'Невнимашка') ? colors.CARELESSNESS_GRADIENT
                            : colors.GREY_GRADIENT;

    return (
        <TouchableHighlight onPress={props.onPress} underlayColor={'transparent'}>
            <LinearGradient colors={[gradient.start, gradient.end]}
                            locations={[0, 1]} start={{x: 0.2, y: 0}} end={{x: 0.7, y: 1}}
                            style={styles.container}>
                <View style={{height: '100%', justifyContent: 'space-between'}}>
                    <View>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.description}>{props.description}</Text>
                    </View>
                    <GradientButton title={'Пройти тест'}
                                    backgroundGradient={{start: '#fff', end: '#fff'}}
                                    titleColor={colors.mainText}
                                    width={100}
                                    onPress={props.onPress}/>
                </View>
                <Image source={ADD} style={styles.img}/>
            </LinearGradient>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    container: {
        ...commonStyles.componentContainer, ...{
            height: 164,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: 1.15 * styleVars.INNER_PADDING
        }
    },
    img: {
        width: 100,
        height: 100
    },
    title: {
        ...commonStyles.mainText, ...{
            color: '#fff',
            fontSize: 24,
            marginBottom: 8,
            flexWrap: 'wrap',
        }
    },
    description: {
        ...commonStyles.secondaryText, ...{
            color: '#fff',
            marginBottom: 10,
            flexWrap: 'wrap',
        }
    }

});
