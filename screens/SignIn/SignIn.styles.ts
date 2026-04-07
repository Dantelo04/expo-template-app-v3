import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const signInStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    padding: 24,
    gap: 32,
  },
  content: {
    gap: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
