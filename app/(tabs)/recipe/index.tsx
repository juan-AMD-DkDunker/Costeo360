
import CostingHeader from "@/components/CostingHeader";
import CostingSafeAreaView from "@/components/CostingSafeAreaView";
import CostingSearchBar from "@/components/CostingSearchBar";
import CostingText from "@/components/CostingText";
import { Icon, ICON_SIZE } from "@/components/ui/Icon";
import { ACTIVE_OPACITY, spacing } from "@/styles";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FAB, useTheme } from "react-native-paper";

const recipes = [
    {
        id: 1,
        name: 'Pastel de Chocolate',
        image: 'https://i.ytimg.com/vi/IgBxLrsX5qw/maxresdefault.jpg',
        ingredientsCount: 8,
        salePrice: 200,
        timePreparation: 30,
    },
    {
        id: 2,
        name: 'Tarta de Manzana',
        image: 'https://3.bp.blogspot.com/-lx-tp3TU_D8/UJvBbnj9rLI/AAAAAAAAAQA/HwSTsbMK8aM/s1600/Tarta+de+Manzana+Casera.jpg',
        ingredientsCount: 5,
        salePrice: 150,
        timePreparation: 25,
    }
];

const CARD_WIDTH = Dimensions.get('window').width - spacing.m * 5;


export default function IndexScreen() {
    const { colors } = useTheme();

    const createRecipeHandler = () => {
        router.push('/(tabs)/recipe/create');
    }

    const keyExtractor = useCallback((item: any) => { return item.id.toString() }, []);

    const renderItem = useCallback(({ item }: { item: typeof recipes[0] }) => {
        return (
            <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={() => { }} key={item.id} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.outlineVariant }]}>
                <View
                    style={[styles.imageContainer, { borderColor: colors.outlineVariant }]}
                >
                    <Image source={{ uri: item.image }} style={styles.image} />
                </View>
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <CostingText type="bold">{item.name}</CostingText>
                    </View>
                    
                    <View
                        style={styles.textContainer}
                    >
                        <Icon
                            name={'counter'}
                            size={ICON_SIZE}
                            color={colors.primary}
                        />
                        <Text>{item.ingredientsCount} ingredientes</Text>
                    </View>
                    <View
                        style={styles.textContainer}
                    >
                        <Icon
                            name={'cash'}
                            size={ICON_SIZE}
                            color={colors.primary}
                        />
                        <Text>S/. {item.salePrice}</Text>
                    </View>
                    <View
                        style={styles.textContainer}
                    >
                        <Icon
                            name={'clock-outline'}
                            size={ICON_SIZE}
                            color={colors.primary}
                        />
                        <Text>{item.timePreparation} min</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }, []);
    return (
        <CostingSafeAreaView >
            <CostingHeader title={'Mis Recetas'} />
            <View style={[styles.searchBarContent, { backgroundColor: colors.surface }]}>
                <CostingSearchBar onPress={() => {}} placeholder={'Buscar Receta'} />
            </View>
            <View style={styles.container}>
                <FlatList
                    decelerationRate={'fast'}
                    data={recipes}
                    renderItem={renderItem}
                    snapToInterval={CARD_WIDTH + spacing.m}
                    snapToAlignment="start"
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={6}
                    keyExtractor={keyExtractor}
                    maxToRenderPerBatch={6}
                />
            </View>
            <FAB
                icon="plus"
                style={[styles.fab, { backgroundColor: colors.primary }]}
                onPress={createRecipeHandler}
                color={colors.onPrimary}
            />
        </CostingSafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.m,
        alignItems: 'stretch',
    },
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
    fab: {
        position: 'absolute',
        margin: spacing.m,
        right: 0,
        bottom: 0,
    },
    subtitle: {
        marginBottom: spacing.s,
    },
    searchBarContent: {
        paddingHorizontal: spacing.m,
        paddingTop: spacing.s,
        paddingBottom: spacing.m,
    }
})