import CostingButton from "@/components/CostingButton";
import CostingSafeAreaView from "@/components/CostingSafeAreaView";
import CostingText from "@/components/CostingText";
import CostingTextInput from "@/components/CostingTextInput";
import CostingBackHeader from "@/components/headers/CostingBackHeader";
import { MEASURES } from "@/constants/Measures";
import { useIngredientStore } from "@/store";
import { spacing } from "@/styles";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Chip, useTheme } from "react-native-paper";

export default function CreateScreen() {
    const { colors } = useTheme();
    const { createIngredient } = useIngredientStore();
    const [name, setName] = useState<string | undefined>('');
    const [quantity, setQuantity] = useState<string | undefined>('');
    const [cost, setCost] = useState<string | undefined>('');
    const [measure, setMeasure] = useState<string | undefined>('');

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
        createIngredient({
            name: name!,
            capacity: parseFloat(quantity!),
            cost: parseFloat(cost!),
            measure: measure!
        });
        Alert.alert('Producto registrado', 'El producto ha sido registrado exitosamente');
        setName('');
        setQuantity('');    
        setCost('');
        setMeasure('');
    }
    return (
        <CostingSafeAreaView>
            <CostingBackHeader title="Crear Inventario" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <CostingText type={'subtitle'} style={styles.subtitle} >{`Registrar Producto`}</CostingText>
                    <CostingText>
                        Formulario de registro de inventario
                    </CostingText>
                    <View style={styles.inputContainer}>
                        <CostingTextInput label={'Nombre'} value={name} onChangeText={setName} keyboardType={'ascii-capable'} />
                        <View style={styles.measureWrapper}>
                            <CostingText type="bold" style={styles.sectionLabel}>
                                U. Medida
                            </CostingText>
                            <View style={styles.chipsWrapper}>
                                {
                                    MEASURES.map((val, index) => (
                                        <Chip
                                            key={index}
                                            selected={measure === val}
                                            selectedColor={measure === val ? colors.surface : colors.primary}
                                            elevated
                                            style={{ backgroundColor: measure === val ? colors.primary : colors.surface, borderWidth: 1 }}
                                            onPress={() => setMeasure(val)}>
                                            {val}
                                        </Chip>
                                    ))
                                }
                            </View>
                        </View>
                        <CostingTextInput label={'Cant. de Empaque'} value={quantity} onChangeText={setQuantity} keyboardType={'number-pad'} />
                        <CostingTextInput label={'Costo Adquisición'} value={cost} onChangeText={setCost} keyboardType={'decimal-pad'} />
                        {/* Form input */}
                    </View>
                    <CostingButton onPress={createInventoryHandler}>
                        Registrar Producto
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