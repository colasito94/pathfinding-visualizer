import PuzzleRow from "./PuzzleRow";
import breadthFirstSearch from "../breadthFirstSearch.mjs";
import dijkstra from "../dijkstra.mjs";
import {useEffect, useState} from "react";


function Puzzle() {
    const puzzle = Array.from(new Array(19),_=> new Array(57).fill("-"))
    const [grid, setGrid] = useState(puzzle)
    const [source, setSource] = useState([9, 16])
    const [prevSource, setPrevSource] = useState([9, 16])
    const [target, setTarget] = useState([9, 41])
    const [prevTarget, setPrevTarget] = useState([9, 41])
    const [src_x, src_y] = source
    const [dest_x, dest_y] = target
    const [isChanging, setIsChanging] = useState("")

    const addBomb = ([row, col]) => {
        grid[row][col] = '#'
        setGrid(grid)
    }

    const resetBoard = () => {
        window.location.reload(true)
    }

    const loadSource = () => {
        const squareID = `r${src_x}c${src_y}`
        const image = document.createElement('img')
        image.src = '/arrow.png'
        image.style.width = "25px";
        image.style.height = "25px";
        document.getElementById(squareID).appendChild(image)
    }

    useEffect(() => {
        loadSource();
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

    const changeSource = (row, col) => {
        const previousID =`r${prevSource[0]}c${prevSource[1]}`
        const previousSquare = document.getElementById(previousID)
        const previousImage = previousSquare.firstElementChild
        previousImage.parentNode.removeChild(previousImage)
        setSource([row, col])
        setPrevSource([row, col])
        setIsChanging("")
    }

    const changeTarget = (row, col) => {
        const previousID =`r${prevTarget[0]}c${prevTarget[1]}`
        const previousSquare = document.getElementById(previousID)
        const previousImage = previousSquare.firstElementChild
        previousImage.parentNode.removeChild(previousImage)
        setTarget([row, col])
        setPrevTarget([row, col])
        setIsChanging("")
    }

    const makePath = () => {
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

    const visualize = () => {
        const traversedSquares = breadthFirstSearch(grid, source, target)
        for (let i = 0; i < traversedSquares.length; i++) {
            setTimeout(() => {
                const [row, col] = traversedSquares[i]
                changeSquareColor(row, col)
            }, 10 * i)
        }
    }

    const rows = Array.from(Array(19).keys())
    return (
        <div>
            <button onClick={ () =>
                setIsChanging("source")
            }>
                Change Source Node
            </button>

            <button onClick={ () => {
                setIsChanging("dest")
            }}>
                Change Target Node
            </button>

            <button onClick={resetBoard}>
                Clear Board
            </button>

            {rows.map((row, index) => <PuzzleRow row={row} index={index} addBomb={addBomb}
                                                 changeSource={changeSource} changeTarget={changeTarget}
                                                 isChanging={isChanging}
            />)}

            <button
                onClick={ () => {
                    visualize()
                    setTimeout(() => makePath(), 8000)
                }}>
                Activate Lasers
            </button>
        </div>
    ); 
}

export default Puzzle;
