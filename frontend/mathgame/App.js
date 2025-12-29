/* 
"StAuth10244: I Serhii Ivanchuk, 000818168 certify that this material is my original work. 
 No other person's work has been used without due acknowledgement. 
 I have not made my work available to anyone else."
*/


import React, {useState} from 'react';
import Login from './login.js';
import SignUp from './signup.js';
import Game from './game.js';
import Score from './score.js';

export default function App() {
  const [formName, setFormName] = useState('login');
  const [displayParams, setDisplayParama] = useState({});

  const displayPage = (params) => {
    setDisplayParama(params);
    setFormName(params.form);
  };

  var form = <Login  onComplete={displayPage} />

  if (formName == "login")
    form = <Login  onComplete={displayPage} />
  if (formName == "game")
    form = <Game  onComplete={displayPage}  params = {displayParams} />
  if (formName == "score")
    form = <Score  onComplete={displayPage} params = {displayParams} />
  if (formName == "signup")
    form = <SignUp onComplete={displayPage} params = {displayParams}/>

  return (form);
}


