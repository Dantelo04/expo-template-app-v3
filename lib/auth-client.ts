import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: process.env.EXPO_PUBLIC_BETTER_AUTH_URL,
    fetchOptions: {
        credentials: "include",
    },
    plugins: [
        expoClient({
            scheme: process.env.EXPO_PUBLIC_APP_SCHEME || "expotemplateapp",
            storagePrefix: process.env.EXPO_PUBLIC_APP_SCHEME || "expotemplateapp",
            storage: SecureStore,
        }),
    ],
});
