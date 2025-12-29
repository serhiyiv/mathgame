import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Toolbar } from '@mui/material';
import axios from 'axios';
import { styles } from "./styles.js";
import { LinearGradient } from "expo-linear-gradient";

const Score = ({ onComplete, params }) => {

  const [leaders, setLeaders] = useState([]);

  var resultCaption = 'Correct'
  var scoreColors = ['#3fae40', '#007785'];

  if (params.userResult == 'incorrect') {
    scoreColors = ['#c38842', '#9a0000'];
    resultCaption = 'Incorrect!'
  }


  function playNext() {
    params.form = 'game'
    onComplete(params);
  }


  function updateBoard() {
    axios.post("http://localhost:3000/update", {
      username: params.username,
      result: params.userResult,
    }).then((Response) => {
      setLeaders(Response.data.leaders)
    }).catch(error => console.log('ERRRR: ' + error));
  }

  useEffect(updateBoard, []);


  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={scoreColors} style={{ width: '100%' }}>
      <View style={{ flex: 1 }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }} style={styles.toolbarStyle}>
          <Text style={styles.gameCaption}>{params.username}</Text>
        </Toolbar>

        <View style={styles.scoreView}>
          <Text style={styles.gameCaption}>{resultCaption}</Text>
         
         <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#30b0fa', '#576dff']} style={styles.numberDisplay}>
              <Text style={styles.numberText}>{params.userAnswer}</Text>
            </LinearGradient>
          </View>

          <Text style={styles.gameCaption}>Leader Board:</Text>

          <View>
            {leaders.map((name, index) => (
              <LinearGradient key={index} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#cacaca', '#b4b4b4']} style={styles.leaderItem}>
                <Text key={index} style={styles.leaderItemText}>{index + 1}. {name}</Text>
              </LinearGradient>
            ))}
          </View>

          <View style={{ height: 40 }}></View>

          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#f5d300', '#c39300']} style={styles.buttonStyle}>
            <Text style={styles.buttonCaption} onPress={() => playNext()}>Back</Text>
          </LinearGradient>
        </View>

      </View>
    </LinearGradient>

  )
}

export default Score;