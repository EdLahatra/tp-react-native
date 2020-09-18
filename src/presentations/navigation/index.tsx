import './GestureHandler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home, Produits} from '../screens';

export type StackParams = {
  Home: undefined;
  Produits: {data: string} | undefined;
};

const Stack = createStackNavigator<StackParams>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Produits" component={Produits} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
