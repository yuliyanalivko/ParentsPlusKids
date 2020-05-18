import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from "react-native";

import colors from "./../constants/Colors";

export const TextButton = props => {
    const color = (props.color)?props.color:colors.activeColor;
    return (
        <TouchableHighlight
            onPress={props.onPress}
            underlayColor={'transparent'}
            style={props.style}>
            <View style={styles.container}>
                <Text style={[styles.title, {color: color}]}>{props.title}</Text>
            </View>
        </TouchableHighlight>
    )
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: colors.activeColor,
        fontSize: 16,
        fontWeight: '500'
    }
});
