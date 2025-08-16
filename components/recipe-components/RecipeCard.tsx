import { ACTIVE_OPACITY, spacing } from "@/styles";
import { JSX } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import CostingText from "../CostingText";
import { Icon, ICON_SIZE } from "../ui/Icon";

const CARD_WIDTH = Dimensions.get('window').width - spacing.m * 5;

export function RecipeCard({ recipe }: any): JSX.Element {
    const { colors } = useTheme();
    return (
        <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={() => { }} key={recipe.id} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.outlineVariant }]}>
            <View
                style={[styles.imageContainer, { borderColor: colors.outlineVariant }]}
            >
                <Image source={{ uri: recipe.image }} style={styles.image} />
            </View>
            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <CostingText type="bold">{recipe.name}</CostingText>
                </View>

                <View
                    style={styles.textContainer}
                >
                    <Icon
                        name={'counter'}
                        size={ICON_SIZE}
                        color={colors.primary}
                    />
                    <Text>{recipe.ingredientsCount} ingredientes</Text>
                </View>
                <View
                    style={styles.textContainer}
                >
                    <Icon
                        name={'cash'}
                        size={ICON_SIZE}
                        color={colors.primary}
                    />
                    <Text>S/. {recipe.salePrice}</Text>
                </View>
                <View
                    style={styles.textContainer}
                >
                    <Icon
                        name={'clock-outline'}
                        size={ICON_SIZE}
                        color={colors.primary}
                    />
                    <Text>{recipe.timePreparation} min</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: CARD_WIDTH - spacing.m * 2,
        borderRadius: spacing.m,
        borderWidth: 1,
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderWidth: 1,
        borderTopStartRadius: spacing.m,
        borderTopEndRadius: spacing.m,
    },
    image: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: spacing.m,
        borderTopRightRadius: spacing.m
    },
    content: {
        paddingVertical: spacing.s,
        paddingHorizontal: spacing.s,
        marginTop: spacing.s,

    },
    titleContainer: {

    },
    title: {
        flexShrink: 1,
        fontSize: 1
    },
    price: {
        fontSize: 14,
        marginTop: -spacing.s / 2
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.s,
    },
})