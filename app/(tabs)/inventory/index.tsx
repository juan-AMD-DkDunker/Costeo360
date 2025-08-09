import CostingHeader from "@/components/CostingHeader";
import CostingSafeAreaView from "@/components/CostingSafeAreaView";
import CostingSearchBar from "@/components/CostingSearchBar";
import { spacing } from "@/styles";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable, FAB, useTheme } from "react-native-paper";

const items = [
  {
    key: 1,
    name: 'Harina sin preparar',
    measure: 'gramos',
    capacity: 1000,
    cost: 'S/ 3.70'
  },
  {
    key: 2,
    name: 'Gelatina sin sabor',
    measure: 'gramos',
    capacity: 30,
    cost: 'S/ 2.00'
  },
  {
    key: 3,
    name: 'Huevos',
    measure: 'unidades',
    capacity: 15,
    cost: 'S/  10.00'
  },

  {
    key: 4,
    name: 'Manzanas',
    measure: 'gramos',
    capacity: 1000,
    cost: 'S/   5.00'
  }
];

export default function InventoryScreen() {

  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([20]);
  const { colors } = useTheme();
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  const createInventoryHandler = () => {
    router.push('/(tabs)/inventory/create');
  }

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <CostingSafeAreaView>
      <CostingHeader title={'Mi inventario'} />
      <View style={styles.container}>
        <CostingSearchBar onPress={() => {}} placeholder={'Buscar Ingrediente'} />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 2 }}>Ingrediente</DataTable.Title>
            <DataTable.Title numeric style={{ flex: 1 }}>Und.</DataTable.Title>
            <DataTable.Title numeric style={{ flex: 1 }}>Cap. Empaque</DataTable.Title>
            <DataTable.Title numeric style={{ flex: 1 }}>Costo</DataTable.Title>
          </DataTable.Header>

          {items.slice(from, to).map((item) => (
            <DataTable.Row key={item.key}>
              <DataTable.Cell style={{ flex: 2 }}><Text numberOfLines={2} ellipsizeMode="tail">{item.name}</Text></DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 1 }}>{item.measure}</DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 1 }}>{item.capacity}</DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 1 }}>{item.cost}</DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} de ${items.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Registros por pag.'}
          />
        </DataTable>
      </View>
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={createInventoryHandler}
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
  fab: {
    position: 'absolute',
    margin: spacing.m,
    right: 0,
    bottom: 0,
  },
  subtitle: {
    marginBottom: spacing.s,
  },
})