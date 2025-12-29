import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import logo from './img/logo.png'
import { Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import { styles } from "./styles.js";
import { LinearGradient } from "expo-linear-gradient";

const SignUp = ({ onComplete, params }) => {
  const [displayError, setDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');


  function backToLogin() {
    params.form = 'login'
    onComplete(params);
  }


  function signUp() {

    if ((username.trim() == "") || (password.trim() == "") || (confirm.trim() == "")) {
      setErrorMessage("All fields must be completed!")
      setDisplayError(true)
      return
    }

    if ((password.trim() != confirm.trim())) {
      setErrorMessage("Passwords do not match!")
      setDisplayError(true)
      return
    }

    if ((password.length < 5)) {
      setErrorMessage("Password must be atleast 5 characters!")
      setDisplayError(true)
      return
    }
    setDisplayError(false)

    axios.post("http://localhost:3000/signup", {
      username: username,
      password: password,
    }).then((Response) => {

      if (Response.data.status == 'success') {
        setDisplayError(false)
        console.log('Sign Up SUCCESS')
        onComplete({ form: 'game', username: username })
      } else {
        setDisplayError(true)
        console.log('Sign Up FAIL')
      }
    }).catch(error => console.log('ERRRR: ' + error));

  }



  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#42bac3', '#004e9a']} style={{ width: '100%' }}>
      <View style={{ flex: 1 }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }} style={styles.toolbarStyle}>

          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#f5d300', '#c39300']} style={styles.navButtonStyle}>
            <Text style={styles.urlCaption} onPress={() => backToLogin()}>Back to Login</Text>
          </LinearGradient>

        </Toolbar>
        <View style={styles.loginView}>

          <img src={logo} style={styles.aboutLogo} alt="logo" />
          <Text style={styles.gameCaption}>Sign Up</Text>
          <TextInput style={styles.textInput} placeholder="Username" onChangeText={text => setUsername(text)} />
          <TextInput style={styles.textInput} placeholder="Password" secureTextEntry onChangeText={text => setPassword(text)} />
          <TextInput style={styles.textInput} placeholder="Confirm " secureTextEntry onChangeText={text => setConfirm(text)} />

          {displayError &&
            <Typography style={styles.errorFont}>{errorMessage}</Typography>
          }

          <View style={{ height: 40 }}></View>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#f5d300', '#c39300']} style={styles.buttonStyle}>
            <Text style={styles.buttonCaption} onPress={() => signUp()}>Sign Up</Text>
          </LinearGradient>
        </View>

      </View>
    </LinearGradient>

  )
}


export default SignUp;