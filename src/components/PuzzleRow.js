import PuzzleCell from "./PuzzleCell";

function PuzzleRow ( { row, addBomb  } ) {
    const columns = Array.from(Array(57).keys())
    return (
        <div>
            {columns.map((col, index) => <PuzzleCell row={row} col={col} index={index} addBomb={addBomb} />)}
        </div>
    );
}

export default PuzzleRow;
