import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import { styles } from "./styles.js";
import { LinearGradient } from "expo-linear-gradient";

const Login = ({ onComplete }) => {
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function logIn() {
    axios.post("http://localhost:3000/login", {
      username: username,
      password: password,
    }).then((Response) => {
      console.log(Response.data);

      if (Response.data.status == 'success') {
        setWrongCredentials(false)
        console.log('Login SUCCESS')
        onComplete({ form: 'game', username: username })
      } else {
        setWrongCredentials(true)
        console.log('Login FAIL')
      }

    }).catch(error => console.log('ERRRR: ' + error));
  }


  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#42bac3', '#004e9a']} style={{ width: '100%', height:'100%' }}>

      <View style={{ flex: 1 }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }} style={styles.toolbarStyle}>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#f5d300', '#c39300']} style={styles.navButtonStyle}>
            <Text style={styles.urlCaption} onPress={() => onComplete({ form: 'signup' })}>Sign Up</Text>
          </LinearGradient>

        </Toolbar>
        <View style={styles.loginView}>
          <Image
            source={require('./img/logo.png')}
            style={styles.aboutLogo}
            resizeMode="contain"
          />
          <Text style={styles.gameCaption}>MathGame Login</Text>
          <TextInput id='un_input' style={styles.textInput} placeholder="Username" onChangeText={text => setUsername(text)} />
          <TextInput id='psw_input' style={styles.textInput} placeholder="Password" secureTextEntry onChangeText={text => setPassword(text)} />

          {wrongCredentials &&
            <Typography style={styles.errorFont}>Username and/or password incorrect</Typography>
          }

          <View style={{ height: 40 }}></View>

          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#f5d300', '#c39300']} style={styles.buttonStyle}>
            <Text style={styles.buttonCaption} onPress={() => logIn()}>Login</Text>
          </LinearGradient>
        </View>

      </View>
    </LinearGradient>

  )
}

export default Login;