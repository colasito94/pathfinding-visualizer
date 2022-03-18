import {useRef} from "react";

function PuzzleCell( { row, col, addBomb }) {
    const inputRef = useRef()
    const changeSquare = () => {
        inputRef.current.style.background = "red"
    }
    return (
        <>
            <div ref={inputRef} id={`r${row}c${col}`} className="cell" onClick={ () => {
                changeSquare()
                addBomb([row, col])
            }
            }>
            </div>
        </>
    );
}

export default PuzzleCell;
