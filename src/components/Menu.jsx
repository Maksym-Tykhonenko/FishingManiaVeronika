import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const Menu = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('GymScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('EncyclopediaScreen')}>
                <Icons type={'1'} active={activeButton === 'EncyclopediaScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('LuresScreen')}>
                <Icons type={'2'} active={activeButton === 'LuresScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('SeasonsScreen')}>
                <Icons type={'3'} active={activeButton === 'SeasonsScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('CatchScreen')}>
                <Icons type={'4'} active={activeButton === 'CatchScreen'}/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('SettingsScreen')}>
                <Icons type={'5'} active={activeButton === 'SettingsScreen'}/>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: 'center',
        flexDirection: 'row',
        padding: 20,
    },
    
    button: {
        width: 66,
        height: 66,
        padding: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default Menu;
