import PuzzleRow from "./PuzzleRow";
import breadthFirstSearch from "../breadthFirstSearch.mjs";
import getNeighborSquares from "../getNeighborSquares.mjs";
import dijkstra from "../dijkstra.mjs";


function Puzzle() {

    // Initialize grid, source, and target
    const grid = Array.from(new Array(20),_=> new Array(58).fill("-"))
    const source = [9, 16]
    const target = [9, 41]
    const [src_x, src_y] = source
    const [dest_x, dest_y] = target


    const drawPath = () => {
        const minPath = dijkstra(grid, source, target)
        for (let i = 0; i < minPath.length; i++) {
            setTimeout(() => {
                const [row, col] = minPath[i]
                const squareID = `r${row}c${col}`
                document.getElementById(squareID).style.background = "rgb(75,0,130)"
            }, 25 * i);
        }
    }

    const visualizeDijkstra = (x, y) => {
        const minPath = getNeighborSquares(x, y)
        for (let i = 0; i < minPath.length; i++) {
          setTimeout(() => {
            const [row, col] = minPath[i]
              if (row !== src_x || col !== src_y && (row !== dest_x || col !== dest_y)) {
            const squareID = `r${row}c${col}`
            document.getElementById(squareID).style.background = "rgb(252,255,164)"
                  }
          }, 10 * i);
        }
      }
    const rows = Array.from(Array(19).keys())
    return (
        <div>
            {rows.map((row, index) => <PuzzleRow row={row} index={index}/>)}

            <button
                onClick={ () => {
                    let visualize = () => {
                        const neighbors = breadthFirstSearch(grid, source, target)
                        for (let i = 0; i < neighbors.length; i++) {
                            setTimeout(() => {
                                const [row, col] = neighbors[i]
                                visualizeDijkstra(row, col)
                            }, 5 * i)
                        }
                        return "Success"
                    }

                    const myPromise = new Promise(function(resolve, reject) {
                        resolve(visualize())
                    });
                    myPromise.then(setTimeout((drawPath), 3500))
                }}>
                Change Color
            </button>
        </div>
    ); 
}

export default Puzzle;
