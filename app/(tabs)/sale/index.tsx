
import CostingHeader from "@/components/CostingHeader";
import CostingSafeAreaView from "@/components/CostingSafeAreaView";
import { spacing } from "@/styles";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";


const CARD_WIDTH = Dimensions.get('window').width - spacing.m * 5;


export default function IndexScreen() {
    const { colors } = useTheme();

    return (
        <CostingSafeAreaView >
            <CostingHeader title={'Mis Ventas'} />
        </CostingSafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.m,
        alignItems: 'stretch',
    },
})