import React from 'react';
import {StyleSheet, View} from "react-native";
import {BackHeader} from "../components/BackHeader";
import ParentTopTabNavigator from "../navigation/ParentTopTabNavigator";

import colors from './../constants/Colors';
import styleVars from './../constants/Variables';

export const ParentChildScreen = props => {
    return (
      <View style={styles.container}>
          <BackHeader name={'Артем'}
          navigation={props.navigation}/>
         <ParentTopTabNavigator/>
      </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgColor,
        minHeight: styleVars.WINDOW_HEIGHT+styleVars.HEADER_HEIGHT,
    }
});
