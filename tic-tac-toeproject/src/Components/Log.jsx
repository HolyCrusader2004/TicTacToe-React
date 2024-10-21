export default function Log({turns}){
    return (
        <ol id="log">
            {turns.map(turndata => (<li key={`${turndata.square.row}${turndata.square.col}`}>
                {turndata.player} selected {turndata.square.row},{turndata.square.col}
            </li>
        ))}
        </ol>
    );
}