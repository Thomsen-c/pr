import { StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from "react";
import { Button, Text, Switch } from "@react-native-material/core";
import { useContext } from 'react';
import { WorkoutContext } from './workout.context';

interface IProps {
    squatWeight: number;
    benchWeight: number;
    overheadWeight: number;
    rowWeight: number;
    deadliftWeight: number;
    navigation: any;
    route: any;
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
        fontFamily: 'Helvetica'
    },
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        height: 90
    }
})


const Workout: React.FC<IProps> = () => {
    const [isWorkoutA, setIsWorkoutA] = useState(true);
    const { squatWeight, setSquatWeight, benchWeight, setBenchWeight, overheadWeight, setOverheadWeight, deadliftWeight, setDeadliftWeight, rowWeight, setRowWeight } = useContext(WorkoutContext)
    const [isSquatComplete, setIsSquatComplete] = useState(false)
    const [isBenchComplete, setIsBenchComplete] = useState(false)
    const [isOverheadComplete, setIsOverheadComplete] = useState(false)
    const [isDeadliftComplete, setIsDeadliftComplete] = useState(false)
    const [isRowComplete, setIsRowComplete] = useState(false)

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
    }, [isWorkoutA, isSquatComplete, isBenchComplete, isOverheadComplete, isDeadliftComplete, isRowComplete])

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
            <SquatComponent></SquatComponent>
            {isWorkoutA ? <WorkoutAComponent></WorkoutAComponent> : <WorkoutBComponent></WorkoutBComponent>}
            <Button title='finish-workout-button' onPress={finishWorkout}>Finish Workout</Button>
        </View>
    )
}


export default Workout;