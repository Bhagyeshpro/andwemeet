import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native'
import React from 'react'
import { auth, db } from "../firebase"

const CustomListItem = ({chatName, id}) => {
    return (
        <TouchableOpacity key={id}>

        <View  style={{  flexDirection: 'row', height: 60 }}>
            <View style={styles.leftContainer}>

                <Image
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                    source={{
                        uri: auth.currentUser.imageURL || 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.title}>{chatName}</Text>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.subtitle}>subtitle ahi ajelrkerk subtitle ahi ajelrkerk subtitle ahi ajelrkerk subtitle ahi ajelrkerk subtitle ahi ajelrkerk subtitle ahi ajelrkerk subtitle ahi ajelrkerk subtitle ahi ajelrkerk subtitle ahi ajelrkerk </Text>
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