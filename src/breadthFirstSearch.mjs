function breadthFirstSearch(board, source, destination) {
    class Node {
        constructor(value) {
            this.value = value
            this.next = null
        }
    }
    class Queue {

        constructor() {
            this.first = null
            this.last = null
            this.size = 0
        }


        isEmpty() {
            return !this.size
        }

        enqueue(item) {
            // Create node
            const newNode = new Node(item)
            /**
             * * If our list is empty than both our
             * * first item and last item is going to point the new node.
             */
            if (this.isEmpty()) {
                this.first = newNode
                this.last = newNode
            }
            else {
                this.last.next = newNode
                this.last = newNode
            }
            this.size++
            return this
        }
        /**
         *
         * @returns
         */

        dequeue() {

            //* if our queue is empty we return null
            if (this.isEmpty()) return null
            const itemToBeRemoved = this.first

            /**
             * * if both our first and last node are pointing the same item
             * * we dequeued our last node.
             */
            if (this.first === this.last) {
                this.last = null
            }
            this.first = this.first.next
            this.size--
            return itemToBeRemoved
        }

        /**
         * * Returns the next element to be dequeued.
         * @returns
         */
        peek() {
            return this.first
        }
    }

    const [x, y] = source
    const [dest_x, dest_y] = destination
    const visited = Array.from(new Array(20),_=> new Array(58).fill(0))
    let result = []
    let queue = new Queue()
    queue.enqueue([x, y])

    while (queue.size > 0) {
        let current = queue.dequeue()
        let [row, col] = current.value
        if (visited[row][col] === 0) {
            visited[row][col] = 1
            result.push([row, col])
        }
        let rowLimit = board.length-1;
        let columnLimit = board[0].length-1;
        for(let p = Math.max(0, row-1); p <= Math.min(row+1, rowLimit); p++) {
            for(let q = Math.max(0, col-1); q <= Math.min(col+1, columnLimit); q++) {
                if (p === dest_x && q === dest_y) { return result }
                if (p !== row || q !== col) {
                    if ((p !== row - 1 || q !== col - 1) && (p !== row + 1 || q !== col - 1) &&
                        (p !== row - 1 || q !== col + 1 ) && (p !== row + 1 || q !== col + 1 )) {
                        if (visited[p][q] === 0) {
                            queue.enqueue([p, q])
                            result.push([p, q])
                            visited[p][q] = 1
                        }
                    }
                }
            }
        }
    }
    return result
}

export default breadthFirstSearch;
