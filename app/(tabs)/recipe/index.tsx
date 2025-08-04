import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function RecipeScreen(){
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Receta Screen</Text>
      <Button mode="contained" onPress={() => {}}>
        Crear Receta
      </Button>
    </View>
  );
}