import { View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { Text } from "@/components/Text/Text";
import { Button } from "@/components/Button/Button";
import { useSession } from "@/context/SessionProvider";
import { homeStyles } from "./Home.styles";

export const Home = () => {
  const { theme } = useTheme();
  const styles = homeStyles(theme);
  const { user, signOut, isLoading } = useSession();

  return (
    <View style={styles.container}>
      <Text variant="h2_extraBold">Welcome, {user?.name}</Text>
      <Text variant="body16_medium">{user?.email}</Text>
      <Button onPress={signOut} disabled={isLoading}>
        {isLoading ? "Loading..." : "Sign Out"}
      </Button>
    </View>
  );
};
