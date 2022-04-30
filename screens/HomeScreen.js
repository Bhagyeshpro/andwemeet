import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,  Image, Text, View } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { auth, db } from "../firebase"
import CustomListItem from '../components/CustomListItem';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const HomeScreen = ({navigation}) => {
  console.log(auth.currentUser.photoURL);
  const signOutUser = () => {
    auth.signOut().then(() => {
        navigation.replace("Login");
    })
}


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
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width :20,
                    marginRight: 10,
                }}
            >
                <TouchableOpacity activeOpacity={0.5}>
                    <EvilIcons  name="chart" size={30} color="white" />
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
      <CustomListItem/>
      <CustomListItem/>
      <CustomListItem/>

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})