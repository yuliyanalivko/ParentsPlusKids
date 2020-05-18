import {StyleSheet} from 'react-native';
import colors from "./Colors";
import styleVars from "./Variables";

export default StyleSheet.create({
    sectionTitle: {
        color: colors.mainText,
        fontWeight: '700',
        fontSize: 17,
        fontFamily: 'roboto-medium',
    },
    headerTitle: {
        color: colors.mainText,
        fontWeight: '700',
        fontSize: 22,
        lineHeight: 28,
        letterSpacing: 1,
        textTransform: 'uppercase',
        alignSelf: 'center',
    },
    mainText: {
        color: colors.mainText,
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 22
    },
    secondaryText: {
        color: colors.secondColor,
        fontWeight: "500",
        fontSize: 15,
        lineHeight: 22
    },

    screenContainer: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        minHeight: styleVars.WINDOW_HEIGHT,
        paddingBottom: styleVars.HEADER_HEIGHT
    },
    scrollSection: {
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        width: styleVars.WINDOW_WIDTH,
        paddingHorizontal: styleVars.SCREEN_PADDING_HORIZONTAL,
        paddingBottom: styleVars.BOTTOM_MENU_HEIGHT + styleVars.COMPONENT_GAP,
        paddingTop: styleVars.COMPONENT_GAP,
    },

    loginScreenContainer: {
        width: styleVars.WINDOW_WIDTH,
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#fff',
    },
    loginScreenTitle: {
        color: colors.mainText,
        fontWeight: '700',
        fontSize: 32,
        lineHeight: 44,
        marginBottom: 44,
        marginTop: 20
    },
    loginScreenScrollSection: {
        alignSelf: 'stretch',
        width: styleVars.WINDOW_WIDTH,
        paddingBottom: styleVars.BOTTOM_MENU_HEIGHT + styleVars.COMPONENT_GAP,
        paddingTop: styleVars.COMPONENT_GAP,
        alignItems: 'center',
        minHeight: styleVars.WINDOW_HEIGHT - styleVars.BOTTOM_MENU_HEIGHT,
        paddingHorizontal: styleVars.INNER_PADDING * 2
    },
    error: {
        color: colors.RED_GRADIENT.end,
        alignSelf: 'flex-start',
        marginBottom: 12,
        marginTop: -28
    },

    componentContainer: {
        alignSelf: 'center',
        width: styleVars.COMPONENT_WIDTH,
        backgroundColor: colors.componentBgColor,
        borderRadius: styleVars.BORDER_RADIUS,
        marginVertical: styleVars.COMPONENT_GAP / 2,
    },
    emptyContentText: {
        fontWeight: '700',
        fontSize: 16,
        color: colors.thirdColor,
        marginTop: 8,
        paddingHorizontal: styleVars.INNER_PADDING
    },
    userIcon: {
        width: styleVars.HEADER_HEIGHT * .8,
        height: styleVars.HEADER_HEIGHT * .8,
        borderRadius: styleVars.HEADER_HEIGHT * .5
    },
    icon: {
        width: 24,
        height: 24
    },
    shadow: {elevation: 4,},

    dialogBackground: {
        flex: 1,
        width: '100%',
        backgroundColor: '#1c1e2eaa',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialogContainer: {
        backgroundColor: colors.bgColor,
        borderRadius: styleVars.BORDER_RADIUS,
        width: '95%',
        height: 'auto',
        alignItems: 'center',
    },
    dialogGradient: {
        padding: styleVars.INNER_PADDING,
        alignSelf: 'stretch',
        height: 60,
        borderTopLeftRadius: styleVars.BORDER_RADIUS,
        borderTopRightRadius: styleVars.BORDER_RADIUS,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dialogTitle: {
        fontWeight: '700',
        lineHeight: 22,
        color: "#fff",
        fontSize: 20
    },
    dialogContent: {
        marginTop: styleVars.COMPONENT_GAP,
        padding: styleVars.INNER_PADDING,
        alignSelf: 'stretch',
        borderBottomLeftRadius: styleVars.BORDER_RADIUS,
        borderBottomRightRadius: styleVars.BORDER_RADIUS,
    }
})
;
