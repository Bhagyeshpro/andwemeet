import { StyleSheet, Button, TextInput, Image, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { auth } from "../firebase"

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

const handleSignUp = () => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log("Regiesterd With : ", user.email);
    })
    .catch((error) => alert(error.message));
};


  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Image
        style={{width: 40, height: 40}}
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
  title="Login"
  onPress={handleSignUp}
  color="#841584"
  // accessibilityLabel="Learn more about this purple button"
/>
    </View>
  )
}

export default LoginScreen

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