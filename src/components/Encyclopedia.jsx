import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions,ImageBackground } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const Encyclopedia = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState('river')

    return (
        <View style={{flex:1}}>
            <ImageBackground style={{flex:1}} source={require('../assets/newDiz/bg.png')}>
<View style={styles.container}>

                <Image source={require('../assets/decor/little-fisher.png')} style={{width: 154, height: 208, resizeMode: 'contain', position: 'absolute', top: height * 0.07, right: 0}} />
                <Image source={require('../assets/decor/hook.png')} style={{width: 58, height: 123, resizeMode: 'contain', position: 'absolute', top: height * 0.07, right: '52%'}} />
                <Image source={require('../assets/decor/part-hook.png')} style={{width: 58, height: 62, resizeMode: 'contain', position: 'absolute', top: height * 0.14, right: '51.1%', zIndex: 10}} />
                <View style={{ height: 85 }} />
    
                {
                    selected === 'river' ? (
                        <>
                            <TouchableOpacity onPress={() => setSelected('river')}>
                                <Image source={require('../assets/buttons/river.png')} style={styles.btn} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelected('sea')}>
                                <Image source={require('../assets/buttons/sea.png')} style={styles.btn} />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => setSelected('sea')}>
                                <Image source={require('../assets/buttons/sea.png')} style={styles.btn} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelected('river')}>
                                <Image source={require('../assets/buttons/river.png')} style={styles.btn} />
                            </TouchableOpacity>
                        </>
                    )
                }

                <Text style={styles.title}>{selected === 'river' ? 'River Encyclopedia' : 'Sea Encyclopedia'}</Text>

                <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('ReadFishScreen', {type: selected})}>
                    <LinearGradient colors={["#7bcffe", "#275585"]} style={styles.navBtn}>
                        <Text style={styles.btnText}>Read</Text>
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

    btn: {
        width: 167,
        height: height * 0.18,
        resizeMode: 'contain',
        marginBottom: 20
    },

    navBtn: {
        width: 274,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },

    btnText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#040404',
        lineHeight: 21.6
    },

    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#fff',
        marginBottom: height * 0.065
    }

})

export default Encyclopedia;