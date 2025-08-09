import CostingButton from "@/components/CostingButton";
import CostingSafeAreaView from "@/components/CostingSafeAreaView";
import CostingText from "@/components/CostingText";
import CostingTextInput from "@/components/CostingTextInput";
import CostingBackHeader from "@/components/headers/CostingBackHeader";
import { spacing } from "@/styles";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

const items = [
    {
        key: 1,
        name: 'Harina de Trigo para Repostería',
        measure: 'kg',
        capacity: 1,
        cost: 'S/ 2.50'
    },
];

export default function CreateScreen() {
    const { colors } = useTheme();

    const [name, setName] = useState<string | null>('');
    const [quantity, setQuantity] = useState<string | null>('');
    const [cost, setCost] = useState<string | null>('');
    const [measure, setMeasure] = useState<string | null>('');

    const addIngredientHandler = () => {
        router.push('/(tabs)/recipe/add-ingredient');
    }

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
    return (
        <CostingSafeAreaView>
            <CostingBackHeader title="Crear Receta" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <CostingText type={'subtitle'} style={styles.subtitle}>{`Registrar Receta`}</CostingText>
                    <CostingText>
                        Formulario de registro de receta
                    </CostingText>
                    <View style={styles.inputContainer}>
                        <CostingTextInput label={'Nombre'} onChangeText={setName} keyboardType={'ascii-capable'} />
                        <View style={{ marginBottom: spacing.l }}>
                            <CostingText type="bold" style={styles.sectionLabel}>
                                Ingredientes
                            </CostingText>

                            {/* Lista de ingredientes */}

                            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.s }}>
                                <CostingText style={{ color: colors.onSurface }}>No hay ingredientes agregados</CostingText>
                                <CostingButton
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 30,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 0,
                                    }}
                                    onPress={addIngredientHandler}
                                >
                                    +
                                </CostingButton>
                            </View>
                        </View>
                        <CostingText type="bold" style={styles.sectionLabel}>
                            Tiempo de Preparación
                        </CostingText>
                        <CostingTextInput label={'Tiempo de Preparación'} onChangeText={setQuantity} keyboardType={'number-pad'} />
                        <CostingText type="bold" style={styles.sectionLabel}>
                            ¿Cuántas unidades rinde la receta?
                        </CostingText>
                        <CostingTextInput label={'Unidades'} onChangeText={setQuantity} keyboardType={'number-pad'} />
                        <CostingText type="bold" style={styles.sectionLabel}>
                            ¿Porcentaje adicional sobre costos (mano de obra, agua, electricidad, etc)?
                        </CostingText>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.s }}>
                            <View style={{ flex: 1 }}>
                                <CostingTextInput label={'Costo Adicional'} onChangeText={setCost} keyboardType={'decimal-pad'} />
                            </View>
                            <CostingText style={styles.sectionDescription}>%</CostingText>
                        </View>
                        <CostingText type="bold" style={styles.sectionLabel}>
                            ¿Porcentaje de beneficio esperado?
                        </CostingText>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.s }}>
                            <View style={{ flex: 1 }}>
                                <CostingTextInput
                                    label={'Beneficio Esperado'}
                                    onChangeText={setCost}
                                    keyboardType={'decimal-pad'}
                                />
                            </View>
                            <CostingText style={styles.sectionDescription}>%</CostingText>
                        </View>

                        {/* Form input */}
                    </View>
                    <CostingButton onPress={createInventoryHandler}>
                        Registrar Receta
                    </CostingButton>
                    <View style={styles.emptyComponent} />
                </ScrollView>
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
    }
})