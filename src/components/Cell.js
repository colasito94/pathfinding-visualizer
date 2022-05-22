import {useRef} from "react";

function Cell({ row, col, addBomb, changeSource, isChanging, changeTarget }) {
    const inputRef = useRef()
    const changeSquare = () => {
        inputRef.current.style.background = "red"
    }

    return (
        <>
            <div ref={inputRef} id={`r${row}c${col}`} className="container" draggable={true}
                 onClick={ () => {
                     if (isChanging === "source") {
                         changeSource(row, col)
                     }
                     else if (isChanging === "dest") {
                         changeTarget(row, col)
                     } else {
                         changeSquare()
                         addBomb([row, col])
                        }
                     }
                 }
                 onDragOver={ () => {
                     changeSquare()
                     addBomb([row, col])
                     }
                 }
            >
            </div>
        </>
    );
}

export default Cell;
