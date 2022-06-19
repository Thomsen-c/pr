import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import React, { useContext, useEffect } from "react";
import { Button, Text, TextInput } from "@react-native-material/core";
import { WorkoutContext } from './workout.context'
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Props {
    navigation: any;
}

interface IWorkout {
    Squat: number | undefined | null;
    Bench: number | undefined | null;
    Overhead: number | undefined | null;
    Row: number | undefined | null;
    Deadlift: number | undefined | null;
}


const Home: React.FC<Props> = ({ navigation }) => {


    const { squatWeight, setSquatWeight, benchWeight, setBenchWeight, overheadWeight, setOverheadWeight, rowWeight, setRowWeight, deadliftWeight, setDeadliftWeight } = useContext(WorkoutContext)

    const handlePress = () => {
        navigation.navigate('workout')
    }


    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@workout_values')
            console.log('jsonValue', jsonValue)
            console.log('parsedValue', JSON.parse(jsonValue))
            return jsonValue != null ? JSON.parse(jsonValue) : null;
            //return jsonValue != null ? jsonValue : null;
        } catch (e) {
            // error reading value
        }
    }



    useEffect(() => {
        const data = getData();
        console.log('homedata', data)
    }, [])



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.header}>5x5</Text>
                <View style={styles.inputRow}>
                    <Text style={styles.inputText}>Squat </Text>
                    <TextInput value={squatWeight ? `${squatWeight}` : '0'} onChangeText={value => setSquatWeight(parseInt(value))} style={styles.inputValue} keyboardType='numeric' returnKeyType='default' />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.inputText}>Overhead </Text>
                    <TextInput value={overheadWeight ? `${overheadWeight}` : '0'} style={styles.inputValue} onChangeText={value => setOverheadWeight(parseInt(value))} style={styles.inputValue} keyboardType='numeric' returnKeyType='next' />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.inputText}>Bench </Text>
                    <TextInput value={benchWeight ? `${benchWeight}` : '0'} style={styles.inputValue} onChangeText={value => setBenchWeight(parseInt(value))} style={styles.inputValue} keyboardType='numeric' />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.inputText}>Row </Text>
                    <TextInput value={rowWeight ? `${rowWeight}` : '0'} style={styles.inputValue} onChangeText={value => setRowWeight(parseInt(value))} style={styles.inputValue} keyboardType='numeric' />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.inputText}>Deadlift </Text>
                    <TextInput value={deadliftWeight ? `${deadliftWeight}` : '0'} style={styles.inputValue} onChangeText={value => setDeadliftWeight(parseInt(value))} style={styles.inputValue} keyboardType='numeric' />
                </View>
                <StatusBar style="auto" />
                <View>
                    <Button title="start-workout" onPress={handlePress}>Start Workout</Button>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 90,
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
    },
    inputRow: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        alignContent: 'space-between',
        justifyContent: 'space-evenly'
    },
    inputText: {
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'left',
        width: 200,
        fontFamily: ''
    },
    inputValue: {
        backgroundColor: 'grey',
        justifyContent: 'flex-end',
        width: 100,
        fontSize: 30,
        fontWeight: '500'
    }
});


export default Home