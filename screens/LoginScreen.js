import { StyleSheet, Button, TouchableOpacity, TextInput, Image, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from "../firebase"

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
        console.log(user);
      }
    });
    return unsubscribe;
  }, []);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
          photoURL: imageURL || "https://blogger.googleusercontent.com/img/a/AVvXsEgmNkbnylpQd0lndtjzI2PczwAoJJDvj1Ekb3C47dZgl5t_AKK0g6pxM39OloaZ7FPElGa4PqFuigmEzuoG7YyzU7GL_lP2dgmPhOzd3ZVgjRDVupS7gwIzj7xfasrykUchPFA22FMG30SbHY2XnICvWtf4Sur4bywDPTO78p8Yhdv6T2H9lQVjxFsh"
        })
      })
      .catch((error) => alert(error.message))
  }
  // const handleSignUp = () => {
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((userCredentials) => {
  //       const user = userCredentials.user;
  //       console.log("Regiesterd With : ", user.email);
  //     })
  //     .catch((error) => alert(error.message));
  // };


  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
        placeholder="Name"
        placeholderTextColor="red"
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
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
      <TextInput
        placeholderTextColor="red"
                    placeholder="Image URL"
                    style={styles.input}
                    value={imageURL}
                    type="text"
                    onChangeText={(text) => setImageURL(text)}
                    onSubmitEditing={register}
                />
      <Button
        // onPress={onPressLearnMore}
        title="Register"
        onPress={register}
        color="#841584"
      // accessibilityLabel="Learn more about this purple button"
      />
      <View style={{flexDirection: "row", alignItems: "center", marginTop: 10}}>
          <Text style={styles.text}>Have An Account?</Text>
          <TouchableOpacity activeOpacity={0.5} onPress={ () => navigation.navigate("SignIn")}>

          <Text style={[styles.text, {marginLeft: 5, color: "blue"}]}>Sign In</Text>
          </TouchableOpacity>
          
      </View>
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
  text: {
    color: "#000",
    fontSize: 15,

  },
})