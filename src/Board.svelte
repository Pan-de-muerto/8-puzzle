<script>
    import _ from "lodash";
    import { onMount } from "svelte";
    import { getPath , generateClidren } from "../scripts/solver.mjs";

    let characters = ["🍆" , "🔥" , "💯 ","🥵"];
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

    const solved = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0],
    ];

    let current = _.cloneDeep(solved);

    const randomize = () => {
        const shuffleDepth = 20;
        for(let i = 0 ; i <= shuffleDepth ; i++){
            let options = generateClidren(current);
            current = _.sample(options);
        }
    };

    const handleFileUpload = async (e) => {
        let file = e.target.files[0];
        let text = await file.text();
        let arr = _.map(text, _.parseInt).filter((x) => {
            if(x == 0) return true;
            return !!x;
        });
        if (arr.length < 9) arr.push(0);
        let board = _.chunk(arr, 3);
        console.log(board);
        if (canSolve(board)) current = board;
        else alert("Ese tablero no tiene solución");
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

    const handleSolve = () => {
        let path = getPath(current);
        path.forEach((step, i) => {
            setTimeout(function timer() {
                current = step;
            }, i * 1000);
        });
        setTimeout(() => {
            alert("Fin de la partida");
            location.reload()
        }, path.length * 1000);
    };

    const canSolve = (board) => {
        let inv_count = getInvCount(board);
        return inv_count % 2 == 0;
    };

    const getInvCount = (board) => {
        let inv_count = 0;
        for (let i = 0; i < 2; i++) {
            for (let j = i + 1; j < 3; j++) {
                if (board[j][i] > 0 && board[j][i] > board[i][j]) inv_count += 1;
            }
        }
        return inv_count;
    };

    const isSolved = () => {
        return _.isEqual(solved, current);
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

    const triggerUpload= () => {
        document.getElementById("text-file").click()
    }



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
<div class="button-group">
    <button on:click={handleSolve}>Solve</button>
    <button on:click="{randomize}">Shuffle</button>
    <button on:click="{triggerUpload}">Upload</button>
</div>
<input id="text-file" class="displaynt" type="file" accept="text/plain" on:change={(e) => handleFileUpload(e)} />
{#if celebrate}
    {#each confetti as c}
        <span style="left: {c.x}%; top: {c.y}%; transform: scale({c.r})"
            >{c.character}</span
        >
    {/each}
{/if}

<style>
    @media only screen and (min-width: 1000px) {
        .board {
            height: 30vw !important;
            width: 30vw !important;
        }
        .button-group {
            width: 30vw !important;
        }
    }

    .button-group{
        display: flex;
        width: 80vw;
        justify-content: center;
    }
    .button-group > button {
        margin: auto;
        width: 32%;
    }
    .displaynt{
        display: none;
    }
    .board {
        background: #171923;
        display: flex;
        flex-wrap: wrap;
        height: 80vw;
        width: 80vw;
    }
    .board > .tile {
        flex: 1 1 30%;
        transition: ease-in;
        transition-duration: 0.5s;
    }
    .tile {
        background-color: #E6FFFA;
        border-radius: 5px;
        margin:3px;
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
        margin:3px;
    }
    .on_position {
        color: green;
    }

    :global(body) {
        overflow: hidden;
        background-color: #2D3748;
    }
    span {
        position: absolute;
        font-size: 5vw;
        user-select: none;
    }
</style>
