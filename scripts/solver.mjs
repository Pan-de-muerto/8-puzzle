// 8-puzzle solver
// A* algorithm with num. of wrong placed tiles heuristic



// N = Size of matrix
// Fringe List = List of nodes which are yet to explored
// Explored List = List of nodes which are explored
// Value = Current state of the node
// Level = Current level of nodes
// Fval = Evaluation function value

import _ from "lodash"

class State {

    constructor(value, level, fval) {
        this.value = value;
        this.level = level;
        this.fval = fval;
    }

    generate_children() {
        const { x, y } = this.search_space(this.value, 0);
        let coor_list = [[x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]];
        let children = [];
        coor_list.forEach(element => {
            let child = this.valid_position(this.value, x, y, element[0], element[1]);
            if (!!child) {
                let child_node = new State(child, this.level + 1, 0);
                children.push(child_node);
            } // is not null, false, undefined, NaN ....
        });
        return children;
    }

    // Busca el espacio (0);
    search_space(board, space) {
        let x;
        let y;
        board.forEach((row, i) => {
            row.forEach((col, j) => {
                if (col == 0) {
                    x = i,
                        y = j
                }
            });
        });
        return { x, y }
    }

    // Buscar el movimiento valido
    valid_position(board, x1, y1, x2, y2) {
        if (x2 >= 0 && x2 < this.value.length && y2 >= 0 && y2 < this.value.length) {
            let temp_board = [];
            temp_board = _.cloneDeep(board)
            let temp = temp_board[x2][y2];
            temp_board[x2][y2] = temp_board[x1][y1];
            temp_board[x1][y1] = temp;
            return temp_board
        } else return null;
    }
}


class Eight_Puzzle {
    constructor(size) {
        this.size = size;
        this.fringe = [];
        this.explored = [];
    }

    h_misplaced_tiles(initial_state, goal_state) {
        let mis_tiles = 0
        initial_state.forEach((row, i) => {
            row.forEach((colum, j) => {
                if (initial_state[i][j] != goal_state[i][j] && initial_state[i][j] != 0)
                    mis_tiles++;
            });
        });
        return mis_tiles;
    }

    f_misplaced_tiles(initial_state, goal_state) {
        let g_x = initial_state.level;
        let h_x = this.h_misplaced_tiles(initial_state.value, goal_state);
        let f_x = g_x + h_x;

        // console.log("\ng(x): ", g_x) // REMOVE LATER
        // console.log("h(x): ", h_x) // REMOVE LATER
        // console.log("f(x): ", f_x) // REMOVE LATER

        return f_x

    }

    f1(initial_state, goal_state) {
        let g_x = initial_state.level;
        let h_x = this.h_misplaced_tiles(initial_state.value, goal_state);
        let f_x = g_x + h_x
        return { f: f_x, g: g_x, h: h_x }
    }


    stage_process(initial_state) {

        let path = [];
        //let initial_state = [[1, 2, 3], [4, 0, 6], [7, 5, 8]];
        let goal_state = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
        let counter = 0;
        initial_state = new State(initial_state, 0, 0);
        initial_state.fval = this.f_misplaced_tiles(initial_state, goal_state);

        this.fringe.push(initial_state);
        // console.log("\n\n");

        while (true) {
            let cur = this.fringe[0];
            if (counter == 0) counter = 1;
            else {
                // console.log("")
                // console.log("  |  ")
                // console.log("  |  ")
                // console.log("  |  ")
                // console.log(" \\/ \n")
            }

            // console.log(cur.value);
            path.push(cur.value);

            if (this.h_misplaced_tiles(cur.value, goal_state) == 0)
                break;

            // console.log("\nBelow are the values of all the child nodes that are added to the fringe but will expand the node with minimum value of f(x): ")

            cur.generate_children().forEach(element => {
                element.fval = this.f_misplaced_tiles(element, goal_state);
                this.fringe.push(element);
            });

            this.explored.push(cur);
            this.fringe.shift();

            this.fringe = _.sortBy(this.fringe, [(o) => { return o.fval }]);

            const { f, g, h } = obj.f1(cur, goal_state);
            // console.log("\ng(x): " + g)
            // console.log("h(x): " + h)
            // console.log("f(x):" + f)
            // console.log("Path Cost: " + f)
            // console.log("Generated Nodes: ", this.fringe.length)
            // console.log("Expanded Nodes: ", this.explored.length)
        }
        return path;
    }

}

//const initial_state = [[1, 2, 3], [4, 0, 6], [7, 5, 8]];
let obj = new Eight_Puzzle(3);

export const getPath = (initial_state) => {
    return obj.stage_process(initial_state);
}