import React, { useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    Animated,
    Dimensions,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';
import { banner } from '../data/Data';

//import AsyncStorage from '@react-native-async-storage/async-storage';




const { height, width } = Dimensions.get('window')
const IS_IPHONE_X = height === 812 || height === 896;
const Form = Platform.OS === 'ios' ? (IS_IPHONE_X ? height * 0.35 : height * 0.45) : height * 0.45;
const Safe = Platform.OS === 'ios' ? (IS_IPHONE_X ? 120 : 100) : 100;


const Pagination = ({ scrollX }) => {
    const inputRange = [-width, 0, width]

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: [-13, 0, 13]
    })



    return (
        <View style={{ backgroundColor: 'transparent', width: 60, height: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Animated.View style={[{ position: 'absolute', zIndex: 1, width: 8, height: 8, backgroundColor: '#f9813a', flexDirection: 'row', borderRadius: 8 }, { transform: [{ translateX }] }]}></Animated.View>

            {banner.map((item, index) => {
                return (

                    <View key={index} style={[{ backgroundColor: '#dcdcdc', height: 8, width: 8, borderRadius: 8 }]}>

                    </View>

                )
            })}
        </View>



    )
}

const Item = ({ judul, deskripsi, banner, index, scrollX }) => {
    const inputRange = [
        (index - 1) * width,
        index * width
    ]

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: [0, 0]
    })

    const inputRange2 = [
        (index - 2) * width,
        (index - 1) * width
    ]

    console.log("ini 1", inputRange)

    console.log("ini 2", inputRange2)

    const translateX2 = scrollX.interpolate({
        inputRange: inputRange,
        outputRange: [-width, 0]
    })

    const translateX3 = scrollX.interpolate({
        inputRange: inputRange,
        outputRange: [width * 0.6, 0]
    })
    const translateX4 = scrollX.interpolate({
        inputRange: inputRange,
        outputRange: [width * 0.3, 0]
    })

    return (



        <Animated.View style={[{ backgroundColor: '#80ffdb', width: width, height: height, alignItems: 'center', justifyContent: 'center' }, { transform: [{ translateX: translateX }] }]}

        >

            <Image source={banner} style={[{ width: width * 0.5, height: 250, resizeMode: 'contain', backgroundColor: 'transparent' }]}>

            </Image>
            <View style={{ height: Form, backgroundColor: 'transparent', alignItems: 'center', width: '100%' }}>

                <Animated.View style={[{ width: '100%', backgroundColor: 'transparent', marginTop: 20 }, { transform: [{ translateX: translateX4 }] }]}>

                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>{judul}</Text>
                </Animated.View>
                <Animated.View style={[{ width: '80%', marginTop: 20, }, { transform: [{ translateX: translateX3 }] }]}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>{deskripsi}</Text>
                </Animated.View>
            </View>



        </Animated.View>
    );
}


const Awal = ({ navigation }) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <StatusBar hidden={false} barStyle={'light-content'} />

            <Animated.FlatList
                data={banner}
                keyExtractor={(item) => item.key}
                renderItem={({ item, index }) => (<Item {...item} index={index} scrollX={scrollX} />)}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                bounces={true}
            />
            <SafeAreaView style={{ backgroundColor: 'transparent', height: Safe, width: '90%', position: 'absolute', top: 0, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>

                <TouchableOpacity style={{ width: 90, height: 80, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>

                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>Help</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <View style={{ backgroundColor: 'transparent', height: 130, width: '95%', position: 'absolute', bottom: 0, alignItems: 'center' }}>
                <View style={{ width: 100, height: 45, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>

                    <Pagination scrollX={scrollX} />
                </View>
                <TouchableOpacity onPress={() => navigation.replace("Login")} style={{ width: '100%', height: 45, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#808080' }}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#80ffdb',
    }
})

export default Awal;