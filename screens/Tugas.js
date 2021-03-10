import React, { useState, useEffect, useCallback } from 'react';
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
    FlatList,
    Alert,
    RefreshControl,
} from 'react-native';
import axios from 'axios';
import { Ip } from '../data/Ip';
import AsyncStorage from '@react-native-async-storage/async-storage';



const { height, width } = Dimensions.get('window')
const IS_IPHONE_X = height === 812 || height === 896;
const Form = Platform.OS === 'ios' ? (IS_IPHONE_X ? height * 0.35 : height * 0.45) : height * 0.45;
const Safe = Platform.OS === 'ios' ? (IS_IPHONE_X ? 120 : 100) : 100;

const Tugas = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(true);
    const [error, setError] = useState("");
    const [ dataProfile, setDataProfile ] = useState();

    useEffect(() => {
        getData();
    }, [])

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async() => {
        const jsonValue = await AsyncStorage.getItem('mahasiswa')
        var profile =  JSON.parse(jsonValue);

        setRefreshing(true);
        axios.post(`https://myprio.hefaistech.com/getDataTugas`, {
            id_user: profile.id_user
        })
            .then(async (response) => {
                console.log(response)
                setRefreshing(false)
                if (response.data == "gagal") {
                    setData([])
                } else {
                    console.log(response.data);
                    setData(response.data)
                }

            })
            .catch((error) => {
                console.log(error);
                setRefreshing(false)
                setError("Network request failed")
                Alert.alert("No Internet Connection", "Please check your connection and try again");
            });

    }, []);

    const countDay = (tanggal, bulan, tahun) => {

        var date1 = new Date(tahun, bulan, tanggal);

        const date2 = new Date();
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        //console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");
        console.log(date1)
        console.log(date2)
        var hasil = `${tanggal}/${bulan}/${tahun}`
        return hasil;

        //console.log(date);

        // const action = ((date.getDay() + day) % 7) + 1


        // if (action == 6 || action == -6) {
        //     return "6 more day"
        // } else if (action == 5 || action == -5) {
        //     return "5 more day"
        // } else if (action == 4 || action == -4) {
        //     return "4 more day";
        // } else if (action == 3 || action == -3) {
        //     return "3 more day";
        // } else if (action == 2 || action == -2) {
        //     return "2 more day";
        // } else if (action == 1 || action == -1) {
        //     return "Tomorrow";
        // } else {
        //     return "today";
        // }




    }


    const getData = async () => {

        const jsonValue = await AsyncStorage.getItem('mahasiswa')
        var profile =  JSON.parse(jsonValue);
        setDataProfile(profile)

        axios.post(`https://myprio.hefaistech.com/getDataTugas`, {
            id_user: profile.id_user,
        })
            .then(async (response) => {
                console.log(response)
                setLoading(false)

                if (response.data == "gagal") {
                    setLoading(false)
                    //Alert.alert("Failed", "Incorrect username or password")
                    setData([])
                } else {
                    setLoading(false)
                    console.log(response.data);
                    setData(response.data)
                }

            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
                setError("Network request failed")
                Alert.alert("No Internet Connection", "Please check your connection and try again");
            });
    }

    const hapus = (id) => {


        Alert.alert(
            "Warning",
            "You are sure you want to delete this data?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        axios.post(`https://myprio.hefaistech.com/hapusTugas`, {
                            id_tugas: id,
                        })
                            .then(async (response) => {
                                console.log(response)


                                if (response.data == "gagal") {

                                    //Alert.alert("Failed", "Incorrect username or password")
                                } else {
                                    Alert.alert("Success", "Data berhasil di hapus");
                                    console.log(response.data);
                                    getData();
                                }

                            })
                            .catch((error) => {
                                console.log(error);
                                setError("Network request failed")
                                Alert.alert("No Internet Connection", "Please check your connection and try again");
                            });
                    }
                }
            ],
            { cancelable: false }
        );


    }


    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../images/ppl2.png')} style={[{ width: width * 0.4, height: 200, resizeMode: 'contain', backgroundColor: 'transparent' }]}></Image>
            <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#0e918c' }}>Your Assignment</Text>
            <TouchableOpacity onPress={() => navigation.navigate("FormTugas", { id_user: dataProfile.id_user })} style={{ width: '80%', height: 45, backgroundColor: '#0e918c', borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>Add your Assignment</Text>
            </TouchableOpacity>
            <View style={{ width: '100%', alignItems: 'center', marginTop: 20, backgroundColor: 'transparent', height: height * 0.55 }}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id_tugas}
                    contentContainerStyle={{ alignItems: 'center' }}
                    refreshControl={
                        <RefreshControl
                            tintColor={"#fff"}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={({ item, index }) => {

                        return (
                            <TouchableOpacity onLongPress={() => hapus(item.id_tugas)} key={index} style={{ width: '93%', height: 70, backgroundColor: '#fff', borderRadius: 5, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ width: '70%', height: '100%', backgroundColor: 'transparent', padding: 10, justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0e918c' }}>Assignment</Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#808080' }}>{item.notes}</Text>
                                </View>
                                <View style={{ width: '30%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0e918c' }}>{countDay(item.tanggal, item.bulan, item.tahun)}</Text>
                                </View>
                            </TouchableOpacity>

                        )
                    }}
                    scrollEventThrottle={16}
                />

            </View>
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

export default Tugas;