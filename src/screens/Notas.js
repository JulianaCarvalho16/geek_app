import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { ListItem } from '@rneui/themed';
import Auth from '../services/firebase';
import Denotas from './Denotas';

export default function Notas(props) {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = await Auth.checkIfLogin();
        if (user) {
          const tasks = await Auth.getUserTasks(user.uid);
          setLista(tasks);
        }
      } catch (error) {
        console.log('Erro ao buscar tarefas:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <ScrollView>
      <View>
        <TouchableOpacity style={styles.Botao} onPress={() => props.navigation.navigate('criartarefa')}>
          <Text style={styles.textodobotao}>Criar Uma Nota</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.barra}>
        {lista.map((not) => (
          <ListItem
            bottomDivider
            key={not.id}
            onPress={() => {
              props.navigation.navigate('Denotas', {
                taskId: not.id,
              });
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{not.title}</ListItem.Title>
              <ListItem.Subtitle>{not.date}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Botao: {
    backgroundColor: '#760491',
    borderColor: '#DB5D11',
    borderWidth: 5,
    marginLeft: 0,
    marginRight: 40,
    marginTop: 0,
  },
  textodobotao: {
    textAlign: 'right',
    padding: 50,
    color: 'white',
    fontSize: 16,
  },
  botaodeenviar: {
    backgroundColor: '#760264',
    borderColor: 'FC4D00',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textodobotaoenviar: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
  barra: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    fontWeight: 'bold',
  },
});
