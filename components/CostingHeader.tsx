import { spacing } from "@/styles";
import { JSX } from "react";
import { StyleSheet, View } from "react-native";
import CostingText from "./CostingText";

interface CostingHeaderProps {
    title: string;
}

export default function CostingHeader({title} : CostingHeaderProps) : JSX.Element {
    return (
        <View style={styles.container}>
            <CostingText type={'title'}>{title}</CostingText>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.m,
    }
});