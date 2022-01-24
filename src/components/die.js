import React from 'react';

function die(props) {

const styles = {
  backgroundColor: props.isHeld ? "#59E391" : "white"
};

const pipsArray = [];

for(let i = 0; i < props.value; i++){
  pipsArray.push(<span className="pip" />)
}

  return <div className="dice" style={styles} onClick={props.holdDice}>
            {pipsArray}
         </div>
}

export default die;
