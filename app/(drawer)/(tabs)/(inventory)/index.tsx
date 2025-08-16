import CostingBottomSheet from "@/components/CostingBottomSheet";
import CostingHeader from "@/components/CostingHeader";
import CostingSafeAreaView from "@/components/CostingSafeAreaView";
import CostingSearchBar from "@/components/CostingSearchBar";
import { Ingredient } from "@/services/ingredient/ingredientService";
import { useIngredientStore } from "@/store";
import { spacing } from "@/styles";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable, FAB, useTheme } from "react-native-paper";

export default function InventoryScreen() {

  const { ingredients, fetchIngredients, deleteIngredient, loading, error } = useIngredientStore();
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [itemSelected, setItemSelected] = useState<Ingredient | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { colors } = useTheme();
  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useFocusEffect(
    useCallback(() => {
      fetchIngredients();
    }, [fetchIngredients])
  );

  const handleOpenBottomSheet = useCallback((item: Ingredient) => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current?.present();
      setItemSelected(item);
    }
  }, []);


  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, ingredients.length);

  const createInventoryHandler = () => {
    router.push('/(tabs)/(inventory)/create');
  }

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);



  const editHandler = () => {
    router.push(`/(tabs)/(inventory)/${itemSelected?.id}`);
    /*router.push({
      pathname: `/(tabs)/(inventory)/${itemSelected?.id}`,
      params: {...itemSelected}
    });*/
  }

  const deleteHandler = () => {
    if(itemSelected != null){
      deleteIngredient(itemSelected.id!);
      if (bottomSheetRef.current) {
        bottomSheetRef.current?.close();
        setItemSelected(null);
      }
    }
  }

  const searchIngredientHandler = (value : string) => {
    setSearchQuery(value);
  }

  return (
    <CostingSafeAreaView>
      <BottomSheetModalProvider>
        <CostingHeader title={'Mi inventario'} />
        <FAB
            icon="plus"
            style={[styles.fab, { backgroundColor: colors.primary }]}
            onPress={createInventoryHandler}
            color={colors.onPrimary}
        />
        <View style={styles.container}>
          <CostingSearchBar onChangeText={(value) => searchIngredientHandler(value)}  placeholder={'Buscar Ingrediente'} />
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 2 }}>Ingrediente</DataTable.Title>
              <DataTable.Title numeric style={{ flex: 1 }}>Und.</DataTable.Title>
              <DataTable.Title numeric style={{ flex: 1 }}><Text numberOfLines={2} ellipsizeMode="tail">Cap. Empaque</Text></DataTable.Title>
              <DataTable.Title numeric style={{ flex: 1 }}>Costo</DataTable.Title>
            </DataTable.Header>

            {filteredIngredients.slice(from, to).map((item) => (
              <DataTable.Row
                key={item.id}
                onLongPress={() => handleOpenBottomSheet(item)}
              >
                <DataTable.Cell style={{ flex: 2 }}><Text numberOfLines={2} ellipsizeMode="tail">{item.name}</Text></DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 1 }}>{item.measure}</DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 1 }}>{item.capacity}</DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 1 }}>{item.cost}</DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(ingredients.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} de ${ingredients.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={'Registros por pag.'}
            />
          </DataTable>
        </View>
        <CostingBottomSheet bottomSheetRef={bottomSheetRef} editHandler={editHandler} deleteHandler={deleteHandler}/>
      </BottomSheetModalProvider>
    </CostingSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.m,
    alignItems: 'stretch',
  },
  fab: {
    position: 'absolute',
    margin: spacing.m,
    right: 0,
    top: 25,
  },
  subtitle: {
    marginBottom: spacing.s,
  },
})