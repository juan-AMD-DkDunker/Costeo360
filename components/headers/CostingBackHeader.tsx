import { spacing } from '@/styles';
import { router } from 'expo-router';
import React, { JSX } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import CostingText from '../CostingText';
import { Icon, ICON_SIZE } from '../ui/Icon';

const ICON_BUTTON_SIZE = 40;

interface CostingBackHeaderProps {
    title: string
}

export default function CostingBackHeader({title}: CostingBackHeaderProps): JSX.Element {
    const { colors } = useTheme();
    const goBackHandler = () => {
        router.back();
    }
    return (
        <View
            style={styles.headerLeftWrapper}
        >
            <View style={styles.icon}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={goBackHandler}
                >
                    <Icon
                        name={'arrow-left'}
                        size={ICON_SIZE}
                        color={colors.onSurface}
                    />
                </TouchableOpacity>
            </View>
            <CostingText numberOfLines={1} type={'medium'} style={styles.screenName}>
                {title}
            </CostingText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        padding: spacing.s,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        zIndex: 100,
        elevation:10,
        left: 0,
    },
    icon: {
        width: ICON_BUTTON_SIZE,
        height: ICON_BUTTON_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    headerLeftWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
    },
    screenName: {
        fontSize: 18,
        flexShrink: 1,
        maxWidth: '80%',
        marginLeft: spacing.s / 2,
    },
})