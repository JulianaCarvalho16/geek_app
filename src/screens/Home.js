import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListItem } from '@rneui/themed';
import Auth from '../services/firebase';

export default function Home(props) {
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
    backgroundColor: '#6bf7e9',
    borderRadius: 5,
    borderWidth: 5,
    marginLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
 textodobotao: {
  textAlign: 'center',
  paddingVertical: 10,
  paddingHorizontal: 20,
  color: 'white',
  fontSize: 16,
},
  barra: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
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
        shadowColor: undefined,
        shadowOffset: undefined,
        shadowOpacity: undefined,
        shadowRadius: undefined,
        boxShadow: '0px 2px 4px rgba(0,0,0,0.25)',
      },
    }),
  },
  title: {
    fontWeight: 'bold',
  },
});

