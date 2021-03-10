import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { Ip } from '../data/Ip';
import AsyncStorage from '@react-native-async-storage/async-storage';




const { height, width } = Dimensions.get('window')
const IS_IPHONE_X = height === 812 || height === 896;
const Form = Platform.OS === 'ios' ? (IS_IPHONE_X ? height * 0.35 : height * 0.45) : height * 0.45;
const Safe = Platform.OS === 'ios' ? (IS_IPHONE_X ? 120 : 100) : 100;

const Login = ({ navigation }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const loginProses = () => {
        if (username == "") {
            Alert.alert("Peringatan", "username tidak boleh kosong")
        } else if (password == "") {
            Alert.alert("Peringatan", "password tidak boleh kosong")
        } else {
            setLoading(true)
            axios.post(`https://myprio.hefaistech.com/login`, {
                username: username,
                password: password
            })
                .then(async (response) => {
                    console.log(response)
                    setLoading(false)

                    if (response.data == "gagal") {
                        setLoading(false)
                        Alert.alert("Failed", "Incorrect username or password")
                    } else if (response.data == "gmail") {
                        setLoading(false)
                        Alert.alert("Peringatan", "Silahkan login dengan gmail ")
                    } else if (response.data == "facebook") {
                        setLoading(false)
                        Alert.alert("Peringatan", "Silakan login dengan facebook")
                    } else {

                         const user = JSON.stringify(response.data[0])
                         await AsyncStorage.setItem('mahasiswa', user)
                         setLoading(false)
                         navigation.replace("Home", { awal: true });
                    }

                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false)
                    setError("Network request failed")
                    Alert.alert("No Internet Connection", "Please check your connection and try again");
                });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../images/logo.png')} style={[{ width: width * 0.5, height: 200, resizeMode: 'contain', backgroundColor: 'transparent' }]}></Image>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Welcome to myprio</Text>
                <View style={{ width: '90%', backgroundColor: 'transparent', marginTop: 30 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 15 }}>please login to manage your activity and do more</Text>
                    <View style={{ width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 8, flexDirection: 'row' }}>
                        <View style={{ width: '15%', backgroundColor: 'transparent', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../images/username.png')} style={{ width: 20, height: 20 }} />
                        </View>
                        <TextInput onChangeText={(username) => setUsername(username)} style={{ backgroundColor: 'transparent', width: '80%', height: '100%', fontSize: 15, color: '#808080' }} placeholder={"Please enter your username..."} />
                    </View>
                    <View style={{ width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 8, flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ width: '15%', backgroundColor: 'transparent', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../images/password.png')} style={{ width: 20, height: 20 }} />
                        </View>
                        <TextInput secureTextEntry={true} onChangeText={(password) => setPassword(password)} style={{ backgroundColor: 'transparent', width: '80%', height: '100%', fontSize: 15, color: '#808080' }} placeholder={"Please enter your password..."} />
                    </View>
                    <TouchableOpacity disabled={loading} onPress={() => loginProses()} style={{ width: '100%', height: 45, backgroundColor: '#fff', borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        {loading ? (<ActivityIndicator />) : (
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#808080' }}>Sign in</Text>
                        )}

                    </TouchableOpacity>
                </View>

                <View style={{ width: '90%', backgroundColor: 'transparent', marginTop: 40 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 15 }}>Dont have an account ?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ width: '100%', height: 45, backgroundColor: '#fff', borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#808080' }}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#80ffdb'
    }
})

export default Login;