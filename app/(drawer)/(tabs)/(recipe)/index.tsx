
import CostingFloatingButton from "@/components/CostingFloatingButton";
import CostingHeader from "@/components/CostingHeader";
import CostingSafeAreaView from "@/components/CostingSafeAreaView";
import CostingSearchBar from "@/components/CostingSearchBar";
import { RecipeCard } from "@/components/recipe-components/RecipeCard";
import { spacing } from "@/styles";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";

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
        router.push('/(tabs)/(recipe)/create');
    }

    const keyExtractor = useCallback((item: any) => { return item.id.toString() }, []);

    const renderItem = useCallback(({ item }: { item: typeof recipes[0] }) => {
        return (
            <RecipeCard recipe={item} />
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
            <CostingFloatingButton createHandler={createRecipeHandler} />
        </CostingSafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.m,
        alignItems: 'stretch',
    },
    searchBarContent: {
        paddingHorizontal: spacing.m,
        paddingTop: spacing.s,
        paddingBottom: spacing.m,
    }
})