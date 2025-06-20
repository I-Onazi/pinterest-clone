import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // Prevent going back to auth screens after authentication
        gestureEnabled: false,
      }}
    >
      <Stack.Screen 
        name="SignInScreen" 
        options={{
          title: 'Sign In',
        }} 
      />
      <Stack.Screen 
        name="SignUpScreen" 
        options={{
          title: 'Sign Up',
        }} 
      />
    </Stack>
  );
}