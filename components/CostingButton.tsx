import { spacing } from "@/styles";
import { StyleSheet } from "react-native";
import { Button, ButtonProps, useTheme } from "react-native-paper";
import { CostingTextFontFamily } from "./CostingText";

interface CostingButtonProps extends ButtonProps { };


export default function CostingButton({ children, mode = 'contained', ...rest }: CostingButtonProps) {

    const { colors } = useTheme();

    const buttonColor = mode === 'contained' ? colors.primary : undefined;
    const textColor = mode === 'contained' ? colors.surface : undefined;

    return (
        <Button buttonColor={buttonColor} textColor={textColor}  style={styles.button} labelStyle={styles.labelStyle} mode={mode} {...rest}>
            {children}
        </Button>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: spacing.s / 2,
    },
    labelStyle:{
        fontFamily: CostingTextFontFamily.OPEN_SANS_BOLD,
        fontSize: 16,
    }
})