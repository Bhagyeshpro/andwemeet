import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,  Image, Text, View } from 'react-native'
import React, {useLayoutEffect, useEffect, useState} from 'react'
import { auth, db } from "../firebase"
import CustomListItem from '../components/CustomListItem';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([]);
//   console.log(auth.currentUser.photoURL);
  const signOutUser = () => {
    auth.signOut().then(() => {
        navigation.replace("Login");
    })
}

useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => setChats(
        snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))
    ))
    return unsubscribe;
}, [])


  useLayoutEffect(() => {
    navigation.setOptions({
        title: "AndWeMet",
        headerStyle: { backgroundColor: "#ff007d"},
        headerTitleStyle: {color: "white"},
        headerTintColor: "black",
        headerLeft: () => (
            <View style={{marginRight: 15,}}>
                <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                <Image
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                    source={{
                        uri: auth?.currentUser?.photoURL || "https://blogger.googleusercontent.com/img/a/AVvXsEgmNkbnylpQd0lndtjzI2PczwAoJJDvj1Ekb3C47dZgl5t_AKK0g6pxM39OloaZ7FPElGa4PqFuigmEzuoG7YyzU7GL_lP2dgmPhOzd3ZVgjRDVupS7gwIzj7xfasrykUchPFA22FMG30SbHY2XnICvWtf4Sur4bywDPTO78p8Yhdv6T2H9lQVjxFsh",
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
                    width :80,
                }}
            >
                <TouchableOpacity activeOpacity={0.5} onPress={ () => navigation.navigate("AddChat")}>
                    <Text style={styles.buttonText}>Add Chat</Text>
                    {/* <EvilIcons  name="chart" size={30} color="white" /> */}
                </TouchableOpacity>

                {/* <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}> */}
                    {/* <SimpleLineIcons name="pencil" size={24} color="black"/> */}
                {/* </TouchableOpacity> */}
            </View>
        )
    })
}, [])
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView>
      {chats.map(({id, data: {chatName}})=> (
            <CustomListItem 
                chatName={chatName} 
                 key={id} 
                id={id} 
                // enterChat={enterChat}
            />
        ))}

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 15,
    },
})