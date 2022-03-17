function PuzzleCell( { row, col }) {
    return (
            <div id={`r${row}c${col}`} className="cell">
            </div>
    );
}

export default PuzzleCell;
