import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text} from 'react-native';
import API from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async () => {
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const res = await API.post(endpoint, { email, password });

      if (isLogin) {
        const token = res.data.token;
        navigation.replace('Home', { token });
      } else {
        Alert.alert('Usuário registrado!');
        setIsLogin(true);
      }
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.error || 'Erro no servidor');
    }
  };

  return (
    <View>
      <TextInput  placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Senha" secureTextEntry onChangeText={setPassword} />
      <Button title={isLogin ? 'Login' : 'Registrar'} onPress={handleSubmit} />
      <Text onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Não tem conta? Registre-se' : 'Já tem conta? Login'}
      </Text>
    </View>
  );
}