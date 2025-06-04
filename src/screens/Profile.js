import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';
import Auth from '../services/firebase';

export default function Profile({ navigation }) {
  const { colorScheme } = useColorScheme();

  const handleLogout = async () => {
    try {
      await Auth.logout();
      await AsyncStorage.removeItem('token');
      navigation.replace('Login');
    } catch (error) {
      console.error("Erro ao deslogar:", error);
      Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-5 bg-white dark:bg-neutral-900">
      <Text className="text-2xl mb-5 text-black dark:text-white">Perfil do Usuário</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}