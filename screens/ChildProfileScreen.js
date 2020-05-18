import React from 'react';
import {StyleSheet, View, ScrollView, StatusBar} from "react-native";
import {TitleHeader} from "./../components/TitleHeader";
import {SectionHeader} from "./../components/SectionHeader";

import commonStyles from './../constants/Styles';
import styleVars from './../constants/Variables'
import {ChildPoints} from "../components/ChildPoints";
import {Member} from "../components/Member";


const FAMILY = [
    {
        id: '1',
        name: 'Мама',
    },
    {
        id: '2',
        name: 'Папа',
    }
];

export const ChildProfileScreen = props => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor='#fff'/>
            <TitleHeader title='МОЙ АККАУНТ'
                         onPress={()=>props.navigation.navigate('Settings')}/>
            <ChildPoints points={24}/>

            <ScrollView contentContainerStyle={styles.scrollSection}>
                <View style={styles.section}>
                    <SectionHeader title={'Семья'}/>
                    <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{
                                marginRight: -styleVars.SCREEN_PADDING_HORIZONTAL,
                                marginBottom: styleVars.COMPONENT_GAP
                            }}>
                    {FAMILY.length > 0 &&
                    FAMILY.map(item => (
                        <Member name={item.name} onPress={() => props.navigation.navigate('Parent')}/>
                    ))}
                </ScrollView>

                    <SectionHeader title={'Награды'}/>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {...commonStyles.screenContainer},
    questionHead: {
        alignSelf: 'stretch'
    },
    section: {
        marginTop: styleVars.SECTION_MARGIN
    },
    scrollSection: {
        ...commonStyles.scrollSection, ...{
            paddingTop: 0
        }
    }
});
