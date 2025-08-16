import CostingHeader from "@/components/CostingHeader";
import CostingSafeAreaView from "@/components/CostingSafeAreaView";
import CostingText from "@/components/CostingText";
//import { useAppSelector } from "@/redux/hooks";
import { StyleSheet, View } from "react-native";

export default function AccountScreen() {

  return (
    <CostingSafeAreaView>
      <CostingHeader title={`Crear Cotización`} />
      <View style={{ flex: 1 }}>
        <CostingText>Formulario de creación de cotización</CostingText>
      </View>
    </CostingSafeAreaView>
  );
}

const styles = StyleSheet.create({

})