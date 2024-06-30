import { View, Text } from "@/components/Themed";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";

export const LoginScreen = () => {
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (loading) {
      Keyboard.dismiss();
    }
  }, [loading]);

  const onLoginClick = useCallback(() => {
    setLoading(true);
  }, []);

  const display = useMemo(() => {
    if (creating) {
      return null;
    }
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} animating={loading} />
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.item}
          value={userName}
          onChangeText={setUserName}
          placeholder="Username"
          textAlign="center"
        />
        <TextInput
          style={styles.item}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          textAlign="center"
        />
        <Button title="Login" onPress={onLoginClick} disabled={loading} />
      </View>
    );
  }, [creating, loading, onLoginClick, password, userName]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {display}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 20,
  },
  item: {
    margin: 20,
    width: "100%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
