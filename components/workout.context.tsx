import React, { useState, createContext, useContext } from "react";


const defaultWeights = {
    squatWeight: null,
    setSquatWeight: () => null,
    benchWeight: null,
    setBenchWeight: () => null,
    overheadWeight: null,
    setOverheadWeight: () => null,
    deadliftWeight: null,
    setDeadliftWeight: () => null,
    rowWeight: null,
    setRowWeight: () => null,
};

export const WorkoutContext = createContext(defaultWeights);

export const WorkoutContextProvider = ({ children }) => {
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