import React from "react";

/**
 *
 * @param value
 * @param onClick
 * @param inWinLine
 * @returns {JSX.Element}
 * @constructor
 */
function Square({value, onClick, inWinLine}) {
    return (
        <button className={'square ' + (inWinLine ? 'winLine' : '')}
                onClick={() => onClick()}>
            {value}
        </button>
    );
}

export default Square;