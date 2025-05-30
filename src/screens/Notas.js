import React, { useState,useEffect} from 'react'
import { Text, StyleSheet, View, ScrollView,TouchableOpacity} from 'react-native'
import { Button } from 'react-native-web'
import { getFirestore,collection,addDoc,getDocs,doc,deleteDoc,getDoc,setDoc } from 'firebase/firestore'
import { ListItem,Avatar } from '@rneui/themed'
import { ListItemChevron } from '@rneui/base/dist/ListItem/ListItem.Chevron'
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content'
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title'
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle'
import Auth from '../services/firebase'
export default function Notas(props)  
  {
  const[lista,setLista]=useState([])
  useEffect(()=>{
      const getLista=async()=>{
          try{
             const querySnapshot= await getDocs(collection(db,'tasks'))
             const docs=[]
             querySnapshot.forEach((doc)=>{
                 const{title,description,date,time}=doc.data()
                 docs.push({
                    id:doc.id,
                    title,
                    description,
                    date,
                    time
                  })
             })
             setLista(docs);
           }catch (error){
              console.log('error');
           }
      } 
      getLista()
        },[lista])

        





      



      
   return (
    <ScrollView>
      <View>
          <TouchableOpacity style={styles.Botao} onPress={()=>props.navigation.navigate('criartarefa')}>
              <Text style={styles.textodobotao}>Criar Uma Nota</Text>
           </TouchableOpacity>
      </View>



      <View style={styles.barra}>
          {lista.map((not)=>(
              <ListItem bottomDivider key={not.id} onPress={()=>{props.navigation.navigate('Denotas',{
                    notaId:not.id
                })}} >
                    <ListItemChevron>
                
                   </ListItemChevron>
                      <ListItemContent>
                       <ListItemTitle style={styles.titulo}>{not.titulo}</ListItemTitle>
                       <ListItemSubtitle>{not.data}</ListItemSubtitle>
                      </ListItemContent>   

              </ListItem>



          ))}



        </View>
    </ScrollView>
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
    textodobotao:{
        textAlign:"right",
        padding:50,
        color:'white',
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
  titulo:{
    fontWeight:'bold'
  }
})

