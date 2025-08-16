import { auth } from '@/config/firebaseConfig';
import '@/i18n';
import { theme } from '@/styles';
import { useFonts } from 'expo-font';
import { router, Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  PaperProvider,
} from 'react-native-paper';
import 'react-native-reanimated';

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    OpenSans: require('../assets/fonts/OpenSans-Regular.ttf'),
    OpenSansMedium: require('../assets/fonts/OpenSans-Medium.ttf'),
    OpenSansBold: require('../assets/fonts/OpenSans-Bold.ttf'),
  });

  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const pathname = usePathname();

  /*useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);*/

  useEffect(() => {
    console.log('entra aqui prueba 2')
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !pathname.startsWith("/(drawer)")) {
        router.replace("/(drawer)");
      } else if (!user && pathname !== "/login") {
        router.replace("/login");
      }
      setAuthChecked(true);
      SplashScreen.hideAsync();
    })
    return unsubscribe;
  },[]) 

  if (!loaded || !authChecked) {
    return null;
  }

  //

  return (
    <GestureHandlerRootView style={styles.container}>
       
        <PaperProvider theme={theme}>
            <Stack initialRouteName='login'>
              <Stack.Screen name="login" options={{ headerShown: false }}/>
              <Stack.Screen name="create-account" options={{ headerShown: false }}/>
              <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});
