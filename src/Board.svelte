<script>
    import _ from "lodash";
    import {getPath} from "../scripts/solver.mjs";
    let characters = ["🥳", "🎉", "✨"];
    let confetti = new Array(100)
        .fill()
        .map((_, i) => {
            return {
                character: characters[i % characters.length],
                x: Math.random() * 100,
                y: -20 - Math.random() * 100,
                r: 0.1 + Math.random() * 1,
            };
        })
        .sort((a, b) => a.r - b.r);
    let celebrate = false;
    let input = [
        [1, 2, 3],
        [4, 0, 6],
        [7, 5, 8],
    ];
    const solved = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0],
    ];
    
    let current = input;

    let path = getPath(current);


    const randomize = () => {

    }

    const handleSolve = () => {
        path.forEach((step, i) => {
            setTimeout(function timer() {
                current = step;
            }, i * 500);
        })
        setTimeout(() => {
            alert("Fin de la partida");
        } , path.length * 500)
    };

    const isSolved = () => {
        return _.isEqual(solved, current);
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

        if (isSolved()) handleCelebration();
    };

    const handleCelebration = () => {
        let frame;
        celebrate = true;

        setTimeout(function timer() {
            alert("Ganaste!!!");
            celebrate = false;
        }, 5000);

        function loop() {
            if (celebrate) frame = requestAnimationFrame(loop);
            confetti = confetti.map((emoji) => {
                emoji.y += 0.7 * emoji.r;
                if (emoji.y > 120) emoji.y = -20;
                return emoji;
            });
        }

        loop();
        return () => cancelAnimationFrame(frame);
    };
</script>

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
{#if celebrate}
    {#each confetti as c}
        <span style="left: {c.x}%; top: {c.y}%; transform: scale({c.r})"
            >{c.character}</span
        >
    {/each}
{/if}

<style>

    @media only screen and (min-width: 768px) {
        .board {
        height: 30vw !important;
        width: 30vw !important;
    }
    }
    .board {
        background: #aaa;
        border: 1px solid #f76707;
        display: flex;
        flex-wrap: wrap;
        height: 60vw;
        width: 60vw;
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
        font-size: 3rem;
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

    :global(body) {
        overflow: hidden;
    }
    span {
        position: absolute;
        font-size: 5vw;
        user-select: none;
    }
</style>
