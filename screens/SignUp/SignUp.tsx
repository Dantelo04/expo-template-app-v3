import { View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { Text } from "@/components/Text/Text";
import { signUpStyles } from "./SignUp.styles";
import { useState } from "react";
import { useSession } from "@/context/SessionProvider";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Link } from "@/components/Link/Link";

export const SignUp = () => {
  const { theme } = useTheme();
  const styles = signUpStyles(theme);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    signUp,
    isLoading,
    error: sessionError,
  } = useSession();

  const handleSignUp = async () => {
    await signUp(email, password, name);
  };

  return (
    <View style={styles.container}>
      <Text variant="h2_extraBold">Create Account</Text>
      <View style={styles.content}>
        {sessionError ? (
          <Text variant="error">{sessionError}</Text>
        ) : null}
        <Input
          placeholder="Name"
          value={name}
          autoCapitalize="words"
          onChangeText={setName}
        />
        <Input
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button onPress={handleSignUp} disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </View>
      <Link href="/sign-in">Already have an account? Sign in</Link>
    </View>
  );
};
