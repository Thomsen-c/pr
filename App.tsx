import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import Home from './components/home';
import Workout from './components/workouts';
import { WorkoutContextProvider } from './components/workout.context';


export default function App() {

  const Stack = createNativeStackNavigator()

  return (
    <WorkoutContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={Home}
          />
          <Stack.Screen name="workout" component={Workout} />
        </Stack.Navigator>
      </NavigationContainer>
    </WorkoutContextProvider>
  );
}
