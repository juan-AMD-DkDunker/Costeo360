import { spacing } from "@/styles";
import { StyleSheet } from "react-native";
import { FAB, useTheme } from "react-native-paper";

interface CostingFloatingButtonProps {
    createHandler: () => void;
}

export default function CostingFloatingButton({ createHandler }: CostingFloatingButtonProps) {
    const { colors } = useTheme();
    return (
        <FAB
            icon="plus"
            style={[styles.fab, { backgroundColor: colors.primary }]}
            onPress={createHandler}
            color={colors.onPrimary}
        />
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: spacing.m,
        right: 0,
        bottom: 0
    },
});