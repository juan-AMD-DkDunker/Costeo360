import { spacing } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { JSX, useCallback } from "react";
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { useTheme } from "react-native-paper";
import { CostingTextFontFamily } from "./CostingText";
import { ICON_SIZE } from "./ui/Icon";

interface CostingSearchBarProps extends TextInputProps{
    readOnly?: boolean;
    showBackButton?: boolean;
}

export default function CostingSearchBar({readOnly,showBackButton, ...props} : CostingSearchBarProps): JSX.Element {
    
    const { onPress } = props;

    const theme = useTheme();

    const handleBackPress = useCallback(
      () => {
        router.back();
      },
      [],
    )
    

    let WrapperConponent;

    if(readOnly){
        WrapperConponent = Pressable;
    }else{
        WrapperConponent = View;
    }

    return (
        <WrapperConponent style={[styles.container,{backgroundColor: theme.colors.surfaceVariant}]} onPress={readOnly ? onPress : undefined}>
            <Ionicons 
                name= { showBackButton ? 'arrow-back': 'search' } 
                size={ICON_SIZE} 
                color={theme.colors.onSurface} 
                style={styles.icon} 
                onPress={handleBackPress}
            />
            <TextInput
                onPress={readOnly ? onPress : undefined}
                editable = {!readOnly}
                style={[styles.input, {color: theme.colors.onSurface}]}
                placeholderTextColor={theme.colors.onSurface}
                {...props}
            />
        </WrapperConponent>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        paddingHorizontal: spacing.m,
        height: 50
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: CostingTextFontFamily.OPEN_SANS_MEDIUM,
    }
})