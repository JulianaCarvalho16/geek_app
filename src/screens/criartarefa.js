import React, { useState,useEffect} from 'react'
import { Text, StyleSheet, View , TextInput,TouchableOpacity, Alert} from 'react-native'
import { Platform } from 'react-native'
import { getFirestore,collection,addDoc,getDocs,doc,deleteDoc,getDoc,setDoc } from 'firebase/firestore'
import Auth from '../services/firebase'
export default function criartarefa(props)  
  {
    const inicialState={
      title:'',
      description:'',
      date:'',
      time:''
    }
    const [date,setdata]=useState(inicialState);
    const [mode,setMode]=useState("date");
    const [show,setShow]=useState(false);
    const [text,setText]=useState("empty");
    const [fecha,setfecha]=useState("");
    const [time,setHora]=useState(inicialState);
    const [estado,setEstado]=useState(inicialState);
const textomudado=(value,name)=>{
  setEstado({...estado,[name]:value})
}
const notesave=async()=>{
   
 try{
  console.log('chasamda');
  if(estado.title===''|| estado.description===''){
    Alert.alert('Campo requerido está vazio')
    console.log('chamddsada');
  }else{
    console.log('chamsdsada');
     const task={
    title:estado.title,
    description:estado.description,
    date:estado.date,
    time:estado.time
    
  }
  await addDoc(collection(db,'tasks'),{
    ...task
  })
  Alert.alert('Nota guardada com sucesso')
  props.navigation.navigate('Notas')
  console.log('chamda');

  }
 }catch(error){
  console.log('error ao guardar');
 } 
 
}

   return (
<View style={styles.containerpai}>
  <View style={styles.barra}>
  <View style={styles.container}>
  <TextInput placeholder='Coloque o Titulo' style={styles.textocolocado} value={estado.title} onChangeText={(value)=>textomudado(value,'title')}/>
  <TextInput placeholder='Sobre' multiline={true} numberOfLines={4} style={styles.textocolocado} value={estado.description} onChangeText={(value)=>textomudado(value,'description')}/>
  <View style={styles.colocardata}>
  <TextInput placeholder="09/05/2023" style={styles.Datatexto} value={estado.date} onChangeText={(value)=>textomudado(value,'date')}/>
<TouchableOpacity style={styles.indidata} >
  <Text style={styles.sub}>Data</Text>
  </TouchableOpacity>
  <View style={styles.colocardata}>
   <TextInput placeholder="Hora:6:30" style={styles.Datatexto} value={estado.time} onChangeText={(value)=>textomudado(value,'time')}/>
  <TouchableOpacity style={styles.indidata}>
  <Text style={styles.sub}>Hora</Text>
  </TouchableOpacity>
  </View>
   
  <View>
  <TouchableOpacity style={styles.botaodeenviar} onPress={notesave}>
  <Text style={styles.textodobotaoenviar}>salvarnota</Text>
  </TouchableOpacity>
  </View>
  </View>
  </View>
  </View>
  </View>
    )
  }


const styles = StyleSheet.create({

  containerpai:{
    flex:1,
    justifyContent:'center',
    align:'center'
  },
  barra:{
    margin:20,
    backgroundColor:'white',
    borderRadius:20,
    width:'90%',
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
  container:{
    padding:20
  },
  textocolocado:{
    borderColor:'slategray',
    borderWidth:1,
    padding:2,
    marginTop:10,
    borderRadius:8
  },
  Datatexto:{
    borderColor:'slategray',
    borderWidth:1,
    padding:2,
    marginTop:10,
    borderRadius:8
  },
  indidata:{
    backgroundColor:'#960284',
    borderRadius:5,
    width:'30%',
    padding:10,
    marginTop:10,
    marginLeft:10
  },
  sub:{
    color:'white',
    fontSize:18
  },
  colocardata:{
    width:'100%',
    flexWrap:'wrap',
    flexDirection:'row'

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
  }
})