import { Stack, useRouter, useSegments } from "expo-router";
import SafeScreen from "@/components/SafeScreen.jsx"
import { NhostClient, NhostProvider } from "@nhost/react";
import * as SecureStore from "expo-secure-store"
import { useMemo, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { View, ActivityIndicator, StyleSheet } from 'react-native';

// Loading component for authentication check
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#0066cc" />
  </View>
);

// Navigation logic component
const NavigationHandler = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Don't navigate while loading

    const inAuthGroup = segments[0] === 'auth';
    const inRootGroup = segments[0] === '(root)' || !segments[0];

    if (!isAuthenticated && !inAuthGroup) {
      // User is not authenticated and not in auth screens, redirect to auth
      router.replace('/auth/SignInScreen');
    } else if (isAuthenticated && inAuthGroup) {
      // User is authenticated but in auth screens, redirect to main app
      router.replace('/(root)');
    }
  }, [isAuthenticated, isLoading, segments]);

  return <>{children}</>;
};

// Main app content with authentication logic
const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading screen while checking authentication status
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeScreen>
      <NavigationHandler>
        <Stack 
          key={isAuthenticated ? 'authenticated' : 'unauthenticated'}
          screenOptions={{ 
            headerShown: false,
            animation: 'fade',
            animationDuration: 200 
          }}
          initialRouteName={isAuthenticated ? "(root)" : "auth"}
        >
          {isAuthenticated ? (
            // Authenticated users see the main app
            <>
              <Stack.Screen name="(root)" options={{ headerShown: false }} />
              <Stack.Screen name="screens" options={{ headerShown: false }} />
            </>
          ) : (
            // Unauthenticated users see auth screens
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          )}
        </Stack>
      </NavigationHandler>
    </SafeScreen>
  );
};

export default function RootLayout() {
  // Use useMemo to ensure the client is only created once
  const nhost = useMemo(() => {
    return new NhostClient({
      subdomain: 'oxcidbsqpvbmmokihvmq',
      region: 'eu-central-1',
      clientStorageType: "expo-secure-storage",
      clientStorage: SecureStore
    })
  }, []);

  return (
    <NhostProvider nhost={nhost}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </NhostProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});