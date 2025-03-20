import React, { useState } from "react"
import { View, Text,ImageBackground, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const Seasons = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState('winter')

    return (
        <View style={{flex:1}}>
            <ImageBackground style={{flex:1}} source={require('../assets/newDiz/bg.png')}>
            <View style={styles.container}>

                <Image source={require('../assets/decor/little-fisher.png')} style={{width: 154, height: 208, resizeMode: 'contain', position: 'absolute', top: height * 0.07, right: 0}} />
                <Image source={require('../assets/decor/hook.png')} style={{width: 58, height: 123, resizeMode: 'contain', position: 'absolute', top: height * 0.07, right: '42%'}} />
                <Image source={require('../assets/decor/part-hook.png')} style={{width: 58, height: 62, resizeMode: 'contain', position: 'absolute', top: height * 0.14, right: '41.1%', zIndex: 10}} />
                <View style={{ height: 85 }} />
    
                {
                    selected === 'winter' ? (
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => setSelected('winter')}>
                                <Image source={require('../assets/buttons/winter.png')} style={styles.btn} />
                            </TouchableOpacity>
                            <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center'}}>
                                <TouchableOpacity onPress={() => setSelected('autumn')}>
                                    <Image source={require('../assets/buttons/autumn.png')} style={styles.btn} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelected('spring')}>
                                    <Image source={require('../assets/buttons/spring.png')} style={styles.btn} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelected('summer')}>
                                    <Image source={require('../assets/buttons/summer.png')} style={styles.btn} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) :
                     selected === 'spring' ? (
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => setSelected('spring')}>
                                <Image source={require('../assets/buttons/spring.png')} style={styles.btn} />
                            </TouchableOpacity>
                            <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                                <TouchableOpacity onPress={() => setSelected('winter')}>
                                    <Image source={require('../assets/buttons/winter.png')} style={styles.btn} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelected('summer')}>
                                    <Image source={require('../assets/buttons/summer.png')} style={styles.btn} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelected('autumn')}>
                                    <Image source={require('../assets/buttons/autumn.png')} style={styles.btn} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) :
                        selected === 'summer' ? (
                            <View style={{width: '100%', alignItems: 'center'}}>
                                <TouchableOpacity onPress={() => setSelected('summer')}>
                                    <Image source={require('../assets/buttons/summer.png')} style={styles.btn} />
                                </TouchableOpacity>
                                <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                                    <TouchableOpacity onPress={() => setSelected('spring')}>
                                        <Image source={require('../assets/buttons/spring.png')} style={styles.btn} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setSelected('autumn')}>
                                        <Image source={require('../assets/buttons/autumn.png')} style={styles.btn} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setSelected('winter')}>
                                        <Image source={require('../assets/buttons/winter.png')} style={styles.btn} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                    ) : (
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => setSelected('autumn')}>
                                <Image source={require('../assets/buttons/autumn.png')} style={styles.btn} />
                            </TouchableOpacity>
                            <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                                <TouchableOpacity onPress={() => setSelected('summer')}>
                                    <Image source={require('../assets/buttons/summer.png')} style={styles.btn} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelected('winter')}>
                                    <Image source={require('../assets/buttons/winter.png')} style={styles.btn} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelected('spring')}>
                                    <Image source={require('../assets/buttons/spring.png')} style={styles.btn} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }

                <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('ReadSeasonsScreen', {type: selected})}>
                    <LinearGradient colors={["#7bcffe", "#275585"]} style={styles.navBtn}>
                        <Text style={styles.btnText}>{
                            selected === 'winter' ? 'Winter' :
                            selected === 'summer' ? 'Summer' :
                            selected === 'spring' ? 'Spring' :
                            'Autumn'
                            }</Text>
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
        paddingTop: height * 0.07,
    },

    btn: {
        width: 167,
        height: height * 0.18,
        resizeMode: 'contain',
        marginBottom: height * 0.015
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

export default Seasons;