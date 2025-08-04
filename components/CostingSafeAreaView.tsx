import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";

interface CostingSafeAreaViewProps extends SafeAreaViewProps {}

export default function MarketSafeAreaView({children} : CostingSafeAreaViewProps) {
    const { colors } = useTheme();
    return <SafeAreaView style={[styles.container,{backgroundColor: colors.background}]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
})