import React, {useState} from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert, Platform } from "react-native";
import Auth from '../services/firebase';

export default function LoginScreen({ navigation }) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLogin, setLogin ] = useState(true);

    const heandleAuth = async() => {
        try {
            if (isLogin){
                 const user = await Auth.login ( email, passoword );
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
            keyboardType="email-address"
            />
            <TextInput
            placeholder = "Senha"
            value = {password}
            onChangeText = {setPassword}
            secureTextEntry
            style = {style.input}
            />
            <Button style={style.button} title={isLogin ? 'Entrar' : 'Cadastrar'} onPress={heandleAuth} />
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
        Color: '#000',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
            web: {
                boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
            },
            }),

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
    }
});