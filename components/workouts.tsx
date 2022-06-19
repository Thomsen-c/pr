import { StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text, Switch } from "@react-native-material/core";
import { useContext } from 'react';
import { WorkoutContext } from './workout.context';

interface IProps {
    navigation: any;
}

const styles = StyleSheet.create({
    rowStyles: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        alignContent: 'space-between',
        justifyContent: 'space-evenly',
        width: '90%',
        paddingBottom: 50
    },
    lift: {
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'left',
        width: '50%',
        fontFamily: 'sans-serif'
    },
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        height: 90
    },
    button: {
        margin: 20
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 5,
        alignContent: 'space-between',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingBottom: 50
    },
    liftName: {
        flex: 1,
        fontSize: 30,
        fontWeight: '500',
        fontFamily: 'sans-serif',
        marginLeft: 10
    },
    liftWeight: {
        flex: 2,
        fontSize: 30,
        fontWeight: '500',
        fontFamily: 'sans-serif',
        marginLeft: 30
    },
    completeToggle: {
        flex: 3,
        fontSize: 30,
        fontWeight: '500',
        fontFamily: 'sans-serif',
        marginLeft: 35
    }
})

interface IWorkout {
    Squat: number | undefined | null;
    Bench: number | undefined | null;
    Overhead: number | undefined | null;
    Row: number | undefined | null;
    Deadlift: number | undefined | null;
}


const Workout: React.FC<IProps> = ({ navigation }) => {
    const [isWorkoutA, setIsWorkoutA] = useState(true);
    const { squatWeight, setSquatWeight, benchWeight, setBenchWeight, overheadWeight, setOverheadWeight, deadliftWeight, setDeadliftWeight, rowWeight, setRowWeight } = useContext(WorkoutContext)
    const [isSquatComplete, setIsSquatComplete] = useState(false)
    const [isBenchComplete, setIsBenchComplete] = useState(false)
    const [isOverheadComplete, setIsOverheadComplete] = useState(false)
    const [isDeadliftComplete, setIsDeadliftComplete] = useState(false)
    const [isRowComplete, setIsRowComplete] = useState(false)

    const storeData = async (value: IWorkout) => {
        try {
            const jsonValue = JSON.stringify(value)
            console.log('jsonValue', jsonValue)
            await AsyncStorage.setItem('@workout_values', jsonValue)
        } catch (e) {
            // saving error
            console.log('oops')
        }
    }

    const finishWorkout = useCallback(() => {
        setIsWorkoutA(!isWorkoutA)
        if (isSquatComplete) {
            setSquatWeight(squatWeight + 5)
        }
        setIsSquatComplete(false)
        if (isBenchComplete) {
            setBenchWeight(benchWeight + 5)
        }
        setIsBenchComplete(false)
        if (isOverheadComplete) {
            setOverheadWeight(overheadWeight + 5)
        }
        setIsOverheadComplete(false);
        if (isDeadliftComplete) {
            setDeadliftWeight(deadliftWeight + 10)
        } setIsDeadliftComplete(false)
        if (isRowComplete) {
            setRowWeight(rowWeight + 5)
        }
        setIsRowComplete(false)
        storeData({ Squat: squatWeight + 5, Bench: benchWeight + 5, Overhead: overheadWeight + 5, Deadlift: deadliftWeight + 5, Row: rowWeight + 5 })

    }, [isWorkoutA, isSquatComplete, isBenchComplete, isOverheadComplete, isDeadliftComplete, isRowComplete, storeData])

    const resetWorkout = useCallback(() => {
        // setBenchWeight(0);
        // setDeadliftWeight(0);
        // setSquatWeight(0);
        // setOverheadWeight(0);
        // setRowWeight(0);
        navigation.navigate('home')
    }, [])

    const handleSquatToggle = useCallback(() => {
        isSquatComplete ? setIsSquatComplete(false) : setIsSquatComplete(true)
    }, [isSquatComplete])

    const handleBenchToggle = useCallback(() => {
        setIsBenchComplete(!isBenchComplete);
    }, [isBenchComplete])

    const handleOverheadToggle = useCallback(() => {
        setIsOverheadComplete(!isOverheadComplete);
    }, [isOverheadComplete])

    const handleDeadliftToggle = useCallback(() => {
        setIsDeadliftComplete(!isDeadliftComplete);
    }, [isDeadliftComplete])

    const handleRowToggle = useCallback(() => {
        setIsRowComplete(!isRowComplete);
    }, [isRowComplete])



    const SquatComponent = () => {
        return (
            <View style={styles.rowStyles}>
                <Text style={styles.lift}>Squat</Text>
                <Text style={styles.lift}>{squatWeight}</Text>
                <Switch value={isSquatComplete} onValueChange={handleSquatToggle} />
            </View>
        )
    }

    const WorkoutAComponent = () => {
        return (
            <View>
                <View style={styles.rowStyles}>
                    <Text style={styles.lift}>Bench Press: </Text>
                    <Text style={styles.lift}>{benchWeight}</Text>
                    <Switch value={isBenchComplete} onValueChange={handleBenchToggle} />
                </View>
                <View style={styles.rowStyles}>
                    <Text style={styles.lift}>Overhead Press: </Text>
                    <Text style={styles.lift}>{overheadWeight}</Text>
                    <Switch value={isOverheadComplete} onValueChange={handleOverheadToggle} />
                </View>
            </View>
        )
    }

    const WorkoutBComponent = () => {
        return (
            <View>
                <View style={styles.rowStyles}>
                    <Text style={styles.lift}>Row: </Text>
                    <Text style={styles.lift}>{rowWeight}</Text>
                    <Switch value={isRowComplete} onValueChange={handleRowToggle} />
                </View>
                <View style={styles.rowStyles}>
                    <Text style={styles.lift}>Deadlift: </Text>
                    <Text style={styles.lift}>{deadliftWeight}</Text>
                    <Switch value={isDeadliftComplete} onValueChange={handleDeadliftToggle} />
                </View>
            </View >
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.liftName}>Lift</Text>
                <Text style={styles.liftWeight}>Weight</Text>
                <Text style={styles.completeToggle}>Finish?</Text>
            </View>
            <SquatComponent></SquatComponent>
            {isWorkoutA ? <WorkoutAComponent></WorkoutAComponent> : <WorkoutBComponent></WorkoutBComponent>}
            <Button style={styles.button} title='Finish Workout' onPress={finishWorkout} />
            <Button style={styles.button} title='Return Home' onPress={resetWorkout} />
        </View>
    )
}


export default Workout;