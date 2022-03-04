import React from 'react';
import PuzzleCell from "./PuzzleCell";

function PuzzleRow ( { puzzle }) {
    return (
        <div>
            <PuzzleCell row={"row0"} col={"col0"}> </PuzzleCell>
            <PuzzleCell row={"row0"} col={"col1"}> </PuzzleCell>
            <PuzzleCell row={"row0"} col={"col2"}> </PuzzleCell>
            <PuzzleCell row={"row0"} col={"col3"}> </PuzzleCell>
            <PuzzleCell row={"row0"} col={"col4"}> </PuzzleCell>
        </div>
    );
}

export default PuzzleRow;