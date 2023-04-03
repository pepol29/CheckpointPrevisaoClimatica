import * as React from 'react';
import { Text, View, StyleSheet, TextInput, ImageBackground, Image} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import imagem from '/clima.jpg';

export default function App() {

  const [clima, setClima] = useState([]);
  const [lugar, setLugar] = useState('');

  const endpoint = 'https://api.openweathermap.org/data/2.5/weather?appid=7b34d63d69f6c9b1f31341629efd5e93&units=metric';

  
  const getClimas = async ()=>{
  
    await axios.get(endpoint, {params: {q:lugar} }).then(response=>{
        const climas = {
          nome: response.data.name,
          tempo: response.data.weather['0'].description,
          temperatura: response.data.main.temp,
          icone: response.data.weather['0'].icon
        }
        setClima(climas);
    
    }).catch((error)=>{console.log(error)})
}

  
  useEffect(()=>{
    getClimas();
    
  },[lugar])

console.log(clima)

  
  return (
    <ImageBackground source={imagem} style={styles.Imagemfundo}>
      <View>
      <Text style={styles.p}>Previsão do tempo</Text>
        <Text style={styles.paragraph}>
          {clima.nome}
          </Text>
          <Text style={styles.paragraph}>
          {clima.tempo}
          </Text>
          <Text style={styles.paragraph}>
          {clima.temperatura}°C
          </Text>
         
          <TextInput placeholder='Digite uma cidade' value={lugar} 
          onChangeText={(texto)=>setLugar(texto)} style={styles.textinput}/>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'white'
  },
  p: {
    margin: 24,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black'
  },

  textinput: {
    alignItems:'center',
    padding: 5,
    borderRadius: 5,
    width: 200,
    margin: 50,
    textAlign: 'center',
     fontSize: 15,
    fontWeight: 'bold'
    
  },

  Imagemfundo:{
    height:600,
    width:330,
    flex:1
  }


});
