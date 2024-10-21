


export default function GameBoard({onSelectSquare, board }){
    // const [gameboard, setGameboard] = useState(initialGameboard);

    // function handleSelectSquare(rowindex, colIndex){
    //     setGameboard((preGameboard) => {
    //         const updatedBoard = [...preGameboard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowindex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //      });
    //      onSelectSquare();
    // }

    return (
    <ol id="game-board">
        {board.map((row, rowIndex)=> (<li key={rowIndex}>
            <ol>
                {row.map((player,columnIndex)=> (<li key={columnIndex}>
                    <button onClick={()=>{onSelectSquare(rowIndex, columnIndex)}} disabled={player!==null}>
                        {player}</button></li>))}
            </ol>
        </li>))}
    </ol>);
}