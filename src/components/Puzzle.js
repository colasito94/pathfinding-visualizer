import React, {useEffect, useState} from 'react';
import PuzzleCell from "./PuzzleCell";
import PuzzleRow from "./PuzzleRow";

function Puzzle() {
    const [puzzle, setPuzzle] = useState([]);

    const loadPuzzle = () => {
        const myPuzzle = [{rows: [0, 1, 2, 3, 4], columns: [0, 1, 2, 3, 4]}]
        setPuzzle(myPuzzle);
    }

    useEffect(() => {
        loadPuzzle();  // Will only be called once in the lifecycle
    }, []);
    return (
        <div>
            <PuzzleRow> </PuzzleRow>
        </div>
    );
}

export default Puzzle;
