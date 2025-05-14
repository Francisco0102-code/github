import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { Vibration, View, Text, Pressable, TextInput } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'  }}>
             <Text style={{ fontFamily: 'SpaceMono', fontSize: 40, color: '#000'  }}>
              Informe Seu User Do Github
            </Text>
            <TextInput style={{ height: 50, borderColor: 'gray', borderWidth: 1, width: '50%', marginTop: 30, paddingLeft: 20 , borderRadius: 12}} 
            placeholder="Digite seu Email" />

<TextInput style={{ height: 50, borderColor: 'gray', borderWidth: 1, width: '50%', marginTop: 30, paddingLeft: 20 , borderRadius: 12}} 
            placeholder="Digite seu Senha" />

<Pressable 

  style={{ justifyContent: 'space-between', width: '50%',borderWidth:1, 
  boxShadow: '15px 14px 10px rgba(0, 0, 0, 0.85)',
   padding: 15, marginTop: 20, borderColor: '#fff', 
   borderRadius: 30, backgroundColor: '#000' }}>

  <Text style={{ color: '#fff', textAlign: 'center' }}>
Entrar
  </Text>
</Pressable>
    

</View>

    </ThemeProvider>
  );
}

