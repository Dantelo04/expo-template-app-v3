import { Platform, TextInput, TextInputProps, View } from "react-native";
import { inputStyles } from "./Input.style";
import { useTheme } from "@/context/ThemeContext";
import { Text } from "../Text/Text";

interface InputProps extends TextInputProps {
  type?: "default" | "currency";
  currency?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Input = ({
  type = "default",
  currency,
  fullWidth = true,
  disabled = false,
  ...props
}: InputProps) => {
  const { theme } = useTheme();
  const styles = inputStyles(theme);

  const baseFontSize = theme.typography.fontSize["4xl"];
  const shrinkStart = 11;

  let fontSize = baseFontSize;

  if (props.value?.length && props.value.length > shrinkStart) {
    fontSize = Math.max(
      12,
      baseFontSize -
        Math.log(props.value.length + 1) * (props.value.length > 14 ? 7.5 : 4)
    );
  }

  if (type === "currency") {
    return (
      <View
        style={[
          styles.container,
          {
            width: fullWidth ? "100%" : "auto",
            borderColor: disabled
              ? theme.colors.semantic.warningDark
              : theme.colors.background.secondary,
          },
        ]}
      >
        <TextInput
          {...props}
          style={[
            Platform.OS === "ios" ? styles.input : styles.inputAndroid,
            { width: !props.value ? "100%" : "auto", fontSize: fontSize },
          ]}
          placeholderTextColor={theme.colors.background.secondary}
          cursorColor={theme.colors.primary[100]}
          selectionColor={theme.colors.primary[100]}
          underlineColorAndroid="transparent"
        />
        {props.value && <Text variant="currency">{currency}</Text>}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          width: fullWidth ? "auto" : "auto",
          marginTop: Platform.OS === "ios" ? 0 : -6,
          borderColor: disabled
            ? theme.colors.semantic.warningDark
            : theme.colors.background.secondary,
        },
      ]}
    >
      <TextInput
        {...props}
        style={[
          Platform.OS === "ios" ? styles.input : styles.inputAndroid,
          {
            width: fullWidth ? "100%" : "auto",
            fontSize: theme.typography.fontSize["3xl"],
          },
        ]}
        placeholderTextColor={theme.colors.background.secondary}
        cursorColor={theme.colors.primary[100]}
        selectionColor={theme.colors.primary[100]}
      />
    </View>
  );
};
