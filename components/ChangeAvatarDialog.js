import React from "react";
import {Text, View, StyleSheet, Modal} from "react-native";

import styleVars from './../constants/Variables';
import colors from './../constants/Colors';
import {GradientButton} from "./GradientButton";
import {Avatar} from "./Avatar";
import commonStyles from "../constants/Styles";

const DATA = [
    {
        id: 1,
        isSelected: true
    },
    {
        id: 2,
        isSelected: false
    },
    {
        id: 3,
        isSelected: false
    },
];

export class ChangeAvatarDialog extends React.Component {

    constructor(props) {
        super(props);
        this.selectImg = this.selectImg.bind(this);
        this.state ={
            activeImgId: 1
        }
    }

    selectImg(id){
        this.setState ({
            activeImgId: id
        })
    }

    render() {
        return (
            <Modal transparent={true}
                   visible={this.props.visible}>
                <View style={styles.dialogBackground}>

                    <View style={styles.dialogContainer}>
                        <Avatar size={200} isSelected={true}/>
                        <View style={styles.avatarList}>
                            {DATA.map((item) => (
                                <Avatar size={70} isSelected={(item.id===this.state.activeImgId)}
                                        onPress={()=>this.selectImg(item.id)}/>
                            ))}
                        </View>
                        <GradientButton title={'Выбрать'} onPress={this.props.onConfirm}/>
                    </View>
                </View>
            </Modal>
        );
    }
};

const styles = StyleSheet.create({
    dialogBackground: {...commonStyles.dialogBackground,...{} },
    dialogContainer: {...commonStyles.dialogContainer,...{}},
    avatarList: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'stretch',
        marginTop: 20,
        marginBottom: 40
    },

});
