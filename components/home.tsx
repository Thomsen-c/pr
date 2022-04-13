import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import React, { useContext } from "react";
import { Button, Text, TextInput } from "@react-native-material/core";
import { WorkoutContext } from './workout.context'

interface Props {
    navigation: any;
}



const Home: React.FC<Props> = ({ navigation }) => {


    const { setSquatWeight, setBenchWeight, setOverheadWeight, setRowWeight, setDeadliftWeight } = useContext(WorkoutContext)

    const handlePress = () => {
        navigation.navigate('workout')
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.header}>5x5</Text>
                <View style={styles.inputRow}>
                    <Text style={styles.inputText}>Squat </Text>
                    <TextInput onChangeText={value => setSquatWeight(parseInt(value))} style={styles.inputValue} keyboardType='numeric' returnKeyType='default' />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.inputText}>Overhead </Text>
                    <TextInput style={styles.inputValue} onChangeText={value => setOverheadWeight(parseInt(value))} style={styles.inputValue} keyboardType='numeric' returnKeyType='next' />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.inputText}>Bench </Text>
                    <TextInput style={styles.inputValue} onChangeText={value => setBenchWeight(parseInt(value))} style={styles.inputValue} keyboardType='numeric' />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.inputText}>Row </Text>
                    <TextInput style={styles.inputValue} onChangeText={value => setRowWeight(parseInt(value))} style={styles.inputValue} keyboardType='numeric' />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.inputText}>Deadlift </Text>
                    <TextInput style={styles.inputValue} onChangeText={value => setDeadliftWeight(parseInt(value))} style={styles.inputValue} keyboardType='numeric' />
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
        fontFamily: 'Helvetica'
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
        fontFamily: 'Helvetica'
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