import React, {useState} from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../../BackEnd/config/firebase';
import { auth } from '../../BackEnd/config/firebase';

export default function LoginScreen({ navigation }) {
    const [ email, setEmail ] = useState('');
    const [ passoword, setPassword ] = useState('');
    const [ isLogin, setLogin ] = useState(true);

    const heandleAuth = async() => {
        try {
            if (isLogin){
                await signInWithEmailAndPassword( auth, email, passoword );
                navigation.replace('Home');
            } else {
                await createUserWithEmailAndPassword( auth, email, passoword );
                Alert.alert('Conta criada com sucesso');
                setLogin(true)
            }
        } catch (error){
            Alert.alert('Erro', error.message);
        }
    };

    return (
        <View style={style.container}>
            <Text style={style.title}>{isLogin ? 'Login' : 'Criar Conta'}</Text>
            <TextInput
            placeholder = "Email"
            value = "email"
            onChangeText = {setEmail}
            style = {stayles.input}
            keyboardType="email-andress"
            />
            <TextInput
            placeholder = "Senha"
            value = {passoword}
            onChangeText = {setPassword}
            secureTextEntry
            style = {styles.input}
            />
            <Button title={isLogin ? 'Entrar' : 'Cadastrar'} onPress={heandleAuth}/>
            <Text style={styles.toggle} onPress={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Não tem uma conta: Cadastre-se aqui' : 'Já tem conta? Faça Login'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        background: '#fff',
    },
    title: {
        fontSize: 28,
        marginBottom: 24,
        textAlign: 'Center',
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
        color: '#007BFF'
    },
});