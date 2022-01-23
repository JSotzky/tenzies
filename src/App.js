import logo from './logo.svg';
import './App.css';
import Die from './components/die.js'
import React from 'react'
import {nanoid} from "nanoid"

function App() {

const [diceNumbers, setDiceNumbers] = React.useState(allNewDice())

function allNewDice(){
  const newArray = []
  for(let i = 0; i < 10; i++){
    newArray.push({value: Math.ceil(Math.random() * 6),
                   isHeld: false,
                   id: nanoid()
    })
  }
  console.log(newArray)
  return newArray
}

function reRoll(){
  setDiceNumbers(allNewDice())
}

  return (
    <div className="App">
      <main>
          <div className='dicebox'>
              {diceNumbers.map((dice, index) => {
                return <Die value={dice.value} key={dice.id}/>
              })}
          </div>
          <button className="button" onClick={reRoll}><h2>Roll</h2></button>
      </main>
    </div>
  );
}

export default App;
