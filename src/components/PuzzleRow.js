import Cell from "./Cell";

function PuzzleRow ( { row, addBomb, changeSource, isChanging, changeTarget  } ) {
    const columns = Array.from(Array(57).keys())
    return (
        <div>
            {columns.map((col, index) => <Cell row={row} col={col} index={index} addBomb={addBomb}
            changeSource={changeSource} isChanging={isChanging} changeTarget={changeTarget}
            />)}
        </div>
    );
}

export default PuzzleRow;
