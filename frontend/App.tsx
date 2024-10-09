import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screen/HomeScreen';
import TodoScreen from './src/screen/TodoScreen';
import Converter from './src/screen/Converter';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TodoScreen" component={TodoScreen} />
        <Stack.Screen name="Converter" component={Converter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
