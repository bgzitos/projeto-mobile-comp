import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import { Text } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from '../context/ThemeContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const [fontsLoaded, fontError] = useFonts({
        ...FontAwesome.font,
        ...Ionicons.font,
    });

    useEffect(() => {
        if (fontError) {
            console.error("Erro ao carregar fontes:", fontError);
        }

        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ThemeProvider>
            <SafeAreaProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="game/[id]" options={{ 
                        headerShown: false,
                        animation: 'slide_from_right' 
                      }} 
                    />
                </Stack>
            </SafeAreaProvider>
        </ThemeProvider>
    );
}