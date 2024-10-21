import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./assets/combinations";
import GameOver from "./Components/GameOver";

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function changePlayer(currentGameTurn){
  let currentPlayer ='X';
  if(currentGameTurn.length > 0 && currentGameTurn[0].player === 'X'){
    currentPlayer='O';
  }
  return currentPlayer;
}

function App() {
  const [gameturns, setGameTurns] =useState([]);
  const [players, setPlayers] = useState(
    {
      X: 'firstPlayer',
      O: 'secondPlayer'
    }
  );
  //const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = changePlayer(gameturns);

  let gameboard = [...initialGameboard].map(entry=>[...entry]);
  for( const turn of gameturns){
      const {square, player} = turn;
      const {row, col} = square;
      gameboard[row][col] = player;
  }
  let winner = null;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquare = gameboard[combination[0].row][combination[0].column];
    const secondSquare = gameboard[combination[1].row][combination[1].column];
    const thirdSquare = gameboard[combination[2].row][combination[2].column];
    
    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare){
        winner = players[firstSquare];   
    }
  }
  const draw = gameturns.length===9 && !winner;

  function handlePlayerName(symbol, newName){
    setPlayers(
      prevPlayers => {
        return {
          ...prevPlayers,
          [symbol]: newName 
        };
      }
    );
  }

  function handleSelect(rowindex, colindex){
    //setActivePlayer((curActivePlayer)=> curActivePlayer==='X' ? 'O':'X');
   
    setGameTurns(
      prevTurns => {
        const currentPlayer = changePlayer(prevTurns);
        const updatedTurns = [{
          square:{row: rowindex, col: colindex}, player: currentPlayer
        }, ...prevTurns,];

      return updatedTurns;
      }
    );
  }

  function handleRestart(){
    setGameTurns([]);
  }

  return (
  <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player name={players.X} symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerName}/>
        <Player name={players.O} symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerName}/>
      </ol>
      {(winner||draw) && <GameOver winner={winner} onRestart = {handleRestart}/>}
      <GameBoard onSelectSquare={handleSelect} board ={gameboard}/>
    </div>
    <Log turns={gameturns}/>
  </main>);
}

export default App
