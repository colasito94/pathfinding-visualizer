import dijkstra from "./dijkstra.mjs";

const getNeighborSquares = (x, y) => {
    let queue = [];

    const isNotVisited = (a, b) => {
        a = JSON.stringify(a);
        b = JSON.stringify(b);
        let c = a.indexOf(b);
        return c === -1;
    }

    if (isNotVisited(queue, [x, y])) {
        queue.push([x, y])
    }

    const neighbors = [[x - 1, y], [x, y + 1], [x + 1, y], [x, y - 1]]
    for (const arr of neighbors) {
        const [row, column] = arr
        if (0 <= row && 0 <= column) {
            if (isNotVisited(queue, [row, column])) {
                queue.push([row, column])
            }
        }
    }

    // const new_res = queue.filter(([row, col]) => row !== 4 || col !== 2 && (row !== 4 || col !== 17))
    return queue

}

export default getNeighborSquares;
