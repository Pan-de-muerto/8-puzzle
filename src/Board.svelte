<script>
    let input = [
        [1, 2, 3],
        [4, 0, 6],
        [7, 5, 8],
    ];
    let current = input;

    let solved = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0],
    ];
    let path = [
        [
            [1, 2, 3],
            [4, -1, 6],
            [7, 5, 8],
        ],
        [
            [1, -1, 3],
            [4, 2, 6],
            [7, 5, 8],
        ],
        [
            [1, 2, 3],
            [-1, 4, 6],
            [7, 5, 8],
        ],
        [
            [1, 2, 3],
            [4, 5, 6],
            [7, -1, 8],
        ],
        [
            [1, 2, 3],
            [4, 6, -1],
            [7, 5, 8],
        ],
        [
            [1, -1, 3],
            [4, 2, 6],
            [7, 5, 8],
        ],
        [
            [-1, 1, 3],
            [4, 2, 6],
            [7, 5, 8],
        ],
        [
            [1, 3, -1],
            [4, 2, 6],
            [7, 5, 8],
        ],
        [
            [-1, 2, 3],
            [1, 4, 6],
            [7, 5, 8],
        ],
        [
            [1, 2, 3],
            [-1, 4, 6],
            [7, 5, 8],
        ],
        [
            [1, 2, 3],
            [7, 4, 6],
            [-1, 5, 8],
        ],
        [
            [1, 2, 3],
            [4, 5, 6],
            [-1, 7, 8],
        ],
        [
            [1, 2, 3],
            [4, 5, 6],
            [7, -1, 8],
        ],
        [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, -1],
        ],
    ];
    const handleSolve = () => {
        path.forEach((step, i) => {
            setTimeout(function timer() {
                input = step;
            }, i * 500);
        });
    };

    const handleMove = (i, j) => {
        if (!!current[i - 1] && current[i - 1][j] == 0) {
            current[i - 1][j] = current[i][j];
            current[i][j] = 0;
        } else if (!!current[i + 1] && current[i + 1][j] == 0) {
            current[i + 1][j] = current[i][j];
            current[i][j] = 0;
        } else if (current[i][j - 1] == 0) {
            current[i][j - 1] = current[i][j];
            current[i][j] = 0;
        } else if (current[i][j + 1] == 0) {
            current[i][j + 1] = current[i][j];
            current[i][j] = 0;
        } else console.log("can't move");


        if(current == solved){
            alert("GANASTE")
        }
    };
</script>

<div>
    <div class="board">
        {#each current as row, i}
            {#each row as tile, j}
                <div
                    on:click={() => handleMove(i, j)}
                    class={tile != 0 ? "tile" : "empty"}
                    class:on_position={tile == solved[i][j]}
                >
                    {tile}
                </div>
            {/each}
        {/each}
    </div>
    <br />
    <button on:click={handleSolve}>Solve</button>
    <button>Randomize</button>
    <button>Upload</button>
</div>

<style>
    .board {
        background: #aaa;
        border: 1px solid #f76707;
        display: flex;
        flex-wrap: wrap;
        margin: auto;
        height: 500px;
        width: 500px;
    }
    .board > .tile {
        flex: 1 1 30%;
        transition: ease-out;
        transition-duration: 0.5s;
    }
    .tile {
        background-color: #fff4e6;
        border: 1px solid #f76707;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-weight: bold;
    }
    .board > .empty {
        flex: 1 1 30%;
        color: transparent;
        border: 1px solid #f76707;
    }
    .on_position {
        color: green;
    }
</style>
