import { Stack } from "expo-router";
import SafeScreen from "@/components/SafeScreen.jsx"
import {NhostClient, NhostProvider} from "@nhost/react";
import * as SecureStore from "expo-secure-store"
import { useMemo } from "react";

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
      <SafeScreen>
        <Stack screenOptions={{headerShown:false}} />
      </SafeScreen>
    </NhostProvider>
  )
}