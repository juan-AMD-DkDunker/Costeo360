import { Icon } from '@/components/ui/Icon';
import { DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { Image } from 'react-native';
import { useTheme } from 'react-native-paper';

const drawerIcon = (name: string) => ({ color, focused }: { color: string, focused: boolean }) => <Icon size={28} name={`${name}${focused ? '' : '-outline'}` as any} color={color} />

export default function DrawerLayout() {
    const { colors } = useTheme();
    return (
        <Drawer
            initialRouteName='(tabs)'
            drawerContent={(props) => (
                <>
                    <Image

                        source={require('@/assets/images/splash-icon.png')}
                        style={{ width: 150, height: 150, alignSelf: 'center', marginBottom: 20 }} 
                        resizeMode='contain'
                    />
                    {/* Add your custom drawer content here, or use DrawerItemList if using react-navigation/drawer */}
                    {/* Example for react-navigation/drawer: <DrawerItemList {...props} /> */}
                     <DrawerItemList {...props} />
                </>
            )}
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: colors.onSecondary, // Cambia este color al que desees
                drawerItemStyle:{
                    borderRadius: 0
                },
                drawerInactiveTintColor: '#000', // Color para los elementos inactivos
            }}
        >
            {/* Drawer screens will be visible in the drawer menu */}
            <Drawer.Screen
                name="(tabs)"
                options={{
                    title: 'Home',
                    drawerIcon: drawerIcon('home')
                }}

            />
            <Drawer.Screen
                name="(account)"
                options={{
                    title: 'Cuenta',
                    drawerIcon: drawerIcon('account')
                }}
            />
            <Drawer.Screen
                name="(quotations)"
                options={{
                    title: 'Mis Cotizaciones',
                    drawerIcon: drawerIcon('file-document')
                }}
            />
        </Drawer>
    );
}