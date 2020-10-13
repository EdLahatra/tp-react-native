import './GestureHandler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Produits, Login, Password, Acceuil, Encaissement } from '../screens';
import TpeScreen from '../screens/Tpe';
import { Keyboard } from '../components/Keyboard';

// export type StackParams = {
//   Home: undefined;
//   Produits: {data: string} | undefined;
// };

export type StackParams = {
  Login: undefined;
  Tpe: undefined;
  Home: undefined;
  Produits: { data: string } | undefined;
  Password: undefined;
  Acceuil: undefined;
  Keyboard: undefined;
  Encaissement: undefined;
};

const Stack = createStackNavigator<StackParams>();

export function Navigation() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={Home} />
    //     <Stack.Screen name="Produits" component={Produits} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Tpe" component={TpeScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Produits" component={Produits} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="Acceuil" component={Acceuil} />
        <Stack.Screen name="Keyboard" component={Keyboard} />
        <Stack.Screen name="Encaissement" component={Encaissement} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
