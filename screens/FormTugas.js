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

const FormTugas = ({ navigation }) => {

    const [notes, setNotes] = useState("nothing");
    const [tanggal, setTanggal] = useState("1");
    const [bulan, setBulan] = useState(1);
    const [tahun, setTahun] = useState("1");
    const [jam, setJam] = useState("");
    const [loading, setLoading] = useState(false);


    const save = () => {
        if (notes == "") {
            Alert.alert("Peringatan", "notes tidak boleh kosong")
        } else if (tanggal == "") {
            Alert.alert("Peringatan", "tanggal tidak boleh kosong")
        } else if (bulan == "") {
            Alert.alert("Peringatan", "bulan tidak boleh kosong")
        } else if (tahun == "") {
            Alert.alert("Peringatan", "tahun tidak boleh kosong")
        } else {
            setLoading(true)
            axios.post(`http://${Ip}:3000/addTugas`, {
                notes: notes,
                tanggal: tanggal,
                bulan: bulan,
                tahun: tahun,
                jam: jam
            })
                .then(async (response) => {
                    console.log(response)
                    setLoading(false)
                    if (response.data != "gagal") {
                        Alert.alert("Success", "Data succesfull added")
                        navigation.replace("Tugas");

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
                    <Text style={{ fontSize: 25, fontWeight: '500', color: '#fff', marginBottom: 30 }}>Create new assignment</Text>
                    <View style={{ width: '90%', backgroundColor: '#fff', borderRadius: 5, paddingTop: 15, paddingBottom: 15, paddingRight: 10, paddingLeft: 10 }}>
                        

                        <Text style={{ fontSize: 19, fontWeight: '600', color: '#80ffdb', marginBottom: 10 }}>Notes</Text>
                        <View style={{ width: '100%', height: 50, backgroundColor: '#f4f9f9', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginBottom: 20 }}>

                            <TextInput onChangeText={(notes) => setNotes(notes)} style={{ backgroundColor: '#f4f9f9', width: '100%', height: '100%', fontSize: 15, color: '#808080' }} placeholder={"add some notes"} />
                        </View>

                        <Text style={{ fontSize: 19, fontWeight: '600', color: '#80ffdb', marginBottom: 10 }}>jam</Text>
                        <View style={{ width: '100%', height: 50, backgroundColor: '#f4f9f9', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginBottom: 10 }}>

                            <TextInput keyboardType={"number-pad"} onChangeText={(jam) => setJam(jam)} style={{ backgroundColor: '#f4f9f9', width: '100%', height: '100%', fontSize: 15, color: '#808080' }} placeholder={"07:30"} />
                        </View>

                        <Text style={{ fontSize: 19, fontWeight: '600', color: '#80ffdb', marginBottom: 10 }}>Date</Text>
                        <View style={{ width: '100%', height: 50, backgroundColor: '#f4f9f9', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginBottom: 10 }}>

                            <Picker
                                selectedValue={tanggal}
                                style={{ height: '100%', width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => setTanggal(itemValue)}
                            >
                                <Picker.Item label="1" value="1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="5" value="5" />
                                <Picker.Item label="6" value="6" />
                                <Picker.Item label="7" value="7" />
                                <Picker.Item label="8" value="8" />
                                <Picker.Item label="9" value="9" />
                                <Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" />
                                <Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="3" />
                                <Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" />
                                <Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" />
                                <Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" />
                                <Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" />
                                <Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" />
                                <Picker.Item label="24" value="24" />
                                <Picker.Item label="25" value="25" />
                                <Picker.Item label="26" value="26" />
                                <Picker.Item label="27" value="27" />
                                <Picker.Item label="29" value="29" />
                                <Picker.Item label="30" value="1" />
                                <Picker.Item label="31" value="31" />

                            </Picker>
                        </View>

                        <Text style={{ fontSize: 19, fontWeight: '600', color: '#80ffdb', marginBottom: 10 }}>Month</Text>
                        <View style={{ width: '100%', height: 50, backgroundColor: '#f4f9f9', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginBottom: 10 }}>

                            <View style={{ width: '100%', height: 50, backgroundColor: '#f4f9f9', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginBottom: 10 }}>

                                <Picker
                                    selectedValue={bulan}
                                    style={{ height: '100%', width: '100%' }}
                                    onValueChange={(itemValue, itemIndex) => setBulan(itemValue)}
                                >
                                    <Picker.Item label="January" value="0" />
                                    <Picker.Item label="February" value="1" />
                                    <Picker.Item label="March" value="2" />
                                    <Picker.Item label="April" value="3" />
                                    <Picker.Item label="May" value="4" />
                                    <Picker.Item label="june" value="5" />
                                    <Picker.Item label="july" value="6" />
                                    <Picker.Item label="Agust" value="7" />
                                    <Picker.Item label="September" value="8" />
                                    <Picker.Item label="October" value="9" />
                                    <Picker.Item label="November" value="10" />
                                    <Picker.Item label="December" value="11" />
                                </Picker>
                            </View>
                        </View>
                        <Text style={{ fontSize: 19, fontWeight: '600', color: '#80ffdb', marginBottom: 10 }}>Year</Text>
                        <View style={{ width: '100%', height: 50, backgroundColor: '#f4f9f9', borderRadius: 8, flexDirection: 'row', paddingLeft: 8, marginBottom: 10 }}>

                            <Picker
                                selectedValue={tahun}
                                style={{ height: '100%', width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => setTahun(itemValue)}
                            >
                                <Picker.Item label="2021" value="2021" />
                                <Picker.Item label="2022" value="2022" />
                                <Picker.Item label="2023" value="2023" />
                                <Picker.Item label="2024" value="2024" />
                                <Picker.Item label="2025" value="2025" />
                                <Picker.Item label="2026" value="2026" />
                                <Picker.Item label="2027" value="2027" />
                                <Picker.Item label="2028" value="2028" />
                                <Picker.Item label="2029" value="2029" />

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

export default FormTugas;