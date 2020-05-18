import React from 'react';
import {View, Image, Text, StyleSheet, TouchableHighlight} from 'react-native';

import styleVars from './../constants/Variables';
import colors from "./../constants/Colors";
import commonStyles from '../constants/Styles';
import {BACK} from "./../assets/images"

export const BackHeader = props => {
    return (
        <View style={styles.container}>
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => props.navigation.goBack(null)}>
                <Image style={styles.img}
                       source={BACK}
                />
            </TouchableHighlight>
            <View style={styles.childSection}>
                <Text style={styles.text}>{props.name}</Text>
                <Image style={commonStyles.userIcon}
                       source={BACK}
                />
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
    text: {
        color: colors.mainText,
        fontWeight: '700',
        fontSize: 16,
        alignSelf: 'center',
        marginRight: 8
    },
    img: {
        height: styleVars.HEADER_HEIGHT*0.8,
        width: styleVars.HEADER_HEIGHT*0.8,
        borderRadius: styleVars.HEADER_HEIGHT*0.5,
    },
    childSection: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
