import React, { useState,useEffect} from 'react'
import { Text, StyleSheet, View,TouchableOpacity,Alert } from 'react-native'
import { getFirestore,collection,addDoc,getDocs,doc,deleteDoc,getDoc,setDoc } from 'firebase/firestore'
import Auth from '../services/firebase'
export default function Denotas(props)  
  {
    const [nota,setNota]=useState({})
    const pegarnota=async(id)=>{  try{
      const docRef=doc(db,'tasks',id)
      const docSnap= await getDoc(docRef)
      setNota(docSnap.data())

      
    } catch (error) {
      console.log("error")
      
    }
    
    }
    useEffect(()=>{
     pegarnota(props.route.params.notaId)
    },[])
    const deletarnota= async(id)=>{
      await deleteDoc(doc(db,'tasks', id))
      Alert.alert('Deletada','Nota apagada com sucesso')
      props.navigation.navigate('Notas')
    }

    return (
      <View>
        <View style={styles.barre}>
          <Text style={styles.textodoo}>Titulo:{nota.title}</Text>
          <Text style={styles.textodoo}>Detalhes:{nota.description}</Text>
          <Text style={styles.textodoo}>Data:{nota.date}</Text>
          <Text style={styles.textodoo}>Hora:{nota.time}</Text>
          <TouchableOpacity style={styles.botaodeenviar} onPress={()=>deletarnota(props.route.params.notaId)}>
            <Text style={styles.textodobotaoenviar}>Deletar</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }


const styles = StyleSheet.create({
 Botao:{
        backgroundColor:'#760491',
        borderColor:'#DB5D11',
        borderWidth:5,
        marginLeft:0,
        marginRight:40,
        marginTop:0,
    },
    textodoo:{
        textAlign:"left",
        padding:50,
        color:'black',
        fontSize:16
    },
    botaodeenviar:{
    backgroundColor:'#760264',
    borderColor:'FC4D00',
    borderWidth:3,
    boderRadius:20,
    marginLeft:20,
    magirRight:20,
    marginTop:20

  },
  textodobotaoenviar:{
    textAlign:'center',
    padding:10,
    color:'white',
    fontSize:16
  },
  barre:{
    margin:20,
    backgroundColor:'white',
    borderRadius:20,
    width:'50%',
    padding:20,
    shadowColor:'#000',
    shadowOffser:{
      width:0,
      height:2
    },
    shadowOpacity:0.25,
    shadowRadius:4,
    elevation:5
  },
  titulo:{
    fontWeight:'bold'
  }



})