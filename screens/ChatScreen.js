import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { auth, db } from "../firebase"
import firebase from "firebase"

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const scrollViewRef = useRef();


    const sendMessage = () => {
        Keyboard.dismiss()

        db.collection("chats").doc(route.params.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        })

        setInput("")
    }

    useLayoutEffect(() => {
        const unsubscribe = db.collection("chats").doc(route.params.id).collection("messages").orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            ));

        return unsubscribe
    }, [route])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.chatName,
            headerStyle: { backgroundColor: "#ff007d" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "black",
            headerBackTitleVisible: true,
            headerLeft: () => (
                <View style={{ marginRight: 15, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                    <TouchableOpacity activeOpacity={0.5} style={{ width: 30, height: "100%" }} onPress={() => navigation.goBack(null)}>
                        <Text style={styles.backButton}>{"<"}</Text>
                        {/* <EvilIcons  name="chart" size={30} color="white" /> */}
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} >
                        <Image
                            style={{ width: 40, height: 40, borderRadius: 50 }}
                            source={{
                                uri: messages[messages.length - 1]?.data.photoURL ||
                                    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg",
                            }}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        // flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                    }}
                >
                </View>
            )
        })
    }, [navigation, messages])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar
                backgroundColor="pink"
                barStyle="dark-content"
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            ></KeyboardAvoidingView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <>
                    <ScrollView style={{ paddingTop: 10 }} ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}>

                        {messages.map(({ id, data }) => (
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.receiver}>
                                    <Image
                                        position="absolute"
                                        bottom={-9}
                                        right={-5}
                                        style={{ width: 20, height: 20, borderRadius: 50 }}
                                        source={{
                                            uri: data.photoURL
                                        }}
                                    />
                                    <Text style={styles.receiverText}>{data.message}</Text>
                                </View>
                            ) : (
                                <View key={id} style={styles.sender}>
                                    <Image
                                        position="absolute"
                                        bottom={-9}
                                        right={-5}
                                        style={{ width: 20, height: 20, borderRadius: 50 }}
                                        source={{
                                            uri: data.photoURL
                                        }}
                                    />
                                    <Text style={styles.senderText}>{data.message}</Text>
                                    {/* <Text style={styles.senderName} >{data.displayName}</Text> */}
                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput
                            placeholderTextColor="black"
                            style={styles.textInput}
                            value={input}
                            onChangeText={text => setInput(text)}
                            placeholder='Message Me ...'
                            onSubmitEditing={sendMessage}
                        />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5} style={{
                            backgroundColor: "#ECECEC",

                            marginRight: 15
                        }}>
                            <Text style={styles.buttonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </>
            </TouchableWithoutFeedback>

        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {},
    footer: {
        backgroundColor: "#ECECEC",
        flexDirection: "row",
        alignItems: "center",
        margin: 7,
        borderRadius: 30,
    },
    buttonText: {
        color: "#ff007d",
        fontWeight: "700",
        fontSize: 17,

    },
    backButton: {
        color: "#fff",
        fontSize: 40,
        marginTop: -10,
    },
    textInput: {
        borderRadius: 30,
        paddingLeft: 20,
        color: "#000",
        fontSize: 17,
        marginRight: 10,
        backgroundColor: "#ECECEC",
        flex: 1,
    },
    receiver: {
        padding: 10,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    receiverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 5,
        marginRight: 3,
        fontSize: 15,
    },
    sender: {
        padding: 10,
        backgroundColor: "#286BE6",
        alignSelf: "flex-start",
        borderRadius: 20,
        // margin: 15,
        marginLeft: 15,
        marginBottom: 20,

        maxWidth: "80%",
        position: "relative",
    },
    senderName: {
        left: 10,
        // color: "#",
        // paddingLeft: 5,
        fontSize: 10,
        color: "white",
    },

    senderText: {
        left: 10,
        paddingRight: 15,
        fontSize: 15,
        color: "white",
    },
});
