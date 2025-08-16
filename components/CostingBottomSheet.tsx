import { alertColors, spacing } from "@/styles";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { JSX, RefObject, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Icon } from "./ui/Icon";

export interface CostingBottomSheetProps /*extends BottomSheetModalProps*/ {
    bottomSheetRef: RefObject<BottomSheetModal | null>,
    editHandler?: () => void,
    deleteHandler?: () => void
}

export default function CostingBottomSheet({ bottomSheetRef, editHandler = () => {},deleteHandler = () => {}, ...rest}: CostingBottomSheetProps) :  JSX.Element{
    const { colors } = useTheme();
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={['40%']}
            enablePanDownToClose
            backdropComponent={({ style }) => (
                <View style={[style, { backgroundColor: colors.backdrop }]} />
            )}
            onChange={() => setIsBottomSheetOpen(false)}
            enableDynamicSizing={false}
            {...rest}
        >
            <BottomSheetView style={{ padding: spacing.m }}>
                <View>
                    <Text style={{ color: colors.onSurface, fontWeight: 'bold', fontSize: 16, marginBottom: spacing.s }}>Acciones</Text>
                    <TouchableOpacity 
                        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.s }}
                        onPress={editHandler}
                    >
                        <View style={{ padding: 8, marginRight: 12 }}>
                            <Icon name="pencil-outline" size={18} color={alertColors.info} />
                        </View>
                        <Text style={{ color: colors.onSurface, fontSize: 16 }}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={deleteHandler}
                    >
                        <View style={{ padding: 8, marginRight: 12 }}>
                            <Icon name="trash-can-outline" size={18} color={alertColors.error} />
                        </View>
                        <Text style={{ color: colors.onSurface, fontSize: 16 }}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    )
}