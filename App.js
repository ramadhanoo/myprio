import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Splash from './screens/Splash';
import Awal from './screens/Awal';
import Home from './screens/Home';
import Jadwal from './screens/Jadwal';
import Ujian from './screens/Ujian';
import Aktivitas from './screens/Aktivitas';
import Tugas from './screens/Tugas';

import FormJadwal from './screens/FormJadwal';
import FormUjian from './screens/FormUjian';
import FormTugas from './screens/FormTugas';
import FormAktivitas from './screens/FormAktivitas';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} options={{
        headerShown: false
      }} />
      <Stack.Screen name="FormJadwal" component={FormJadwal} options={{
        headerShown: false
      }} />
      <Stack.Screen name="FormUjian" component={FormUjian} options={{
        headerShown: false
      }} />
      <Stack.Screen name="FormTugas" component={FormTugas} options={{
        headerShown: false
      }} />
      <Stack.Screen name="FormAktivitas" component={FormAktivitas} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Ujian" component={Ujian} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Tugas" component={Tugas} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Aktivitas" component={Aktivitas} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Jadwal" component={Jadwal} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Home" component={Home} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Login" component={Login} options={{
        headerShown: false
      }} />



      <Stack.Screen name="Register" component={Register} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Awal" component={Awal} options={{
        headerShown: false
      }} />


    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
