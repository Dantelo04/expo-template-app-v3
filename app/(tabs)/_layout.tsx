import { Tabs } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { FontAwesome6 } from "@expo/vector-icons";
import { Platform } from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome6>["name"];
  color: string;
}) {
  return (
    <FontAwesome6
      size={Platform.OS === "ios" ? 26 : 24}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.text.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopColor: theme.colors.border.primary,
        },
        headerStyle: {
          backgroundColor: theme.colors.background.primary,
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: theme.typography.fontFamily.medium,
          color: theme.colors.text.secondary,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="house" color={color} />,
        }}
      />
    </Tabs>
  );
}
