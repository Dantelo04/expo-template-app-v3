import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { authClient } from "@/lib/auth-client";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

SplashScreen.preventAutoHideAsync();

interface User {
  id: string;
  name: string;
  emailVerified: boolean;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
}

interface SessionContextType {
  session: any | null;
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  isAuthenticated: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  refreshSession: () => Promise<void>;
  clearError: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [session, setSession] = useState<any | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    try {
      setIsLoading(true);
      const currentSession: any = await authClient.getSession();
      if (currentSession?.data) {
        setSession(currentSession.data.session);
        setUser(currentSession.data.user as User);
      }
    } catch (err) {
      setError("Failed to initialize session");
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
      await SplashScreen.hideAsync();
    }
  };

  const refreshSession = useCallback(async () => {
    try {
      setIsLoading(true);

      let attempts = 0;
      let currentSession = null;

      while (attempts < 5) {
        const result: any = await authClient.getSession();
        if (result?.data?.session) {
          currentSession = result;
          break;
        }
        attempts++;
        await new Promise((res) => setTimeout(res, 300));
      }

      if (currentSession?.data) {
        setSession(currentSession.data.session);
        setUser(currentSession.data.user as User);
      } else {
        setSession(null);
        setUser(null);
      }
    } catch (err) {
      setError("Failed to refresh session");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await SecureStore.deleteItemAsync("expotemplateapp_cookie");
      await SecureStore.deleteItemAsync("expotemplateapp_session_data");
      await authClient.signIn.email(
        { email, password },
        {
          onError: (err) => {
            setError(err?.error?.message || "Failed to sign in");
          },
        }
      );
    } catch (err) {
      setError("Unexpected error during sign-in");
    } finally {
      await refreshSession();
      setIsLoading(false);
    }
  }, [refreshSession]);

  const signInWithGoogle = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await SecureStore.deleteItemAsync("expotemplateapp_cookie");
      await SecureStore.deleteItemAsync("expotemplateapp_session_data");
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${
          process.env.EXPO_PUBLIC_APP_SCHEME || "expotemplateapp"
        }://`,
      });
    } catch (err) {
      setError("Unexpected error during sign-in with Google");
    } finally {
      await refreshSession();
      setIsLoading(false);
    }
  }, [refreshSession]);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await authClient.signUp.email(
        { email, password, name },
        {
          onError: (err) => {
            setError(err?.error?.message || "Failed to sign up");
          },
        }
      );
    } catch (err) {
      setError("Unexpected error during sign-up");
    } finally {
      await refreshSession();
      setIsLoading(false);
    }
  }, [refreshSession]);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await authClient.signOut();
    } catch (err) {
      // Server failed, clean up locally anyway
    } finally {
      setSession(null);
      setUser(null);
      await SecureStore.deleteItemAsync("expotemplateapp_cookie");
      await SecureStore.deleteItemAsync("expotemplateapp_session_data");
      try { await AsyncStorage.clear(); } catch (_) {}
      setIsLoading(false);
    }
  }, []);

  const deleteAccount = useCallback(async () => {
    setIsLoading(true);
    try {
      await authClient.deleteUser();
    } catch (err) {
      setError("Unexpected error during delete account");
    } finally {
      setSession(null);
      setUser(null);
      await SecureStore.deleteItemAsync("expotemplateapp_cookie");
      await SecureStore.deleteItemAsync("expotemplateapp_session_data");
      try { await AsyncStorage.clear(); } catch (_) {}
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value: SessionContextType = useMemo(() => ({
    session,
    user,
    isLoading,
    isInitialized,
    isAuthenticated: !!session,
    error,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    deleteAccount,
    refreshSession,
    clearError,
  }), [
    session, user, isLoading, isInitialized, error,
    signIn, signInWithGoogle, signUp, signOut, deleteAccount,
    refreshSession, clearError,
  ]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const useUser = () => useSession().user;

export const useAuth = () => {
  const { isAuthenticated, isLoading } = useSession();
  return { isAuthenticated, isLoading };
};
