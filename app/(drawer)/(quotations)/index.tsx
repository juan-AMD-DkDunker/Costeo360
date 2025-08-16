
import CostingHeader from "@/components/CostingHeader";
import CostingSafeAreaView from "@/components/CostingSafeAreaView";
import CostingSearchBar from "@/components/CostingSearchBar";
import CostingText from "@/components/CostingText";
import { spacing } from "@/styles";
import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { FAB, useTheme } from "react-native-paper";

export default function QuotationsScreen() {
    const { colors } = useTheme();
    const createQuotationHandler = () => {
        router.push('/(drawer)/(quotations)/create');
    }
    return (
        <CostingSafeAreaView>
            <CostingHeader title={`Mis Cotizaciones`} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >



                <View style={styles.container}>
                    <CostingText style={styles.subtitle} type="medium">
                        Aquí puedes ver y gestionar todas las cotizaciones que has generado.

                    </CostingText>
                    <View style={[styles.searchBarContent, { backgroundColor: colors.surface }]}>
                        <CostingSearchBar onPress={() => { }} placeholder={'Buscar Cotización'} />
                    </View>
                </View>
                <FAB
                    icon="plus"
                    style={[styles.fab, { backgroundColor: colors.primary }]}
                    onPress={createQuotationHandler}
                    color={colors.onPrimary}
                />
            </KeyboardAvoidingView>
        </CostingSafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.m,
        alignItems: 'stretch',
    },
    keyboardAvoidingView: {
        flex: 1
    },
    subtitle: {
        marginBottom: spacing.s,
    },
    searchBarContent: {
        paddingTop: spacing.s,
        paddingBottom: spacing.m,
    },
    fab: {
        position: 'absolute',
        margin: spacing.m,
        right: 0,
        bottom: 0,
    },
})