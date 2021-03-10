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
    TextInput
} from 'react-native';

import axios from 'axios';
import { Ip } from '../data/Ip';
import AsyncStorage from '@react-native-async-storage/async-storage';



const { height, width } = Dimensions.get('window')
const IS_IPHONE_X = height === 812 || height === 896;
const Form = Platform.OS === 'ios' ? (IS_IPHONE_X ? height * 0.35 : height * 0.45) : height * 0.45;
const Safe = Platform.OS === 'ios' ? (IS_IPHONE_X ? 120 : 100) : 100;

const Register = ({ navigation }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [major, setMajor] = useState("");
    const [university, setUniversity] = useState("");
    const [loading, setLoading] = useState(false);

    const register = () => {
        if (username == "") {
            Alert.alert("Peringatan", "username tidak boleh kosong")
        } else if (password == "") {
            Alert.alert("Peringatan", "password tidak boleh kosong")
        } else if (fullname == "") {
            Alert.alert("Peringatan", "fullname tidak boleh kosong")
        } else if (major == "") {
            Alert.alert("Peringatan", "major tidak boleh kosong")
        } else if (university == "") {
            Alert.alert("Peringatan", "university tidak boleh kosong")
        } else {
            setLoading(true)
            axios.post(`https://myprio.hefaistech.com/registerAkun`, {
                username: username,
                password: password,
                fullname: fullname,
                major: major,
                university: university
            })
                .then(async (response) => {
                    console.log(response)
                    setLoading(false)
                     if (response.data != "gagal") {

                         var data = {
                             id_user: response.data.id,
                             password: response.data.password,
                             fullname: fullname,
                             major: major,
                             university: university,

                         }

                         console.log(data)
                         console.log("ini ID", response.data);
                         var user = JSON.stringify(data)
                         await AsyncStorage.setItem('mahasiswa', user)
                         navigation.replace("Home");
                     } else {

                         Alert.alert("Failed", "Network error")
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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: width, justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>
                <Image source={require('../images/logo.png')} style={[{ width: width * 0.5, height: 200, resizeMode: 'contain', backgroundColor: 'transparent' }]}></Image>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Welcome to myprio</Text>
                <View style={{ width: '90%', backgroundColor: 'transparent', marginTop: 30 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 15 }}>please Register to manage your activity and do more</Text>
                    <View style={{ width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginTop: 10 }}>

                        <TextInput onChangeText={(fullname) => setFullname(fullname)} style={{ backgroundColor: 'transparent', width: '100%', height: '100%', fontSize: 15, color: '#808080' }} placeholder={"Please enter your fullname"} />
                    </View>
                    <View style={{ width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginTop: 10 }}>

                        <TextInput onChangeText={(username) => setUsername(username)} style={{ backgroundColor: 'transparent', width: '100%', height: '100%', fontSize: 15, color: '#808080' }} placeholder={"Please enter your username"} />
                    </View>
                    <View style={{ width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginTop: 10 }}>

                        <TextInput onChangeText={(major) => setMajor(major)} style={{ backgroundColor: 'transparent', width: '100%', height: '100%', fontSize: 15, color: '#808080' }} placeholder={"Please enter your major"} />
                    </View>
                    <View style={{ width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginTop: 10 }}>

                        <TextInput onChangeText={(university) => setUniversity(university)} style={{ backgroundColor: 'transparent', width: '100%', height: '100%', fontSize: 15, color: '#808080' }} placeholder={"Please enter your university"} />
                    </View>
                    <View style={{ width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginTop: 10 }}>
                        <TextInput secureTextEntry={true} onChangeText={(password) => setPassword(password)} style={{ backgroundColor: 'transparent', width: '100%', height: '100%', fontSize: 15, color: '#808080' }} placeholder={"Please enter your password"} />
                    </View>
                    <TouchableOpacity disabled={loading} onPress={() => register()} style={{ width: '100%', height: 45, backgroundColor: '#fff', borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#808080' }}>Sign up</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '90%', backgroundColor: 'transparent', marginTop: 40 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 15 }}>have an account ?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ width: '100%', height: 45, backgroundColor: '#fff', borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#808080' }}>Sign in</Text>
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
        backgroundColor: '#80ffdb',

    }
})

export default Register;