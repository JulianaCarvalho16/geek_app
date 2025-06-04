import React, {useState} from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import Auth from '../services/firebase';

export default function LoginScreen({ navigation }) {
    const [ email, setEmail ] = useState('');
    const [ passoword, setPassword ] = useState('');
    const [ isLogin, setLogin ] = useState(true);

    const heandleAuth = async() => {
        try {
            if (isLogin) {
                const user = await Auth.login(email, passoword);
                if (!user) {
                  Alert.alert('Erro', 'Usuário não autenticado');
                  return;
                }
                navigation.replace('Home');
            } else {
                const user = await Auth.create ( email, passoword );
                Alert.alert('Conta criada com sucesso');
                setLogin(true)
            }
        } catch (error){
            Alert.alert('Erro', error.message);
        }
    };

    return (
        <View style={style.container} screenOptions={{ title: '' }}>
            <Text style={style.title}>{isLogin ? 'Login' : 'Criar Conta'}</Text>
            <TextInput
            placeholder = "Email"
            value = {email}
            onChangeText = {setEmail}
            style = {style.input}
            keyboardType="email-andress"
            />
            <TextInput
            placeholder = "Senha"
            value = {passoword}
            onChangeText = {setPassword}
            secureTextEntry
            style = {style.input}
            />
            <Button title={isLogin ? 'Entrar' : 'Cadastrar'} onPress={heandleAuth} />
            <Text style={style.toggle} onPress={() => setLogin(!isLogin)}>
                {isLogin ? 'Não tem uma conta: Cadastre-se aqui' : 'Já tem conta? Faça Login'}
            </Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        background: '#fff',
    },
    title: {
        fontSize: 28,
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 16,
        paddingBottom: 16,
        paddingVertical: 8,
        paddingHorizontal: 4,
        fontSize: 16,
    },
    toggle: {
        marginTop: 16,
        textAlign: 'center',
        color: '#0938e3'
    },
});