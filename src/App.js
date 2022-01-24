import logo from './logo.svg';
import './App.css';
import Die from './components/die.js'
import React from 'react'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {

const [diceNumbers, setDiceNumbers] = React.useState(allNewDice())

const [tenzies, setTenzies] = React.useState(false)
const [highScore, setHighScore] = React.useState(100)
const [seconds, setSeconds] = React.useState(0);

const buttonStyles = {
  fontSize: tenzies ? "10px" : "15px"
}
//This is just the clock and timer. Run on start, Stop when won and restart when new game is called.



React.useEffect(() => {
  //Check for win con
  //Loop through array for dice held and dice have the same value
  let diceHeld = 0
  let diceSame = 0
  for(let i = 0; i < diceNumbers.length; i++){
    if(diceNumbers[i].isHeld === true){
      diceHeld++
    }
    if((diceNumbers[i].value === diceNumbers[(i+1)%10].value)){
      diceSame++
    }
  }
  if(diceHeld === 10 && diceSame === 10){
    setTenzies(true)
    if(highScore > seconds){
      setHighScore(seconds)
    }
    console.log("You won the game!")
  }else{
    diceHeld = 0;
    diceSame = 0;
  }
}, [diceNumbers])

React.useEffect(() => {
  const interval = setInterval(() => {
    if(!tenzies){
      setSeconds(seconds => (seconds + 1))
  }
  }, 1000);
  return () => clearInterval(interval)
}, [])

function allNewDice(){
  const newArray = []
  for(let i = 0; i < 10; i++){
    newArray.push({value: Math.ceil(Math.random() * 6),
                   isHeld: false,
                   id: nanoid()
    })
  }
  return newArray
}

function reRoll(){
  setDiceNumbers(oldDice => 
    oldDice.map(dice => {
      if(!dice.isHeld){
        return {...dice,
          value: Math.ceil(Math.random() * 6)}
      }else{
        return dice
      }
    })
  )
}

function holdDice(id){
  console.log(id)
  setDiceNumbers(oldDice => 
      oldDice.map(dice => {
        if(dice.id === id){
          return {...dice,
          isHeld: !dice.isHeld}
        }else{
          return dice
        }
      })
  )
}

function unHoldAllDice(){
  setDiceNumbers(oldDice => 
    oldDice.map(dice => {
      
        return {...dice,
        isHeld: false}
        
    })
)
}

function resetGame(){
  setTenzies(false)
  setSeconds(0)
  unHoldAllDice()
  reRoll()

}


  return (
    <div className="App">
      <main>
          {tenzies && <Confetti />}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className='dicebox'>
              {diceNumbers.map((dice, index) => {
                return <Die value={dice.value} key={dice.id} isHeld={dice.isHeld}  holdDice={() => holdDice(dice.id)}/>
              })}
          </div>
          <button className="button" onClick={tenzies ? resetGame : reRoll} style={buttonStyles}><h2>{tenzies ? "New Game" : "Roll"}</h2></button>
          <div className='timer'>
            <span>Seconds {!tenzies ? seconds : "0"}
            </span><span className='highScore'>  |  Fastest : {highScore} seconds</span>
          </div>
      </main>
    </div>
  );
}

export default App;
