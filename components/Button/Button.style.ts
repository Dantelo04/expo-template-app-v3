import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

export const buttonStyles = (theme: Theme) => StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    width: '100%',
    boxShadow: `0px 3px 0px 0px ${theme.colors.text.primary}`,
  },
  small: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    width: '100%',
    boxShadow: `0px 3px 0px 0px ${theme.colors.text.primary}`
  },
  primary: {
    backgroundColor: theme.colors.primary[100],
  },
  google: {
    backgroundColor: theme.colors.basic.white,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  text: {
    textAlign: 'center',
  },
  icon: {
    backgroundColor: theme.colors.primary[100],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
