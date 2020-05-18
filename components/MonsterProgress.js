import React from 'react';
import {StyleSheet, View, Image, Text} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {ProgressBar} from "./ProgressBar";

import styleVars from './../constants/Variables';
import colors from "./../constants/Colors";
import commonStyles from "./../constants/Styles";

class MonsterProgress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gradient: (this.props.name === 'Опоздун') ? colors.NON_PUNCTUAL_GRADIENT
                : (this.props.name === 'Неряш') ? colors.SLOPPY_GRADIENT
                    : (this.props.name === 'Дапотомчик') ? colors.PUT_THINGS_OFF_GRADIENT
                        : (this.props.name === 'УменяНеПолучайка') ? colors.GIVE_UP_GRADIENT
                            : (this.props.name === 'Леняш') ? colors.LAZINESS_GRADIENT
                                : (this.props.name === 'Невнимашка') ? colors.CARELESSNESS_GRADIENT
                                    : colors.GREY_GRADIENT
        }
    }

    render() {
        return (
            <View style={[styles.container, commonStyles.shadow]}>
                <LinearGradient colors={[this.state.gradient.start, this.state.gradient.end]}
                                locations={[0, 1]}
                                start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                                style={styles.gradient}>
                    <Image style={styles.monsterImg}
                           source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
                </LinearGradient>
                <View style={styles.textBlock}>
                    <View style={styles.textContent}>
                        <Text style={styles.name}>{this.props.name}</Text>
                        <Text style={styles.description}
                              numberOfLines={2}>
                            {this.props.description}</Text>
                    </View>
                    <ProgressBar progress={this.props.progress}
                                 captionPosition={'top'}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...commonStyles.componentContainer, ...{
            height: 140,
            flexDirection: 'row',
        }
    },
    gradient: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: styleVars.BORDER_RADIUS,
        borderBottomLeftRadius: styleVars.BORDER_RADIUS,
        height: 140,
        width: 140,
    },
    monsterImg: {
        height: 100,
        width: 100,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
    },
    textBlock: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        flexDirection: 'column',
        padding: styleVars.INNER_PADDING,
        height: '100%',
    },
    textContent: {
        flex: 1
    },
    name: {
        ...commonStyles.mainText, ...{
            fontSize: 18,
            marginBottom: 4
        }
    },
    description: {
        ...commonStyles.secondaryText, ...{
            fontWeight: '700',
            lineHeight: 18
        }
    }
});
export default MonsterProgress;
