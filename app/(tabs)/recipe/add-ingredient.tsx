import CostingButton from "@/components/CostingButton";
import CostingSafeAreaView from "@/components/CostingSafeAreaView";
import CostingSearchBar from "@/components/CostingSearchBar";
import CostingText from "@/components/CostingText";
import CostingBackHeader from "@/components/headers/CostingBackHeader";
import { Icon } from "@/components/ui/Icon";
import { alertColors, spacing } from "@/styles";
import React, { useCallback, useState } from "react";
import { Alert, FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

const items = [
    {
        key: 1,
        name: 'Harina sin preparar',
        measure: 'gramos',
        capacity: 1000,
        cost: 'S/ 3.70',
        selected: false
    },
    {
        key: 2,
        name: 'Gelatina sin sabor',
        measure: 'gramos',
        capacity: 30,
        cost: 'S/ 2.00',
        selected: false
    },
    {
        key: 3,
        name: 'Huevos',
        measure: 'unidades',
        capacity: 15,
        cost: 'S/  10.00',
        selected: true
    },

    {
        key: 4,
        name: 'Manzanas',
        measure: 'gramos',
        capacity: 1000,
        cost: 'S/   5.00',
        selected: true
    }
];

export default function AddIngredientScreen() {
    const { colors } = useTheme();

    const [name, setName] = useState<string | null>('');
    const [quantity, setQuantity] = useState<string | null>('');
    const [cost, setCost] = useState<string | null>('');
    const [measure, setMeasure] = useState<string | null>('');


    const createInventoryHandler = () => {
        const missingfields = [];
        if (!name) missingfields.push('name');
        if (!quantity) missingfields.push('quantity');
        if (!cost) missingfields.push('cost');
        if (!measure) missingfields.push('measure');

        if (missingfields.length > 0) {
            Alert.alert('Te falta información', 'Necesitas agregar la información requerida para poder registrar el producto' + missingfields.join(", "));
            return;
        }
    }

    const keyExtractor = useCallback((item: any) => { return item.key.toString() }, []);

    const renderItem = useCallback(({ item }: { item: typeof items[0] }) => {
        return (
            <View key={item.key} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.outlineVariant }]}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <CostingText type="bold">{item.name}</CostingText>
                    {item.selected && (
                        <Icon name="check-circle-outline" size={18} color={alertColors.success} style={{ marginLeft: 4 }} />
                    )}
                </View>
                <View style={{ flex: 1 }}>
                    <CostingText>{`Medida: ${item.measure}`}</CostingText>
                    <CostingText>{`Cantidad: ${item.capacity}`}</CostingText>
                    <CostingText>{`Costo: ${item.cost}`}</CostingText>
                </View>
                {item.selected ? (
                    <CostingButton
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 0,
                            backgroundColor: colors.error,
                        }}
                        onPress={() => {
                            Alert.alert('Quitar ingrediente', `¿Deseas quitar "${item.name}" de la lista?`);
                        }}
                    >
                        <Icon size={15} name={'minus'} color={colors.onError} />
                    </CostingButton>
                ) : (
                    <CostingButton
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 0,
                        }}
                        onPress={() => { }}
                    >
                        <Icon size={15} name={'plus'} color={colors.onPrimary} />
                    </CostingButton>
                )}
            </View>
        )
    }, []);

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <CostingText style={styles.subtitle} type="medium">
                Agrega los ingredientes necesarios para tu receta
            </CostingText>
            <CostingSearchBar onPress={() => {}} placeholder={'Buscar Ingrediente'} />
        </View>
    );

    return (
        <CostingSafeAreaView >
            <CostingBackHeader title="Añadir ingredientes" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View style={styles.container}>
                    <FlatList
                        decelerationRate={'fast'}
                        data={items}
                        renderItem={renderItem}
                        snapToAlignment="start"
                        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={6}
                        keyExtractor={keyExtractor}
                        ListHeaderComponent={renderHeader}
                        ListFooterComponent={() => <View style={styles.footer} />}
                        maxToRenderPerBatch={6}
                    />
                </View>
            </KeyboardAvoidingView>
        </CostingSafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.m,
    },
    keyboardAvoidingView: {
        flex: 1
    },
    subtitle: {
        marginBottom: spacing.s,
    },
    inputContainer: {
        marginVertical: spacing.l,
    },
    measureWrapper: {
        marginBottom: spacing.m,
    },
    sectionLabel: {
        marginBottom: spacing.s / 2,
    },
    sectionDescription: {
        fontSize: 14,
        width: 'auto'
    },
    chipsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.s,
        marginVertical: spacing.m,
    },
    emptyComponent: {
        height: spacing.s,
    },
    card: {
        width: '100%',
        borderWidth: 1,
        padding: spacing.s,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.s
    },
    headerContainer: {
        marginBottom: spacing.m,
    },
    footer: {
        height: spacing.s,
    },
})