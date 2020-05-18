import {Dimensions} from 'react-native';

const windowWidth = Math.round(Dimensions.get('window').width);
const windowHeight = Math.round(Dimensions.get('window').height);
const screenPaddingHorizontal = 14;

export default {
    SCREEN_PADDING_HORIZONTAL: 14,
    INNER_PADDING: 14,
    BORDER_RADIUS: 20,
    WINDOW_WIDTH: windowWidth,
    WINDOW_HEIGHT: windowHeight,
    COMPONENT_WIDTH: windowWidth - 2*screenPaddingHorizontal,
    HEADER_HEIGHT: 50,
    BOTTOM_MENU_HEIGHT: 56,
    SECTION_GAP: 32,
    COMPONENT_GAP: 14,
    SECTION_HEADER_BOTTOM_MARGIN: 14,
    SECTION_HEADER_TOP_MARGIN: 32
};
