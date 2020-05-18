import React from 'react';
import {View, Image, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {ADD} from "../assets/images";

import styleVars from './../constants/Variables';
import commonStyles from "./../constants/Styles";

export const TitleHeader = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
            {props.onPress &&
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={props.onPress}>
                <Image style={styles.img}
                       source={ADD}
                />
            </TouchableHighlight>
            }
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
    img: {
        height: styleVars.HEADER_HEIGHT * 0.8,
        width: styleVars.HEADER_HEIGHT * 0.8,
        borderRadius: styleVars.HEADER_HEIGHT * 0.5,
    }
});
