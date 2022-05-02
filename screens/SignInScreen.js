import { StyleSheet, Image, Button, TextInput, Text, View } from 'react-native'
import React, {useState} from 'react'
import { auth } from "../firebase"

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = () => {
    // We are passing promises up
    auth.signInWithEmailAndPassword(email, password)
        .catch(error => alert(error))
}

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: -25, justifyContent: "center" }}>
     <Image
        style={{ width: 40, height: 40 }}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="red"

        autoFocus
        // type="email"  
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
      // value={text}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="red"
        style={styles.input}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      // onChangeText={onChangeText}
      // value={text}
      />
      <Button
        // onPress={onPressLearnMore}
        title="Register"
        onPress={signIn}
        color="#841584"
      // accessibilityLabel="Learn more about this purple button"
      />
    </View>
  )
}

export default SignInScreen


const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "red"
  },
})