import React from 'react';
import {View, Image, Text, StyleSheet,TouchableHighlight} from 'react-native'

export const UserButton = props => {
    return (
        <TouchableHighlight underlayColor={'transparent'}
                            onPress={props.onPress}>
            <View style={styles.button}>
                <Image
                    style={styles.img}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                <Text style={styles.text}>
                    {props.title}
                </Text>
            </View>
        </TouchableHighlight>
    )
};


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#ff9362'
    },
    text: {
        color: '#fff',
        fontSize: 20,
        marginTop: 14
    }
});
