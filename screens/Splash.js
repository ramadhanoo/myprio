import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Image,
    Dimensions,
    Easing,
    ActivityIndicator,
    useColorScheme,
    StatusBar
} from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('window')
import AsyncStorage from '@react-native-async-storage/async-storage';





const Splash = ({ navigation }) => {
    const translateY = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        //naik()
        
        setTimeout(async () => {
            try {
                setTimeout(async () => {
                    try {
                        const jsonValue = await AsyncStorage.getItem("mahasiswa")
                        var data = JSON.parse(jsonValue);
                        console.log(data)
                        if (data) {
                            navigation.replace("Home");
                        } else {
                            navigation.replace("Awal");
                        }

                    } catch (e) {
                        // error reading value
                    }

                }, 1000)

            } catch (e) {
                //error reading value
            }

        }, 1000)
    })

    // const naik = async () => {
    //     Animated.timing(translateY, {
    //         toValue: -100,
    //         duration: 700,
    //         useNativeDriver: true
    //     }).start(() => {
    //         
    //     });
    // }


    const signOut = async () => {
        try {
            await AsyncStorage.removeItem('mahasiswa')
            navigation.replace("Awal");
        } catch (e) {

        }
    }

    return (
        <View style={styles.container}>

            <Animated.Image source={require('../images/logo.png')} style={[{ height: 150, width: 200 }]} />
            <ActivityIndicator size={"large"} style={{ marginTop: 20 }} />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#80ffdb'
    }
})

export default Splash;