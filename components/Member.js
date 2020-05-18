import React from 'react';
import {Image, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import colors from '../constants/Colors';
import styleVars from '../constants/Variables';
import commonStyles from '../constants/Styles';

import {ADD} from '../assets/images';

export const Member = props => {
    const gradient = colors.gradient_1;
    const name = props.name;
    return (
        <TouchableHighlight onPress={props.onPress}>
            <LinearGradient colors={[gradient.start, gradient.end]}
                            locations={[0, 1]} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                            style={styles.container}>
                <Image source={ADD} style={styles.img}/>
                <Text  style={styles.monsterName}>{name}</Text>
            </LinearGradient>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    container: {
        width: 140,
        height: 194,
        borderRadius: styleVars.BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: styleVars.COMPONENT_GAP,
        padding: 8
    },
    img: {
        width: 100,
        height: 100
    },
    monsterName: {
        ...commonStyles.mainText, ...{
            color: '#fff',
            marginBottom: 10,
            lineHeight: 16,
            position: 'absolute',
            bottom: 0,
            flexWrap: 'wrap',
            textAlign: 'center'
        }
    }

});
