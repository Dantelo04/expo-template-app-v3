import { Redirect } from "expo-router";
import { useSession } from "@/context/SessionProvider";

export default function Index() {
  const { session, isInitialized } = useSession();

  if (!isInitialized) return null;
  if (session) return <Redirect href="/(tabs)/home" />;
  return <Redirect href="/sign-in" />;
}
