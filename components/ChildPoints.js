import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {STAR} from './../assets/images';

import commonStyles from './../constants/Styles';
import styleVars from './../constants/Variables';

export const ChildPoints = props => {
    return (
        <View style={styles.container}>
            <Image source={STAR} style={styles.icon}/>
            <Text style={styles.points}>{props.points}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 8,
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingHorizontal: styleVars.SCREEN_PADDING_HORIZONTAL
    },
    icon: {
        ...commonStyles.icon, ...{
            marginRight: 8
        }
    },
    points: {
        ...commonStyles.mainText, ...{
            fontSize: 18
        }
    }
});
