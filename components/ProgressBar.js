import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

import styleVars from './../constants/Variables';
import colors from "./../constants/Colors";

export const ProgressBar = props => {
    const captionPosition = props.captionPosition ? props.captionPosition : 'center';
    const max = props.max ? props.max : 10;
    return (
        <View style={styles.container}>
            {captionPosition === 'top' &&
                <Text style={styles.progressTop}>{props.progress+'/'+max}</Text>
            }
            <View style={styles.bar}>
                {captionPosition === 'center' &&
                <Text style={styles.progressCenter}>{props.progress+'/'+max}</Text>
                }
                <LinearGradient colors={[colors.GREEN_GRADIENT.end, colors.GREEN_GRADIENT.start]}
                                locations={[0, 1]}
                                start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                                style={[styles.gradient, {width: props.progress*100/max + '%'}]}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        alignItems: 'flex-end',
    },
    progressTop: {
        fontSize: 12,
        color: colors.secondColor,
        marginBottom: 4
    },
    progressCenter: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 100
    },
    bar: {
        height: 20,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: styleVars.BORDER_RADIUS,
        backgroundColor: 'rgba(43, 49, 95, .08)'
    },
    gradient: {
        height: 20,
        borderRadius: styleVars.BORDER_RADIUS,
    }
});
