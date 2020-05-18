import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';

import styleVars from './../constants/Variables';
import colors from "./../constants/Colors";

export const GradientButton = props => {

    const gradient = (props.backgroundGradient)
        ? props.backgroundGradient : colors.buttonGradient;
    const titleColor = (props.titleColor)
        ? props.titleColor : '#fff';
    return (
        <TouchableHighlight
            onPress={props.onPress}
            underlayColor={'transparent'}>
            <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                            locations={[0, 1]}
                            colors={[gradient.start, gradient.end]}
                            style={[styles.container, {width: props.width}]}>
                <Text style={[styles.title, {color: titleColor}]}>{props.title}</Text>
            </LinearGradient>
        </TouchableHighlight>
    )

};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: styleVars.SCREEN_PADDING_HORIZONTAL,
        paddingHorizontal: 32,
        height: 40,
        borderRadius: 20,
        minWidth: 160
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    }
});
