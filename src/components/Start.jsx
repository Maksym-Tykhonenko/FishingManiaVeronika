import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, Alert, ImageBackground } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get('window');

const First = () => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const [profile, setProfile] = useState(false);
    const [image, setImage] = useState(require('../assets/user.png'));
    const [nickname, setNickname] = useState(null);
    const [age, setAge] = useState(null);

    const loadProfile = async () => {
        try {
            const storedProfile = await AsyncStorage.getItem("account");
            if (storedProfile) {
                const profile = JSON.parse(storedProfile);
                if (profile) {
                    setProfile(true);
                }
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        }
    };    

    useEffect(() => {
        loadProfile();
    }, []);    

    const handleButtonPress = () => {
        if(profile) {
            navigation.navigate('EncyclopediaScreen')
        } else {
            setIndex((prevIndex) => (prevIndex + 1) % 2);
            if(index === 1) {
                handleCreateProfile();
            }    
        }
    };

    const uploadImage = async () => {
        try {
            const result = await new Promise((resolve, reject) => {
                launchImageLibrary({ mediaType: "photo", quality: 0.8 }, ({ assets, errorMessage }) => {
                    if (errorMessage) reject(errorMessage);
                    else resolve(assets?.[0]?.uri || null);
                });
            });
    
            if (result) setImage(result);
        } catch (error) {
            Alert.alert("Error", "Failed to select image.");
        }
    };

    const handleCreateProfile = async () => {
        if (!nickname || !age || !image) {
            Alert.alert("Error", "Please fill in all fields to create your account");
            return;
        }        
        try {
            const profileData = {
                image: image,
                nickname,
                age,
            };
            await AsyncStorage.setItem("account", JSON.stringify(profileData));
            setProfile(true);
            navigation.navigate('EncyclopediaScreen')
            console.log("Profile saved:", profileData);
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };
//<LinearGradient colors={["#0470ec", "#012355"]} style={{width: '100%', height: '100%'}}></LinearGradient>
    return (
        <View style={{flex:1}}>
            <ImageBackground style={{flex:1,width: width,
                                          height: height,}} source={require('../assets/newDiz/bgForSplScr.png')}>
                
            <View style={styles.container}>

                {
                    index === 0 && (
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <Image source={require('../assets/logo.png')} style={{width: 295, height: 200, resizeMode: 'contain', marginBottom: 100, marginTop: height * 0.2}} />
                            
                        </View>
                    )
                }

                {
                    index === 1 && (
                        <View style={{width: '100%', alignItems: 'center', flexGrow: 1}}>
                            <TouchableOpacity onPress={uploadImage}>
                                <Image 
                                    source={typeof image === "string" ? { uri: image } : image} 
                                    style={{
                                        width: 140, 
                                        height: 144, 
                                        resizeMode: typeof image === "string" ? 'cover' : 'contain', 
                                        borderRadius: typeof image === "string" ? 300 : 0, 
                                        marginBottom: 30
                                    }} 
                                    />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                placeholder="Nickname"
                                placeholderTextColor="#999"
                                value={nickname}
                                onChangeText={setNickname}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Age"
                                placeholderTextColor="#999"
                                value={age}
                                onChangeText={setAge}
                            />
                            <Image source={require('../assets/decor/fisher.png')} style={{width: 415, height: 454, resizeMode: 'contain', position: 'absolute', right: -80, bottom: -50}} />
                        </View>
                    )
                }

                <TouchableOpacity style={styles.btn} onPress={handleButtonPress}>
                    <LinearGradient colors={["#7bcffe", "#275585"]} style={styles.btn}>
                        <Text style={styles.btnText}>{index === 0 ? 'Cast & Catch' : 'Create account'}</Text>
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

    image: {
        resizeMode: 'contain',
        marginBottom: height * 0.09,
    },

    text: {
        fontWeight: '500',
        fontSize: 18,
        color: '#fff',
        lineHeight: 21.6
    },

    input: {
        width: '70%', 
        borderRadius: 100,
        backgroundColor: '#d0d0d0',
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 21.6,
        zIndex: 10
    },

    btn: {
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
    }

})

export default First;