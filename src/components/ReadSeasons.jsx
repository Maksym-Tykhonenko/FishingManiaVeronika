import React, { useState, useRef } from "react";
import { View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { winter, summer, spring, autumn } from '../constants/seasons.js';
import Icons from './Icons.jsx'

const { width, height } = Dimensions.get("window");

const ReadSeasons = ({ type }) => {
    const navigation = useNavigation();
    const fishData = type === "winter" ? winter : type === 'summer' ? summer : type === 'spring' ? spring : autumn;
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    const handleScroll = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    return (
        <LinearGradient colors={["#0470ec", "#012355"]} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>

            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                <Icons type={'back'} />
            </TouchableOpacity>

            <Image source={require('../assets/decor/little-fisher.png')} style={{width: 84, height: 113, resizeMode: 'contain', position: 'absolute', top: height * 0.07, right: 0}} />
            <Image source={require('../assets/decor/hook.png')} style={{width: 58, height: 123, resizeMode: 'contain', position: 'absolute', top: height * 0.05, right: '41%'}} />
            <Image source={require('../assets/decor/part-hook.png')} style={{width: 58, height: 62, resizeMode: 'contain', position: 'absolute', top: height * 0.118, right: '41%', zIndex: 10}} />

            <Text style={styles.title}>{fishData[currentIndex]?.title}</Text>

            <View style={{ height: 20}} />

            <FlatList
                ref={flatListRef}
                data={fishData}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Image source={fishData[currentIndex]?.image} style={styles.image} />
                    </View>
                )}
            />

            <View style={styles.pagination}>
                {fishData.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index && styles.activeDot
                        ]}
                    />
                ))}
            </View>

            <ScrollView style={{width: '100%'}}>
                <Text style={styles.description}>{fishData[currentIndex]?.description}</Text>
            </ScrollView>

            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: height * 0.07,
    },

    back: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: height * 0.06,
        left: 20,
    },

    imageContainer: {
        width: width,
        height: height * 0.6,
        alignItems: "center",
    },

    image: {
        width: '100%',
        height: height * 0.5,
        resizeMode: "contain",
    },

    title: {
        fontSize: 28,
        fontWeight: '900',
        color: "#fff",
        marginBottom: 10,
    },

    description: {
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 24,
        color: "#fff",
        paddingHorizontal: 20,
        marginTop: 20
    },

    pagination: {
        flexDirection: "row",
        alignSelf: "center",
        alignItems: 'center',
        position: 'absolute',
        top: height * 0.6
    },

    dot: {
        width: 10,
        height: 10,
        borderRadius: 30,
        backgroundColor: "#d9d9d9",
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    activeDot: {
        width: 14,
        height: 14,
        backgroundColor: "#b9d04a",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

});

export default ReadSeasons;
