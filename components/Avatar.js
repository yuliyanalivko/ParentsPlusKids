import {StyleSheet, TouchableHighlight, Image} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import React from "react";
import {ADD} from "../assets/images";

import colors from "../constants/Colors";
import commonStyles from "../constants/Styles";

export const Avatar = props => {
    const size = props.size;
    const gradient = (props.isSelected)?colors.mainGradient:{start: '#ffffffff', end: "#ffffffff"};
    return (
        <TouchableHighlight underlayColor={'transparent'} onPress={props.onPress}>
            <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                            locations={[0, 1]}
                            colors={[gradient.start, gradient.end]}
                            style={[styles.container,
                                {
                                    height: size,
                                    width: size,
                                    borderRadius: size,
                                }, commonStyles.shadow]
                            }>
                <Image
                    style={{
                        height: size * 0.9,
                        width: size * 0.6
                    }}
                    source={ADD}
                />
            </LinearGradient>
        </TouchableHighlight>
    )
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }
});
