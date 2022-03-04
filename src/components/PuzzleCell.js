import React from 'react';

function PuzzleCell( { row, col }) {
    return (
            <div
                id={`${row}${col}` }
                className="square"
            >
            </div>
    );
}

export default PuzzleCell;