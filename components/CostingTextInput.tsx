import { spacing } from "@/styles";
import { JSX } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, TextInputProps, useTheme } from "react-native-paper";

interface CostingTextInputProps extends TextInputProps { }

/**
 * CostingTextInput component renders a customizable text input field with a clear button.
 * 
 * @param {object} props - The properties object.
 * @param {string} [props.mode='outlined'] - The mode of the TextInput, default is 'outlined'.
 * @param {function} props.onChangeText - Callback function to handle text change events.
 * @param {object} [props.rest] - Additional properties to pass to the TextInput component.
 * 
 * @returns {JSX.Element} The rendered CostingTextInput component.
 */
export default function CostingTextInput({ mode = 'outlined',value , onChangeText, ...rest }: CostingTextInputProps): JSX.Element {
    const { colors } = useTheme();

    const clearValueHandler = () => {
        onChangeText && onChangeText('')
    }
    
    return (
        <View style={styles.textInputWrapper}>
            <TextInput
                mode={mode}
                value={value}
                onChangeText={onChangeText}
                outlineStyle={{ borderColor: colors.onSurface }}
                cursorColor={colors.onSurface}
                activeOutlineColor={colors.onSurface}
                right={<TextInput.Icon icon={'close-circle'} color={colors.onSurface} size={20} onPress={clearValueHandler} />}
                {...rest}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    textInputWrapper: {
        marginBottom: spacing.m,
    }
});