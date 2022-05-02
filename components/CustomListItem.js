import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { auth, db } from "../firebase"

const CustomListItem = ({chatName, id, enterChat}) => {
    const [chatMessages, setChatMessages] = useState([]);
    useEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
                setChatMessages(snapshot.docs.map((doc) => doc.data()))
            )
            return unsubscribe
    })
    return (
        <TouchableOpacity key={id}  onPress={() => enterChat(id, chatName)} >

        <View  style={{  flexDirection: 'row', height: 60 }}>
            <View style={styles.leftContainer}>

                <Image
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                    source={{
                        uri:  chatMessages?.[0]?.photoURL ||
                    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
                    }}
                />
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.title}>{chatName}</Text>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.subtitle}>{chatMessages?.[0]?.message}</Text>
            </View>

        </View>
        </TouchableOpacity>
    )
}

export default CustomListItem

const styles = StyleSheet.create({
    leftContainer: {
        width: 70,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",

    },
    rightContainer: {
        width: "75%",
        height: "100%",
        // alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: "#000",
        fontWeight: "600",
        fontSize: 20,
    },
    subtitle: {
        color: "#000"
    }
})