import { Text as RNText } from "react-native";
import React from "react";
import { TextProps as RNTextProps } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import textStyles from "./Text.style";

interface TextProps extends RNTextProps {
  maxLength?: number;
  variant?:
    | "text"
    | "h1_extraBold"
    | "h2_extraBold"
    | "h3_bold"
    | "h3_extraBold"
    | "h4_bold"
    | "body20_medium"
    | "body20_bold"
    | "body18_bold"
    | "body18_medium"
    | "body16_bold"
    | "body16_medium"
    | "body14_medium"
    | "body14_bold"
    | "body12_medium"
    | "body12_bold"
    | "button"
    | "button_brand"
    | "button_small"
    | "error"
    | "currency"
    | "bigTitle";
}

export const Text = ({
  children,
  style,
  variant = "text",
  maxLength,
  ...props
}: TextProps) => {
  const { theme } = useTheme();
  const styles = textStyles(theme);

  return (
    <RNText style={[styles[variant], style]} {...props}>
      {maxLength ? children?.toString().slice(0, maxLength) + "..." : children}
    </RNText>
  );
};
