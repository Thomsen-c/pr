import React, { useState, createContext, ReactNode, SetStateAction } from "react";


const defaultWeights = {
    squatWeight: 0,
    setSquatWeight: () => null,
    benchWeight: 0,
    setBenchWeight: () => null,
    overheadWeight: 0,
    setOverheadWeight: () => null,
    deadliftWeight: 0,
    setDeadliftWeight: () => null,
    rowWeight: 0,
    setRowWeight: () => null,
};


interface Props {
    children?: ReactNode
}

export const WorkoutContext = createContext(defaultWeights);

export const WorkoutContextProvider = ({ children }: Props) => {
    const [squatWeight, setSquatWeight] = useState(0);
    const [benchWeight, setBenchWeight] = useState(0)
    const [overheadWeight, setOverheadWeight] = useState(0);
    const [deadliftWeight, setDeadliftWeight] = useState(0);
    const [rowWeight, setRowWeight] = useState(0);

    const value = {
        squatWeight,
        setSquatWeight,
        benchWeight,
        setBenchWeight,
        overheadWeight,
        setOverheadWeight,
        deadliftWeight,
        setDeadliftWeight,
        rowWeight,
        setRowWeight
    }

    return (
        <WorkoutContext.Provider
            value={value}
        >
            {children}
        </WorkoutContext.Provider>
    );
}