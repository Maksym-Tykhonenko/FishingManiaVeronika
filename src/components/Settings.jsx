import React from "react"
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions, Image, Switch, ImageBackground } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import { useMusic } from '../constants/music.js';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Settings = () => {
    const { isPlaying, togglePlay } = useMusic();

    const resetProgress = async () => {
        try {
            await AsyncStorage.removeItem("catches");
            await AsyncStorage.removeItem("account");
            Alert.alert("Success", "All catches along with your account have been reset.");
        } catch (error) {
            console.error("Failed to reset progress", error);
            Alert.alert("Error", "Failed to reset catches.");
        }
    };
    

    return (
        <View style={{flex:1}}>
            <ImageBackground style={{flex:1}} source={require('../assets/newDiz/bg.png')}>
             <View style={styles.container}>

                <Image source={require('../assets/decor/little-fisher.png')} style={{width: 154, height: 208, resizeMode: 'contain', position: 'absolute', top: height * 0.07, right: 0}} />
                <Image source={require('../assets/decor/hook.png')} style={{width: 58, height: 123, resizeMode: 'contain', position: 'absolute', top: height * 0.15, right: '52%'}} />
                <Image source={require('../assets/decor/part-hook.png')} style={{width: 58, height: 62, resizeMode: 'contain', position: 'absolute', top: height * 0.22, right: '51.1%', zIndex: 10}} />
                
                <View style={{height: 170}} />

                <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', padding: 20, justifyContent: 'flex-start', backgroundColor: '#0470ec', borderRadius: 27, borderWidth: 2, borderColor: '#f2b33e', marginBottom: 50}}>
                    <View style={{width: 33, height: 33, marginRight: 15}}>
                        <Icons type={'music'} />
                    </View>
                    <Text style={styles.title}>Music</Text>
                    <Switch value={isPlaying} onValueChange={togglePlay} thumbColor="#f2b33e" trackColor={{ false: "#ccc", true: "#7bcffe" }} />
                </View>

                <TouchableOpacity style={styles.btn} onPress={resetProgress}>
                    <LinearGradient colors={["#7bcffe", "#275585"]} style={styles.btn}>
                        <Text style={styles.btnText}>Reset Progress</Text>
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
        padding: 40,
        paddingTop: height * 0.07,
    },

    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#fff',
        marginRight: '35%'
    },

    btn: {
        width: 274,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },

    btnText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#040404',
        lineHeight: 21.6
    },

})

export default Settings;