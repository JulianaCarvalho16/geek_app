// front/screens/LoginScreen.js
import React, { useState } from 'react';
import API from '../services/api';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { signIn, signUp } from '../services/api'; // Ajuste conforme seu back-end

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signIn(email, password);
        navigation.replace('Home');
      } else {
        await signUp(email, password);
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        setIsLogin(true);
      }
    } catch (error) {
      Alert.alert('Erro', error.message || 'Algo deu errado');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.title}>{isLogin ? 'Login' : 'Criar Conta'}</Text>

          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            placeholder="Senha"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.buttonContainer}>
            <Button title={isLogin ? 'Entrar' : 'Registrar'} onPress={handleAuth} />
          </View>

          <Text style={styles.toggle} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Não tem uma conta? Crie aqui.' : 'Já tem uma conta? Faça login.'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#343a40',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 15,
    borderColor: '#ced4da', 
    borderWidth: 1,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  toggle: {
    marginTop: 15,
    textAlign: 'center',
    color: '#007bff',
  },
});
