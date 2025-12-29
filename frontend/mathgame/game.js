import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Toolbar, Typography } from '@mui/material';
import { styles } from "./styles.js";
import { LinearGradient } from "expo-linear-gradient";

const Game = ({ onComplete, params }) => {

  const [answer, setAnswer] = useState('');
  const [numbers, setNumbers] = useState([getRandomNumber(100), getRandomNumber(100)]);
  const [displayError, setDisplayError] = useState(false);

  function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  function sendAnswer() {
    if (answer.trim() == "") {
      setDisplayError(true)
      return
    }

    var gameResult = { form: 'score', userResult: 'incorrect', userAnswer: answer, username: params.username }
    if (parseInt(answer) == (numbers[0] + numbers[1]))
      gameResult = { form: 'score', userResult: 'correct', userAnswer: answer, username: params.username }

    onComplete(gameResult);
  }


  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#42bac3', '#004e9a']} style={{ width: '100%' }}>
      <View style={{ flex: 1 }}>
        
        <Toolbar sx={{ justifyContent: 'flex-end' }} style={styles.toolbarStyle}>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#f5d300', '#c39300']} style={styles.navButtonStyle}>
            <Text style={styles.urlCaption} onPress={() => onComplete({ form: 'login', username: '' })}>Sign Out</Text>
          </LinearGradient>
        </Toolbar>

        <View style={styles.loginView}>
          <Text style={styles.gameCaption}>Player: {params.username}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#30b0fa', '#576dff']} style={styles.numberDisplay}>
              <Text style={styles.numberText}>{numbers[0]}</Text>
            </LinearGradient>

            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#30b0fa', '#576dff']} style={styles.numberDisplay}>
              <Text style={styles.numberText}>{numbers[1]}</Text>
            </LinearGradient>
          </View>


          <Text style={styles.gameCaption}>Guess the number:</Text>
          <TextInput style={styles.textInput} placeholder="Your Answer?" onChangeText={text => setAnswer(text)} />


          {displayError &&
            <Typography style={styles.errorFont}>Please enter your answer!</Typography>
          }

          <View style={{ height: 40 }}></View>

          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#f5d300', '#c39300']} style={styles.buttonStyle}>
            <Text style={styles.buttonCaption} onPress={() => sendAnswer()}>Answer</Text>
          </LinearGradient>

        </View>

      </View>
    </LinearGradient>
  )
}

export default Game;