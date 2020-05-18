import React from 'react';
import {View, Image, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {CLOSE} from '../assets/images';

import styleVars from './../constants/Variables';
import commonStyles from "./../constants/Styles";
import colors from "../constants/Colors";

export const CloseHeader = props => {
    let textColor = colors.mainText;
    if (props.contentStyle === 'light') {
        textColor = "#fff"
    }
    return (
        <View style={styles.container}>
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={props.onClose}>
                <Image style={styles.icon}
                       source={CLOSE}
                />
            </TouchableHighlight>
            <Text style={[styles.text, {color: textColor}]}>{props.title}</Text>
            <View style={{}}>
                {props.onSave &&
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={props.onSave}>
                    <Image style={styles.icon}
                           source={CLOSE}
                    />
                </TouchableHighlight>}
            </View>
        </View>
    )
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
    icon: {
        height: styleVars.HEADER_HEIGHT,
        width: styleVars.HEADER_HEIGHT,
        alignSelf: 'flex-end'
    },
});
