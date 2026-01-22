import { Slot } from 'expo-router';

export default function RootLayout() {
<<<<<<< HEAD
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="tool-details" options={{ presentation: 'modal', title: 'tool details', headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
=======
  return <Slot />;
}
>>>>>>> a998ff6 (Fix authentication and routing - app now working)
