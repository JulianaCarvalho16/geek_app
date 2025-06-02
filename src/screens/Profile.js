// src/screens/Profile.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';

export default function Profile({ navigation }) {
  const { colorScheme } = useColorScheme();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  return (
    <View className="flex-1 justify-center items-center px-5 bg-white dark:bg-neutral-900">
      <Text className="text-2xl mb-5 text-black dark:text-white">Perfil do Usuário</Text>
      <Button
        title="Sair"
        onPress={handleLogout}
        
      />
    </View>
  );
}
