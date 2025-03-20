import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, Alert, ScrollView } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchImageLibrary } from "react-native-image-picker";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const AddCatch = () => {
    const navigation = useNavigation();
    const [weight, setWeight] = useState(null);
    const [length, setLength] = useState(null);
    const [text, setText] = useState(null);
    const [images, setImages] = useState([]);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const uploadImage = async () => {
        try {
            const result = await new Promise((resolve, reject) => {
                launchImageLibrary(
                    { mediaType: "photo", quality: 0.8, selectionLimit: 10 },
                    ({ assets, errorMessage }) => {
                        if (errorMessage) reject(errorMessage);
                        else resolve(assets || []);
                    }
                );
            });
    
            if (result.length > 0) {
                setImages(prevImages => [...prevImages, ...result.map(asset => asset.uri)]);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to select images.");
        }
    };
    
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;

    const showDatePicker = () => {
        if(showPicker) {
            setShowPicker(false)
        } else {
            setShowPicker(true)
        }
    };

    const onChange = (event, selectedDate) => {
        setShowPicker(Platform.OS === "ios");
        if (selectedDate) setDate(selectedDate);
    };

    const handleAddCatch = async () => {
        if (!weight || !length || images.length === 0 || !text) {
            Alert.alert("Error", "Please fill in all fields and add at least one image.");
            return;
        }
    
        try {
            const newCatch = {
                id: Date.now().toString(),
                weight,
                length,
                text,
                images,
                date: formattedDate,
            };
    
            const storedCatches = await AsyncStorage.getItem("catches");
            const parsedCatches = storedCatches ? JSON.parse(storedCatches) : [];
    
            const updatedCatches = [...parsedCatches, newCatch];
    
            await AsyncStorage.setItem("catches", JSON.stringify(updatedCatches));
    
            Alert.alert("Success", "Catch saved successfully!");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "Failed to save the catch.");
        }
    };    

    return (
        <LinearGradient colors={["#0470ec", "#012355"]} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>

                <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center'}}>
                    {
                        images.length > 0 && (
                            <ScrollView key={images.length} horizontal style={{maxHeight: 180, marginBottom: 20}}>
                                {
                                    images.map((image, index) => (
                                        <Image key={index} source={{uri: image}} style={{width: 167, height: 167, borderRadius: 27, margin: 5, resizeMode: 'cover'}} />
                                    ))
                                }
                            </ScrollView>
                        )
                    }

                    {
                        images.length > 0  && (
                            <View style={{width: '100%', borderWidth: 1.5, borderColor: '#f2b33e', marginBottom: 20}} />
                        )
                    }

                    {
                        images.length > 0 && (
                            <TouchableOpacity style={styles.uploadBtn} onPress={uploadImage}>
                                <LinearGradient colors={["#7bcffe", "#275585"]} style={styles.uploadBtn}>
                                    <Text style={styles.uploadBtnText}>Add photo</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        )
                    }

                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                        <Text style={styles.label}>Weight (kg)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0"
                            placeholderTextColor="#fff"
                            value={weight}
                            onChangeText={setWeight}
                        />
                    </View>
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                        <Text style={styles.label}>Length (cm)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0"
                            placeholderTextColor="#fff"
                            value={length}
                            onChangeText={setLength}
                        />
                    </View>

                    {
                        images.length === 0 && (
                            <View style={styles.imageBtnContainer}>
                                <Image source={require('../assets/decor/image.png')} style={{width: 74, height: 74, resizeMode: 'contain', marginBottom: 22}} />
                                <TouchableOpacity style={styles.uploadBtn} onPress={uploadImage}>
                                    <LinearGradient colors={["#7bcffe", "#275585"]} style={styles.uploadBtn}>
                                        <Text style={styles.uploadBtnText}>Add photo</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>    
                        )
                    }

                    <TouchableOpacity style={styles.dateBtn} onPress={showDatePicker}>
                        <Text style={styles.dateBtnText}>{formattedDate}</Text>
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker 
                            value={date} 
                            mode="date" 
                            display="spinner" 
                            themeVariant="dark"
                            onChange={onChange} 
                        />
                    )}

                    <TextInput
                        style={styles.textInput}
                        placeholder="Text"
                        placeholderTextColor="#fff"
                        value={text}
                        onChangeText={setText}
                        multiline
                    />

                    <View style={{height: 100}} />
                </ScrollView>

                <TouchableOpacity style={styles.btn} onPress={handleAddCatch}>
                    <LinearGradient colors={["#7bcffe", "#275585"]} style={styles.btn}>
                        <Text style={styles.btnText}>Save</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        </LinearGradient>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 40,
        paddingTop: height * 0.07,
    },

    label: {
        fontWeight: '500',
        fontSize: 20,
        color: '#fff',
        lineHeight: 24
    },

    input: {
        borderRadius: 100,
        backgroundColor: '#0470ec',
        paddingVertical: 14,
        paddingHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 21.6,
        borderWidth: 2,
        borderColor: '#f2b33e'
    },

    textInput: {
        width: '100%',
        borderRadius: 100,
        backgroundColor: '#0470ec',
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 21.6,
        borderWidth: 2,
        borderColor: '#f2b33e'
    },

    btn: {
        width: 274,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        position: 'absolute',
        bottom: 30
    },

    btnText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#040404',
        lineHeight: 21.6
    },

    imageBtnContainer: {
        width: 167,
        height: 167,
        borderWidth: 2,
        borderColor: '#f2b33e',
        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0470ec',
        paddingTop: 20,
        marginBottom: 20
    },

    uploadBtn: {
        width: 163,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 27,
        marginTop: -3
    },

    uploadBtnText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#040404',
        lineHeight: 21.6
    },

    dateBtn: {
        borderRadius: 100,
        backgroundColor: '#0470ec',
        paddingVertical: 14,
        paddingHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#f2b33e',
        marginBottom: 20
    },

    dateBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 21.6,
    },

})

export default AddCatch;