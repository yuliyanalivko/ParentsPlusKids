import React from 'react';
import {Image, StyleSheet, Text, View, TouchableHighlight} from "react-native";
import commonStyles from "./../constants/Styles";
import styleVars from './../constants/Variables';
import {ADD} from './../assets/images';

export const SectionHeader = props => {
    return (
        <View style={[styles.headContainer, props.style]}>
            <Text style={commonStyles.sectionTitle}>{props.title}</Text>
            {props.onPressIcon &&
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={props.onPressIcon}>
                <Image
                    style={styles.icon}
                    source={ADD}
                />
            </TouchableHighlight>
            }
        </View>
    );
};
const styles = StyleSheet.create({
    headContainer: {
        alignSelf: 'center',
        width: styleVars.WINDOW_WIDTH-2*styleVars.SCREEN_PADDING_HORIZONTAL,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: styleVars.SECTION_HEADER_BOTTOM_MARGIN,
        marginTop: styleVars.SECTION_HEADER_TOP_MARGIN
    },
    icon: {
        height: 28,
        width: 28,
    }
});
