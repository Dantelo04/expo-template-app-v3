import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { buttonStyles } from "./Button.style";
import { Text } from "../Text/Text";
import Google from "@/assets/icons/google.svg";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: "primary" | "google" | "icon" | "small";
  icon?: React.ReactNode;
}

export const Button = ({
  children,
  variant = "primary",
  icon,
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();
  const styles = buttonStyles(theme);

  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity || props.disabled ? 1 : 0.5}
      {...props}
      style={[
        styles.button,
        styles[variant],
        props.style,
        { opacity: props.disabled ? 0.5 : 1 },
      ]}
    >
      {variant === "google" && <Google style={{ paddingVertical: 10 }} />}
      <Text
        variant={variant === "google" ? "button_brand" : variant === "small" ? "button_small" : "button"}
        style={styles.text}
        numberOfLines={1}
      >
        {children}
      </Text>
      {variant === "icon" && icon}
    </TouchableOpacity>
  );
};
