function dijkstra() {
    const top = 0;
    const parent = i => ((i + 1) >>> 1) - 1;
    const left = i => (i << 1) + 1;
    const right = i => (i + 1) << 1;
    class PriorityQueue {
        constructor(comparator = (a, b) => a > b) {
            this._heap = [];
            this._comparator = comparator;
        }
        size() {
            return this._heap.length;
        }
        isEmpty() {
            return this.size() === 0;
        }
        peek() {
            return this._heap[top];
        }
        push(...values) {
            values.forEach(value => {
                this._heap.push(value);
                this._siftUp();
            });
            return this.size();
        }
        pop() {
            const poppedValue = this.peek();
            const bottom = this.size() - 1;
            if (bottom > top) {
                this._swap(top, bottom);
            }
            this._heap.pop();
            this._siftDown();
            return poppedValue;
        }
        replace(value) {
            const replacedValue = this.peek();
            this._heap[top] = value;
            this._siftDown();
            return replacedValue;
        }
        _greater(i, j) {
            return this._comparator(this._heap[i], this._heap[j]);
        }
        _swap(i, j) {
            [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
        }
        _siftUp() {
            let node = this.size() - 1;
            while (node > top && this._greater(node, parent(node))) {
                this._swap(node, parent(node));
                node = parent(node);
            }
        }
        _siftDown() {
            let node = top;
            while (
                (left(node) < this.size() && this._greater(left(node), node)) ||
                (right(node) < this.size() && this._greater(right(node), node))
                ) {
                let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
                this._swap(node, maxChild);
                node = maxChild;
            }
        }
    }

    // Initialize board
    const board = Array.from(new Array(20),_=> new Array(58).fill("-"))
    let source = [9, 16]
    let destination = [9, 41]

    // Setup auxiliary matrices
    const m = board.length
    const n = board[0].length
    const distances = Array.from(new Array(m),_=> new Array(n).fill(Infinity))
    const parents = Array.from(new Array(m),_=> new Array(n).fill([-1,-1]))
    const [source_x, source_y] = source
    distances[source_x][source_y] = 0

    // Initialize priority queue
    const pq = new PriorityQueue();
    pq.push([0, source_x, source_y])


    const allNeighbors = []
    while (pq.size() > 0) {
        const [current_distance, x, y] = pq.pop()
        if (current_distance > distances[x][y]) {
            continue;
        }
        const neighbors = [[x, y + 1], [x, y - 1], [x + 1, y], [x - 1, y]]
        allNeighbors.push.apply(allNeighbors, neighbors)
        for (const arr of neighbors) {
            const [row, column] = arr
            if (0 <= row && row < m && 0 <= column && column < n && board[row][column] === '-') {
                const distance = current_distance + 1
                if (distance < distances[row][column]) {
                    distances[row][column] = distance
                    parents[row][column] = [x, y]
                    pq.push([distance, row, column])
                }
            }
        }
    }

    // Calculate path taken by minimum-length path
    function calculatePath(p, d) {
        const [x, y] = d
        if (0 > x && 0 > y) {
            return
        }
        if (parents[x][y] === [-1,-1]) {
            let [a, b] = d
            minPath.push([a, b])
            return
        }
        calculatePath(parents, parents[x][y])
        let [a, b] = d
        minPath.push([a,b])
    }
    const minPath = []
    calculatePath(parents, destination)
    const new_path = minPath.filter(([row, col]) =>
        row !== 9 || col !== 16
    ).filter(([row, col]) =>
        row !== 9 || col !== 41 )
    return new_path
}

export default dijkstra;
