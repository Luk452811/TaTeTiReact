import React, { useState } from 'react';
import Board from './Board';
import './Game.css';
import resetButton from '../images/resetButton1.png';


const Game = () => {
    const [boardState, setBoardState] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    //Para rellenar la posicion si el juego todavia no finalizo o si no esta ocupado el square
    const handleClick = (index) => {
        if (calculateWinner(boardState) || boardState[index]) {
            return;
        }

        const newBoardState = [...boardState];
        newBoardState[index] = xIsNext ? 'X' : 'O';
        setBoardState(newBoardState);
        setXIsNext(!xIsNext);
    };

    //Resetea el estado del tablero y empieza el juego de vuelta, usada al clickear el boton reset
    const resetBoardState = () => {
        setBoardState(Array(9).fill(null));
        setXIsNext(true);
    };
    //Maneja los turnos y revisa si hay ganador
    const renderStatus = () => {
        const winner = calculateWinner(boardState);
        const currentPlayer = xIsNext ? 'X' : 'O';

        if (winner) {
            return `Winner: ${winner}`;
        } else if (boardState.every((square) => square !== null)) {
            return 'It\'s a draw!';
        } else {
            return `Next player: ${currentPlayer}`;
        }
    };

    //Tambien se agrega una cancion de fondo
    return (
        <div className="game">
            <div className="status">{renderStatus()}</div>
            <div className="board">
                <Board squares={boardState} onClick={handleClick} />
            </div>
            <button className="reset-button" onClick={resetBoardState} style={{ backgroundImage: `url(${resetButton})` }}>

            </button>
            <audio autoPlay>
                <source src={require('../audio/Songs.mp3')} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>

    );


};

// Función para calcular el ganador del juego
const calculateWinner = (squares) => {
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
        //EJ: winningLines[0] es [0, 1, 2], entonces a será igual a 0, b será igual a 1 y c será igual a 2
        const [a, b, c] = winningLines[i];
        //EJ: si squares[0](supongamos igual a X) es distinto de null, igual a squares[1](igual a X)
        // e igual a squares[2](igual a X) devuelve a X como ganador
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
};

export default Game;
