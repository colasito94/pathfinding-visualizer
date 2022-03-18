import PuzzleRow from "./PuzzleRow";
import breadthFirstSearch from "../breadthFirstSearch.mjs";
import dijkstra from "../dijkstra.mjs";
import {useEffect, useState} from "react";


function Puzzle() {
    const puzzle = Array.from(new Array(20),_=> new Array(58).fill("-"))
    const [grid, setGrid] = useState(puzzle)
    const [source, setSource] = useState([9, 16])
    const [target, setTarget] = useState([9, 41])
    const [src_x, src_y] = source
    const [dest_x, dest_y] = target

    const addBomb = ([row, col]) => {
        puzzle[row][col] = '#'
        setGrid(puzzle)
    }

    const loadNinja = () => {
        const squareID = `r${src_x}c${src_y}`
        const image = document.createElement('img')
        image.src = '/ninjaRunRight.png'
        image.style.width = "25px";
        image.style.height = "25px";
        document.getElementById(squareID).appendChild(image)
    }

    useEffect(() => {
        loadNinja();
    }, [source]);


    const loadTarget = () => {
        const squareID = `r${dest_x}c${dest_y}`
        const image = document.createElement('img')
        image.src = '/target.png'
        image.style.width = "25px";
        image.style.height = "25px";
        document.getElementById(squareID).appendChild(image)
    }

    useEffect(() => {
        loadTarget();
    }, [target]);

    const drawPath = () => {
        const minPath = dijkstra(grid, source, target)
        for (let i = 0; i < minPath.length; i++) {
            setTimeout(() => {
                const [row, col] = minPath[i]
                const squareID = `r${row}c${col}`
                document.getElementById(squareID).style.background = "purple"
            }, 25 * i);
        }
    }

    const changeSquareColor = (x, y) => {
        const squareID = `r${x}c${y}`
        document.getElementById(squareID).style.background = "rgb(252,255,164)"
    }

    const changeSource = () => {
        const previousID =`r${9}c${16}`
        const squareID = `r${5}c${16}`
        document.getElementById(squareID).style.background = "darkslategray"
        document.getElementById(previousID).style.background = "white"
    }

    const changeTarget = () => {
        const previousID =`r${9}c${41}`
        const squareID = `r${5}c${41}`
        document.getElementById(squareID).style.background = "red"
        document.getElementById(previousID).style.background = "white"
    }


    const rows = Array.from(Array(19).keys())
    return (
        <div>
            <button onClick={changeSource}>
                Change Source Node
            </button>

            <button onClick={changeTarget}>
                Change Target Node
            </button>

            {/*<img src={"/ninjaRunRight.png"} alt={"ninjaRunRight"} width={"25px"} height={"25px"}/>*/}

            {rows.map((row, index) => <PuzzleRow row={row} index={index} addBomb={addBomb} />)}

            <button
                onClick={ () => {
                    let visualize = () => {
                        const neighbors = breadthFirstSearch(grid, source, target)
                        for (let i = 0; i < neighbors.length; i++) {
                            setTimeout(() => {
                                const [row, col] = neighbors[i]
                                changeSquareColor(row, col)
                            }, 10 * i)
                        }
                        return "Success"
                    }

                    const myPromise = new Promise(function(resolve, reject) {
                        resolve(visualize())
                    });
                    myPromise.then(setTimeout((drawPath), 7000))
                }}>
                Activate Lasers
            </button>
        </div>
    ); 
}

export default Puzzle;
