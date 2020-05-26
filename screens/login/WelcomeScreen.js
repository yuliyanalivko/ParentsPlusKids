import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableHighlight, StatusBar} from 'react-native'
import {UserButton} from "../../components/UserButton";
import {LinearGradient} from 'expo-linear-gradient';
import colors from "../../constants/Colors"

class WelcomeScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <LinearGradient
                start={{x: 0.5, y: 0.0}} end={{x: 0.5, y: 1.0}}
                locations={[0, 1]}
                colors={[colors.mainGradient.start, colors.mainGradient.end]}
                style={styles.container}>
                <StatusBar barStyle={'light-content'} backgroundColor={colors.mainGradient.start}/>
                <View style={styles.header}>
                    <Text style={styles.logo}>Parents+Kids</Text>
                    <Text style={styles.headerText}>Кто вы?</Text>
                </View>
                    <UserButton title="Я ребенок"
                                onPress={() => navigate('EnterCode', {userType: 'child'})}/>
                    <UserButton title="Я родитель"
                                onPress={() => navigate('EnterCode', {userType: 'parent'})}/>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        color: '#fff',
        fontSize: 40,
        fontWeight: '700',
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
    }
});

export default WelcomeScreen;
