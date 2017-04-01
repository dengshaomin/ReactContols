import colors from '../values/colors';
import fonts from '../values/fonts';
import { StyleSheet, Image } from 'react-native'
export default StyleSheet.create({
    contailer: {
        flex: 1,
        backgroundColor: colors.backGround,
    },
    font1_14: {
        color: colors.font1,
        fontSize: fonts.font14,
    },
    font1_13: {
        color: colors.font1,
        fontSize: fonts.font13,
    },
    font1_12: {
        color: colors.font1,
        fontSize: fonts.font12,
    },
    font1_10: {
        color: colors.font1,
        fontSize: fonts.font10,
    },
    font2_14: {
        color: colors.font2,
        fontSize: fonts.font14,
    },
    font2_13: {
        color: colors.font2,
        fontSize: fonts.font13,
    },
    font2_12: {
        color: colors.font2,
        fontSize: fonts.font12,
    },
    font2_10: {
        color: colors.font2,
        fontSize: fonts.font10,
    },
    miniIcon: {
        resizeMode: Image.resizeMode.contain,
        width: 20, height: 20
    },
    gameIcon: {
        resizeMode: Image.resizeMode.contain,
        width: 60, height: 60
    },
    logoIcon: {
        resizeMode: Image.resizeMode.contain,
        width: 80, height: 80
    },
    diverLine: {
        height: 0.5,
        backgroundColor: colors.diverLine
    },
    bigSpace: {
        height: 7,
        backgroundColor: colors.diverLine
    },
    tag: {
        color: colors.green,
        borderColor: colors.green,
        borderWidth: 0.5,
        paddingLeft: 3,
        paddingRight: 3,
        fontSize: fonts.font10,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    progressButton: {
        color: colors.green,
        borderColor: colors.green,
        borderRadius: 25,
        borderWidth: 0.5,
        height: 30, width: 70,
        fontSize: fonts.font12,
        textAlign: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
    }
});