import React, {useState} from "react";
import Board from "./Board";

export const winSize = 5;

export function Game () {
    const [boardSize, setBoardSize] = useState(20);
    const [history, setHistory] = useState([
        {
            squares: Array(boardSize *boardSize).fill(null),
            moveIndex: null,
        }
        ]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [sortAscending, setSortAscending] = useState(true);



    function calculateWinner(squares) {
        const lines = [];
        for (let i = 0; i < boardSize * boardSize; i++) {
            let winConRow = [];
            let winConColumn = [];
            let winConDiagon1 = [];
            let winConDiagon2 = [];
            if (i + winSize - 1 <  boardSize * (Math.floor(i / boardSize) + 1)) {
                for (let j = 0; j < winSize; j++) {
                    winConRow.push(i + j);
                }
                lines.push(winConRow);
            }
            if (i + boardSize * (winSize - 1) < boardSize * boardSize) {
                for (let j = 0; j < winSize; j++) {
                    winConColumn.push(i + boardSize * j);
                }
                lines.push(winConColumn);
            }
            if ((boardSize - (i % boardSize)) >= winSize && (boardSize - Math.floor(i / boardSize)) >= winSize) {
                for (let j = 0; j < winSize; j++) {
                    winConDiagon1.push(i + boardSize * j + j);
                }
                lines.push(winConDiagon1);
            }
            if ((i % boardSize + 1) >= winSize && (boardSize - Math.floor(i / boardSize)) >= winSize) {
                for (let j = 0; j < winSize; j++) {
                    winConDiagon2.push(i + boardSize * j - j);
                }
                lines.push(winConDiagon2);
            }
        }

        for (let i = 0; i < lines.length; i++) {
            let check = squares[lines[i][0]];
            for (let j = 1; j < lines[i].length; j++) {
                if (check !== squares[lines[i][j]]) {
                    check = null;
                    break;
                }
            }
            if (check)
                return {
                    winner: check,
                    winLine: lines[i],
                };
        }
        return {
            winner: null,
        };
    }


    function handleClick(i) {
        const currentHistory = history.slice(0, stepNumber + 1);
        const current = currentHistory[currentHistory.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(currentHistory.concat([{
            squares: squares,
            moveIndex: i,
        }]));
        setStepNumber(currentHistory.length);
        setXIsNext(!xIsNext);
    }

    function jumpTo(step) {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

    function handleSortClick() {
        setSortAscending(!sortAscending);
        changeBoardSize(10);
    }

    function changeBoardSize(newSize) {
        if (newSize <= 20 && newSize >=5) {
            setBoardSize(newSize);
            setHistory([
                {
                    squares: Array(boardSize * boardSize).fill(null),
                    moveIndex: null,
                }
            ]);
            setStepNumber(0);
            setXIsNext(true);
        }
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares).winner;
    const winLine = calculateWinner(current.squares).winLine;
    const moves = history.map((step, move) => {
        const rowDesc = 1 + step.moveIndex % boardSize;
        const colDesc = 1 + Math.floor(step.moveIndex / boardSize);
        const playerDesc = (move % 2 === 1) ? 'X' : 'O';
        const desc = move ?
            'Move ' + move + ': ' + playerDesc + ' plays (' + rowDesc + ',' + colDesc + ')' :
            'Go to game start';
        return (
            <li key={move}>
                <button className={move === stepNumber ? 'selected-move' : ''}
                        onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    if (!sortAscending) {
        moves.reverse();
    }

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else if (stepNumber === boardSize * boardSize) {
        status = 'Draw';
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
            <div className="game-info">
                <p>MSSV: 18120593  </p>
                <p>Họ và Tên: Trần Quang Tiến</p>
                <br/>
                <br/>
                <p> {status}</p>
                <br/>
                <br/>
                <br/>
                <br/>
                <p > Change Board Size (5-20):
                    <input type="number" value={boardSize} className="game-setting"
                           onChange={(e) => changeBoardSize(e.target.value) }/> </p>

            </div>


            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                    winLine={winLine}
                    boardSize={boardSize}
                />
            </div>
            <div className="game-info">
                <div>
                    <button onClick={() => handleSortClick()}>
                        {sortAscending ? 'Sort Descending' : 'Sort Ascending'}
                    </button>
                </div>

                <ol>{moves}</ol>
            </div>
        </div>
    );
}

