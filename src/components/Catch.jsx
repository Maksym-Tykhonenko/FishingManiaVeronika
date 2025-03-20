import React, { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView,ImageBackground } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const Catch = () => {
    const navigation = useNavigation();
    const [catches, setCatches] = useState([]);

    const loadCatches = async () => {
        try {
            const storedCatches = await AsyncStorage.getItem("catches");
            if (storedCatches) {
                setCatches(JSON.parse(storedCatches));
            }
        } catch (error) {
            console.error("Failed to load catches", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadCatches();
        }, [loadCatches])
    );

    return (
        <View style={{flex:1}}>
            <ImageBackground style={{flex:1}} source={require('../assets/newDiz/bg.png')}>
            <View style={styles.container}>

                {
                    catches.length > 0 && (
                        <Text style={[styles.title, {alignSelf: 'flex-start'}]}>My Catches</Text>
                    )
                }

                {
                    catches.length > 0 ? (
                        <ScrollView style={{width: '100%'}}>
                            {
                                catches.map((item, index) => (
                                    <View key={index} style={styles.card}>
                                        <ScrollView key={item.images.length} horizontal style={{maxHeight: 160, marginBottom: 12}}>
                                            {
                                                item.images.map((image, index) => (
                                                    <Image key={index} source={{uri: image}} style={{width: 150, height: 150, borderRadius: 27, margin: 5, resizeMode: 'cover'}} />
                                                ))
                                            }
                                        </ScrollView>
                                        <View style={{width: '100%', borderWidth: 1.5, borderColor: '#f2b33e', marginBottom: 12}} />
                                        <Text style={styles.cardDate}>{item.date}</Text>
                                        <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 12}}>
                                            <Text style={styles.cardDesc}>{item.weight} kg</Text>
                                            <Text style={styles.cardDesc}>{item.length} cm</Text>
                                        </View>
                                        <Text style={styles.cardText}>{item.text}</Text>
                                    </View>
                                ))
                            }
                        </ScrollView>
                    ) : (
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <Image source={require('../assets/decor/fisher-set.png')} style={{width: '100%', height: height * 0.32, resizeMode: 'contain', marginBottom: height * 0.04}} />
                            <Text style={styles.title}>My Catches</Text>
                            <Text style={styles.text}>🐟 A personal fishing journal where you can record every 🎣 successful catch. Add 📸 photos, specify 📏 catch details, and build your own 🏆 trophy collection!</Text>
                        </View>
                    )
                }

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AddCatchScreen')}>
                    <LinearGradient colors={["#7bcffe", "#275585"]} style={styles.btn}>
                        <Text style={styles.btnText}>Add catch</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
            </ImageBackground>
        </View>
      
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 40,
        paddingTop: height * 0.07,
    },

    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#fff',
        marginBottom: height * 0.06
    },

    text: {
        fontSize: height * 0.022,
        fontWeight: '500',
        color: '#fff',
        lineHeight: 24,
    },

    btn: {
        width: 274,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        position: 'absolute',
        bottom: 70
    },

    btnText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#040404',
        lineHeight: 21.6
    },

    card: {
        width: '100%',
        alignItems: 'center',
        padding: 20,
        borderRadius: 27,
        borderWidth: 2,
        borderColor: '#f2b33e',
        marginBottom: 12
    },

    cardDate: {
        fontSize: 15,
        fontWeight: '300',
        color: '#fff',
        lineHeight: 21.6,
        marginBottom: 12
    },

    cardDesc: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
        lineHeight: 21.6,
    },

    cardText: {
        width: '100%',
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
        lineHeight: 21.6,
    }

})

export default Catch;