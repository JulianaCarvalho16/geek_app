import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Auth from '../services/firebase';
import { useNavigation } from '@react-navigation/native';

export default function CriarTarefa() {
  const navigation = useNavigation();
  const [estado, setEstado] = useState({
    title: '',
    description: '',
    date: '',
    time: ''
  });

  const handleInputChange = (value, name) => {
    setEstado({ ...estado, [name]: value });
  };

  const handleSaveNote = async () => {
  if (estado.title === '' || estado.description === '') {
    Alert.alert('Campo requerido está vazio');
    return;
  }

  const user = await Auth.checkIfLogin();
  if (!user) {
    Alert.alert('Usuário não autenticado');
    return;
  }

  await Auth.createTask( 
    estado.title,
    estado.description,
    null,
    user.uid,
    estado.date,
    estado.time
  );

  Alert.alert('Tarefa criada com sucesso!');
  setEstado({ title: '', description: '', date: '', time: '' });
};


  return (
    <View style={styles.containerpai}>
      <View style={styles.barra}>
        <View style={styles.container}>
          <TextInput placeholder='Coloque o Titulo' style={styles.textocolocado} value={estado.title} onChangeText={(value) => handleInputChange(value, 'title')} />
          <TextInput placeholder='Sobre' multiline style={styles.textocolocado} value={estado.description} onChangeText={(value) => handleInputChange(value, 'description')} />
          <View style={styles.colocardata}>
            <TextInput placeholder="Data (ex: 09/05/2023)" style={styles.Datatexto} value={estado.date} onChangeText={(value) => handleInputChange(value, 'date')} />
            <TextInput placeholder="Hora (ex: 18:30)" style={styles.Datatexto} value={estado.time} onChangeText={(value) => handleInputChange(value, 'time')} />
          </View>
          <TouchableOpacity style={styles.botaodeenviar} onPress={handleSaveNote}>
            <Text style={styles.textodobotaoenviar}>Salvar nota</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  containerpai: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  barra: { 
    margin: 20, 
    backgroundColor: 'white', 
    borderRadius: 5, 
    width: '90%', 
    padding: 20, 
    elevation: 5, 
  },
  container: { 
    padding: 20,
  },
  handleInputChange: { 
    borderColor: 'slategray', 
    borderWidth: 1, 
    padding: 8, 
    marginTop: 10, 
    borderRadius: 8,
  },
  Datatexto: { 
    borderColor: 'slategray', 
    borderWidth: 1, 
    padding: 8, 
    marginTop: 10, 
    borderRadius: 8, 
    width: '48%' },
  colocardata: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' ,
  },
  botaodeenviar: { 
    backgroundColor: '#6bf7e9', 
    marginTop: 20,
    padding: 10, 
    borderRadius: 10 
  },
  textodobotaoenviar: { 
    textAlign: 'center', 
    color: 'white', 
    fontSize: 16 },
});
