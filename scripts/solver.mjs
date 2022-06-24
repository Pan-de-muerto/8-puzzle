// 8-puzzle solver
// A* algorithm with num. of wrong placed tiles heuristic



// N = Size of matrix
// Fringe List = List of nodes which are yet to explored
// Explored List = List of nodes which are explored
// Value = Current state of the node
// Level = Current level of nodes
// Fval = Evaluation function value

import _, { curry } from "lodash"

class State {

    constructor(value, level, fval, prev) {
        this.value = value;
        this.level = level;
        this.fval = fval;
        this.prev = prev
    }

    generate_children() {
        const { x, y } = this.search_space(this.value, 0);
        let coor_list = [[x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]];
        let children = [];
        coor_list.forEach(element => {
            let child = this.valid_position(this.value, x, y, element[0], element[1]);
            if (!!child) {
                let child_node = new State(child, this.level + 1, 0 ,this);
                children.push(child_node);
            }
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
        if (x2 >= 0 && x2 < board.length && y2 >= 0 && y2 < board.length) {
            let temp_board = [];
            temp_board = _.cloneDeep(board)
            let temp = _.cloneDeep(temp_board)[x2][y2];
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
        this.path = [];
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
        return f_x
    }

    f1(initial_state, goal_state) {
        let g_x = initial_state.level;
        let h_x = this.h_misplaced_tiles(initial_state.value, goal_state);
        let f_x = g_x + h_x
        return { f: f_x, g: g_x, h: h_x }
    }

    traverse(node){
        path.push(node.value);
        if(!!node.prev){
          this.traverse(node.prev)
        }
    };


    stage_process(initial_state) {
        let pathTree;
        let path = [];
        let goal_state = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
        let counter = 0;
        initial_state = new State(initial_state, 0, 0, null);
        initial_state.fval = this.f_misplaced_tiles(initial_state, goal_state);

        this.fringe.push(initial_state);

        while (true) {
            let cur = this.fringe[0];
            if (counter == 0) counter = 1;

            cur.value.forEach(x =>  console.log(x + "\n"));
            console.log("");
        
            if (this.h_misplaced_tiles(cur.value, goal_state) == 0){
                pathTree = cur;
                break;
            }
                

            cur.generate_children().forEach(element => {
                element.fval = this.f_misplaced_tiles(element, goal_state);
                this.fringe.push(element);
            });

            this.explored.push(cur);
            this.fringe.shift();
            this.fringe = _.sortBy(this.fringe, ['fval']);
            const { f, g, h } = obj.f1(cur, goal_state);
        }

        this.traverse(pathTree);

    }

}

let path = [];

let obj = new Eight_Puzzle(3);

export const getPath = (initial_state) => {
    obj.stage_process(initial_state);
    return path.reverse();
}

export const generateClidren = (initial_state) => {
    let state = new State(initial_state, 0, 0 , null);
    return state.generate_children().map(x => x.value);
}