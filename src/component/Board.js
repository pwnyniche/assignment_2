import React from "react";
import Square from "./Square";

/**
 *
 * @param winLine
 * @param squares
 * @param onClick
 * @param boardSize
 * @constructor
 */
function Board ({winLine, squares, onClick, boardSize}) {
    function renderSquare(winLine, i, squares, onClick) {
        return <Square key={i} value={squares[i]}
                       onClick={() => onClick(i)}
                       inWinLine={winLine && winLine.includes(i)}
        />;

    }
    let board = [];
    for (let i = 0; i < boardSize; i++) {
        let row = [];
        for (let j = 0; j < boardSize; j++) {
            row.push(renderSquare(winLine,i * boardSize + j, squares, onClick));
        }
        board.push(<div key={i} className="board-row">{row}</div>);
    }

    return (
        <div>
            {board}
        </div>
    );

}

export default Board;