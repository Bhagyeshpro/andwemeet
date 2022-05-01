import { StyleSheet, TextInput, Button, Text, View } from 'react-native'
import React, {useLayoutEffect, useState} from 'react'
import { db } from "../firebase";

const AddChatScreen = ({ navigation}) => {
    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title : "Add a new Chat",
            headerBackTitle: "Chats",
        })
    }, [navigation])

    const createChat = async () => {
        await db
            .collection("chats")
            .add({
                chatName: input,
            })
            .then(() => {
                navigation.goBack(null);
            })
            .catch(error => alert(error))
    }

    return (
    <View style={{alignItems: "center", marginTop: 10}}>
          <TextInput
        placeholder="Chat Name"
        placeholderTextColor="red"
        style={styles.input}
        autoFocus
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
      value={input}
      />
      <Button
        // onPress={onPressLearnMore}
        title="Create A New Chat"
        onPress={createChat}
        style={{marginTop: 10}}
        color="#841584"
        disabled={!input} 
      // accessibilityLabel="Learn more about this purple button"
      />
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
    input: {
        width: "80%",
        height: 40,
        margin: 12,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        color: "red"
      },
})