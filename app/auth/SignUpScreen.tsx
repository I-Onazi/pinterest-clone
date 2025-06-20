import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import CustomButton from "./components/CustomButton";
import SocialSignInButtons from "./components/SocialSignInButtons";
import { useState } from "react";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import { useNhostClient } from "@nhost/react";

const SignUpScreen = () => {
  const router=useRouter();
  const nhost= useNhostClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegisterPressed = async() => {
    const result=await nhost.auth.signUp({
      email,
      password,
      options:{
        displayName:name,
      }
    });
    // console.warn("Sign up");
    if(result.error){
      Alert.alert("Error signing up", result.error.message)
    }//you'll probabaly have to handle routing back to the signin page later sha
    console.log(result);
  };

  const onSignInPress = () => {
    router.push("/auth/SignInScreen");
  };

  const onTermsOfUsePressed = () => {
    console.warn("onTermsOfUsePressed");
  };

  const onPrivacyPressed = () => {
    console.warn("onPrivacyPressed");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Full name"
          style={styles.input}
        />

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />

        <CustomButton text="Register" onPress={onRegisterPressed} />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <SocialSignInButtons />

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: Colors.light.tint,
  },
  input: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
    height: 50,
  },
});

export default SignUpScreen;
