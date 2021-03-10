import React, { useState, useEffect } from 'react';
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
    Animated,
    Platform,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from "react-native-push-notification";
import { notificationManager } from '../data/NotificationManager';
import axios from 'axios';
import { Ip } from '../data/Ip';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
//import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window')
const IS_IPHONE_X = height === 812 || height === 896;
const Form = Platform.OS === 'ios' ? (IS_IPHONE_X ? height * 0.45 : height * 0.53) : height * 0.53;
const Safe = Platform.OS === 'ios' ? (IS_IPHONE_X ? 120 : 100) : 100;

const Home = ({ navigation }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");


    useEffect(() => {

       testa();
    }, [])


    const testa = async() => {
        const jsonValue = await AsyncStorage.getItem('mahasiswa')
        var profile = JSON.parse(jsonValue);

        

        axios.post(`https://myprio.hefaistech.com/getDataJadwal`, {
            id_user: profile.id_user,
        })
            .then(async (response) => {
                console.log(response.data)
                
                
                if (response.data == "gagal") {
                   
                } else {
                    testingNotif(response.data)

                }


            })
            .catch((error) => {
                console.log(error);
                
            });




        axios.post(`https://myprio.hefaistech.com/getDataAktivitas`, {
            id_user: profile.id_user,
        })
            .then(async (response) => {
                console.log(response.data)
                //setRefreshing(false)
                

                if (response.data == "gagal") {
                    //Alert.alert("Failed", "Incorrect username or password")
                    //setData([])
                } else {
                    testingNotifAktivitas(response.data)

                }
            })
            .catch((error) => {
                console.log(error);
               
            });




        axios.post(`https://myprio.hefaistech.com/getDataUjian`, {
            id_user: profile.id_user,
        })
            .then(async (response) => {
                console.log(response.data)
                

                if (response.data == "gagal") {

                } else {
                    testingNotifUjian(response.data)
                }
            })
            .catch((error) => {
                console.log(error);

            });


        axios.post(`https://myprio.hefaistech.com/getDataTugas`, {
            id_user: profile.id_user,
        })
            .then(async (response) => {
                console.log(response.data)
                //setRefreshing(false)
                
                if (response.data == "gagal") {
                    //Alert.alert("Failed", "Incorrect username or password")
                    //setData([])
                } else {
                    testingNotifTugas(response.data)

                }


            })
            .catch((error) => {
                console.log(error);
                //setRefreshing(false)
                //setError("Network request failed")
                //Alert.alert("No Internet Connection", "Please check your connection and try again");
            });

    }



    const signOut = async () => {
        try {
            await AsyncStorage.removeItem('mahasiswa')
            navigation.replace("Awal");
        } catch (e) {

        }
    }


    const testingNotif = (data) => {
        data.map((item) => {
            var date = new Date();
            console.log(item)

            if (item.hari == date.getDay()) {
                PushNotification.localNotification({
                    title: "Jangan Lupa ada jadwal",
                    message: "Ayo masuk kelas"
                })
            }
        })
    }

    const testingNotifAktivitas = (data) => {
        console.log(data);

        data.map((item) => {
            var date = new Date();
            var month = date.getUTCMonth(); //months from 1-12
            var day = date.getUTCDate();
            var year = date.getUTCFullYear();

            var newdate = `${year}${month}${day}`;
            var dateDb = `${item.tahun}${item.bulan}${item.tanggal}`
            console.log(dateDb);
            console.log(newdate);

            if (newdate == dateDb) {
                PushNotification.localNotification({
                    title: "jangan lupa ada aktivitas",
                    message: "Ayo jangan sampai ketinggalan"
                })
            }
        })
    }

    const testingNotifTugas = (data) => {
        console.log(data);

        data.map((item) => {
            var date = new Date();
            var month = date.getUTCMonth(); //months from 1-12
            var day = date.getUTCDate();
            var year = date.getUTCFullYear();

            var newdate = `${year}${month}${day}`;
            var dateDb = `${item.tahun}${item.bulan}${item.tanggal}`
            console.log(dateDb);
            console.log(newdate);

            if (newdate == dateDb) {
                PushNotification.localNotification({
                    title: "jangan lupa ada tugas hari ini",
                    message: "Ayo jangan sampai ketinggalan"
                })
            }
        })
    }

    const testingNotifUjian = (data) => {
        console.log(data);

        data.map((item) => {
            var date = new Date();
            var month = date.getUTCMonth(); //months from 1-12
            var day = date.getUTCDate();
            var year = date.getUTCFullYear();

            var newdate = `${year}${month}${day}`;
            var dateDb = `${item.tahun}${item.bulan}${item.tanggal}`
            console.log(dateDb);
            console.log(newdate);

            if (newdate == dateDb) {
                PushNotification.localNotification({
                    title: "jangan lupa ada ujian hari ini",
                    message: "Ayo jangan sampai ketinggalan"
                })
            }
        })
    }

    const onRegister = (token) => {
        console.log("[Notification] Registered", token)
        setToken(token)
    }

    const onNotification = (notify) => {
        console.log("[Notification] onNotification", notify)
        alert("hai" + notify.title);
        //alert("Masuk")
        //this.props.navigation.navigate("BeritaTI")
    }

    const onNotif = () => {


    }


    const testPush = () => {

        PushNotification.localNotification({
            title: "Jangan Lupa ada jadwal",
            message: "Ayo masuk kelas",

        })


    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: width, justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ width: '100%', height: height * 0.45, backgroundColor: 'transparent', marginTop: 20, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Welcome to your dashboard</Text>
                    <Image source={require('../images/dashboard.png')} style={[{ width: width * 0.8, height: height * 0.5, resizeMode: 'contain', backgroundColor: 'transparent' }]}></Image>
                </View>
                <Animated.View style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, width: '90%', height: Form, backgroundColor: '#fff', marginTop: 20, alignItems: 'center', }}>
                    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, width: '100%', height: '80%', backgroundColor: '#fff', borderTopRightRadius: 20, borderTopLeftRadius: 20, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <TouchableOpacity onPress={() => navigation.navigate("Jadwal")} style={{ width: '45%', height: 120, borderRadius: 10, backgroundColor: '#008891', padding: 20, justifyContent: 'space-between' }}>
                                <Image source={require('../images/schedule.png')} style={{ width: 30, height: 40 }} />
                                <Text style={{ fontSize: 12, color: '#fff' }}>Schedule</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Tugas")} style={{ width: '45%', height: 120, borderRadius: 10, backgroundColor: '#931a25', padding: 20, justifyContent: 'space-between' }}>
                                <Image source={require('../images/activity.png')} style={{ width: 40, height: 50 }} />
                                <Text style={{ fontSize: 12, color: '#fff' }}>Assignment</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("Aktivitas")} style={{ width: '45%', height: 120, borderRadius: 10, backgroundColor: '#931a25', marginTop: 20, padding: 20, justifyContent: 'space-between' }}>
                                <Image source={require('../images/activity.png')} style={{ width: 40, height: 50 }} />
                                <Text style={{ fontSize: 12, color: '#fff' }}>Activity</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Ujian")} style={{ width: '45%', height: 120, borderRadius: 10, backgroundColor: '#008891', marginTop: 20, padding: 20, justifyContent: 'space-between' }}>
                                <Image source={require('../images/exam.png')} style={{ width: 40, height: 30 }} />
                                <Text style={{ fontSize: 12, color: '#fff' }}>Exam</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '100%', alignItems: 'center', height: '20%', marginTop: 10 }}>
                            <TouchableOpacity onPress={() => testPush()} style={{ width: '80%', height: 40, borderRadius: 10, backgroundColor: '#008891', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#fff' }}>Sign out</Text>
                            </TouchableOpacity>
                        </View>

                    </View>



                </Animated.View>


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

export default Home;