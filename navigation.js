import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import Details from './screens/Details';
import Cart from './screens/Cart';
import Order from './screens/Order';
import Delivery from './screens/Delivery';
import User from './screens/User';
import Login from './screens/AuthScreens/Login';
import Register from './screens/AuthScreens/Register';
import Forgot from './screens/AuthScreens/Forgot';

const Stack = createStackNavigator();

// export default function navigation() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{headerShown: false}}
//         initialRouteName={Welcome}>
//         <Stack.Screen name="Welcome" component={Welcome} />
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Details" component={Details} />

//         <Stack.Group screenOptions={{presentation: 'modal'}}>
//           <Stack.Screen name="Cart" component={Cart} />
//           <Stack.Screen name="Order" component={Order} />
//           <Stack.Screen name="Delivery" component={Delivery} />
//         </Stack.Group>
//         <Stack.Screen name="User" component={User} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

export const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={Home}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />

        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Order" component={Order} />
          <Stack.Screen name="Delivery" component={Delivery} />
        </Stack.Group>
        <Stack.Screen name="User" component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={Welcome}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Forgot" component={Forgot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
