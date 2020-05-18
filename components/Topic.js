import React from 'react';
import {StyleSheet, View, Text, Image} from "react-native";
import {TextButton} from "./TextButton";

import styleVars from './../constants/Variables';
import commonStyles from "./../constants/Styles";

class Topic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isTextHidden: true,
            numOfLines: 2,
            buttonText: 'Читать далее...'
        }
    }

    changeTextState() {
        const newNumOfLines = (this.state.numOfLines === 2) ? 0 : 2;
        const newButtonText = (this.state.buttonText === 'Читать далее...') ? 'Скрыть' : 'Читать далее...';
        this.setState({
            isTextHidden: !this.state.isTextHidden,
            numOfLines: newNumOfLines,
            buttonText: newButtonText
        })
    }

    render() {
        return (
            <View style={[styles.container, commonStyles.shadow]}>
                <View style={styles.textBlock}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.innerText}
                          numberOfLines={this.state.numOfLines}>{this.props.innerText}</Text>
                    <TextButton title={this.state.buttonText}
                                style={styles.textButton}
                                onPress={this.changeTextState.bind(this)}/>
                </View>
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {...commonStyles.componentContainer},
    textBlock: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        padding: styleVars.INNER_PADDING,
        alignItems: 'flex-start'
    },
    title: {
        ...commonStyles.mainText, ...{
            fontSize: 20,
            marginBottom: 12
        }
    },
    innerText: {
        ...commonStyles.secondaryText, ...{}
    },
    textButton: {
        marginTop: 12,
        fontSize: 13
    },
    image: {
        width: '100%',
        height: 200,
        borderBottomRightRadius: styleVars.BORDER_RADIUS,
        borderBottomLeftRadius: styleVars.BORDER_RADIUS
    }
});
export default Topic;
