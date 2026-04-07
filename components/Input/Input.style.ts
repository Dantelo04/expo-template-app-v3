import { Platform, StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const inputStyles = (theme: Theme) => StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderColor: theme.colors.border.primary,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  input: {
    fontSize: theme.typography.fontSize['4xl'],
    fontFamily: theme.typography.fontFamily.semiBold,
    paddingRight: 6,
    color: theme.colors.text.secondary,
    flexShrink: 0,
    paddingVertical: 0,
    paddingBottom: 2,
  },
  inputAndroid: {
    fontSize: theme.typography.fontSize['4xl'],
    fontFamily: theme.typography.fontFamily.medium,
    paddingRight: 8,
    color: theme.colors.text.secondary,
    flexShrink: 0,
    paddingTop: 0,
    paddingBottom: 2,
    includeFontPadding: false,
    borderBottomWidth: 0,
    borderColor: 'transparent',
  },
});
