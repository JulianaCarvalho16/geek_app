import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';

export default function Denotas(props) {
  const [nota, setNota] = useState(null)
  const db = getFirestore()
  const auth = getAuth()
  const user = auth.currentUser
  const navigation = useNavigation();

  const pegarnota = async (id) => {
    try {
      const docRef = doc(db, 'tasks', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setNota(docSnap.data())
      } else {
        console.log('Documento não encontrado.')
      }
    } catch (error) {
      console.log('Erro ao buscar nota:', error)
    }
  }

  useEffect(() => {
    pegarnota(props.route.params.taskId)
  }, [])

  const deletarnota = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id))
      Alert.alert('Deletada', 'Nota apagada com sucesso')
      props.navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível apagar a nota')
    }
  }

  if (!nota) {
    return (
      <View style={styles.barre}>
        <Text style={styles.textodoo}>Carregando nota...</Text>
      </View>
    )
  }

  return (
    <View>
      <View style={styles.barre}>
        <Text style={styles.textodoo}>Título: {nota.title}</Text>
        <Text style={styles.textodoo}>Detalhes: {nota.description}</Text>
        <Text style={styles.textodoo}>Data: {nota.date}</Text>
        <Text style={styles.textodoo}>Hora: {nota.time}</Text>
        <TouchableOpacity style={styles.botaodeenviar} onPress={() => deletarnota(props.route.params.taskId)}>
          <Text style={styles.textodobotaoenviar}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textodoo: {
    textAlign: 'left',
    padding: 10,
    color: 'black',
    fontSize: 16
  },
  botaodeenviar: {
    backgroundColor: '#760264',
    borderRadius: 5,
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: '#6bf7e9',
    borderRadius: 2,
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  textodobotaoenviar: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16
  },
  barre: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});
