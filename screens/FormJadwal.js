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
    Alert,
    TextInput,
    Picker
} from 'react-native';
import axios from 'axios';
import { Ip } from '../data/Ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';



const { height, width } = Dimensions.get('window')
const IS_IPHONE_X = height === 812 || height === 896;
const Form = Platform.OS === 'ios' ? (IS_IPHONE_X ? height * 0.35 : height * 0.45) : height * 0.45;
const Safe = Platform.OS === 'ios' ? (IS_IPHONE_X ? 120 : 100) : 100;

const FormJadwal = ({ navigation }) => {

    const [jadwal, setJadwal] = useState("");
    const [notes, setNotes] = useState("");
    const [namaKelas, setNamaKelas] = useState("");
    const [time, setTime] = useState(1);
    const [day, setDay] = useState("1");
    const [loading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState("java");

    const save = () => {
        if (jadwal == "") {
            Alert.alert("Peringatan", "kode kelas tidak boleh kosong")
        } else if (notes == "") {
            Alert.alert("Peringatan", "notes tidak boleh kosong")
        } else if (namaKelas == "") {
            Alert.alert("Peringatan", "nama kelas tidak boleh kosong")
        } else if (day == "") {
            Alert.alert("Peringatan", "day tidak boleh kosong")
        } else if (time == "") {
            Alert.alert("Peringatan", "time tidak boleh kosong")
        } else {
            setLoading(true)
            axios.post(`http://${Ip}:3000/addJadwal`, {
                kode_kelas: jadwal,
                nama_kelas: namaKelas,
                notes: notes,
                hari: day,
                jam: time,
            })
                .then(async (response) => {
                    console.log(response)
                    setLoading(false)
                    if (response.data != "gagal") {
                        Alert.alert("Success", "Data succesfull added")
                        navigation.navigate("Jadwal");

                    } else {

                        Alert.alert("Failed", "Network error")
                    }


                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false)
                    Alert.alert("No Internet Connection", "Please check your connection and try again");
                });
        }
    }


    return (
        <View style={styles.container}>
            <View style={{ height: height, width: width, backgroundColor: '#f1f1f1' }}>
                <View style={{ width: '100%', height: '30%', backgroundColor: '#80ffdb' }}></View>
            </View>

            <SafeAreaView style={{ width: width, height: height, backgroundColor: 'transparent', position: 'absolute' }}>
                <ScrollView contentContainerStyle={{ width: width, justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>
                    <Text style={{ fontSize: 25, fontWeight: '500', color: '#fff', marginBottom: 30 }}>Create new schedule</Text>
                    <View style={{ width: '90%', backgroundColor: '#fff', borderRadius: 5, paddingTop: 15, paddingBottom: 15, paddingRight: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: 19, fontWeight: '600', color: '#80ffdb', marginBottom: 10 }}>Kode Kelas</Text>
                        <View style={{ width: '100%', height: 50, backgroundColor: '#f4f9f9', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginBottom: 20 }}>

                            <TextInput onChangeText={(jadwal) => setJadwal(jadwal)} style={{ backgroundColor: '#f4f9f9', width: '100%', height: '100%', fontSize: 15, color: '#808080' }} placeholder={"add schedule"} />
                        </View>

                        <Text style={{ fontSize: 19, fontWeight: '600', color: '#80ffdb', marginBottom: 10 }}>Nama Kelas</Text>
                        <View style={{ width: '100%', height: 50, backgroundColor: '#f4f9f9', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginBottom: 10 }}>

                            <TextInput onChangeText={(namaKelas) => setNamaKelas(namaKelas)} style={{ backgroundColor: '#f4f9f9', width: '100%', height: '100%', fontSize: 15, color: '#808080' }} placeholder={"When will schedule"} />
                        </View>

                        <Text style={{ fontSize: 19, fontWeight: '600', color: '#80ffdb', marginBottom: 10 }}>Notes</Text>
                        <View style={{ width: '100%', height: 50, backgroundColor: '#f4f9f9', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginBottom: 20 }}>

                            <TextInput onChangeText={(notes) => setNotes(notes)} style={{ backgroundColor: '#f4f9f9', width: '100%', height: '100%', fontSize: 15, color: '#808080' }} placeholder={"add some notes"} />
                        </View>

                        <Text style={{ fontSize: 19, fontWeight: '600', color: '#80ffdb', marginBottom: 10 }}>Time</Text>
                        <View style={{ width: '100%', height: 50, backgroundColor: '#f4f9f9', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginBottom: 10 }}>

                            <TextInput keyboardType={"number-pad"} onChangeText={(time) => setTime(time)} style={{ backgroundColor: '#f4f9f9', width: '100%', height: '100%', fontSize: 15, color: '#808080' }} placeholder={"07:30"} />
                        </View>
                        <Text style={{ fontSize: 19, fontWeight: '600', color: '#80ffdb', marginBottom: 10 }}>Day</Text>
                        <View style={{ width: '100%', height: 50, backgroundColor: '#f4f9f9', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginBottom: 10 }}>

                            <Picker
                                selectedValue={day}
                                style={{ height: '100%', width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => setDay(itemValue)}
                            >   
                                <Picker.Item label="Minggu" value="0" />
                                <Picker.Item label="Senin" value="1" />
                                <Picker.Item label="Selasa" value="2" />
                                <Picker.Item label="Rabu" value="3" />
                                <Picker.Item label="Kamis" value="4" />
                                <Picker.Item label="Jumat" value="5" />
                                <Picker.Item label="Sabtu" value="6" />
                                
                            </Picker>
                        </View>
                    </View>

                    <TouchableOpacity disabled={loading} onPress={() => save()} style={{ width: '80%', height: 45, backgroundColor: '#008891', borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>Create now</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.pop()} style={{ width: '80%', height: 45, backgroundColor: '#fff', borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#808080' }}>Cancel</Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>




        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#80ffdb'
    }
})

export default FormJadwal;