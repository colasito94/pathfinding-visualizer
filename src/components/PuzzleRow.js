import PuzzleCell from "./PuzzleCell";

function PuzzleRow ( { row } ) {
    const columns = Array.from(Array(57).keys())
    return (
        <div>
            {columns.map((col, index) => <PuzzleCell row={row} col={col} index={index}/>)}
        </div>
    );
}

export default PuzzleRow;
