<template>
    <div class="main">
        <h1>Game of Life</h1>
        <div ref='canvas' class="game" id="p5Canvas"></div>
        <div class="restart" @click="restart">Restart</div>
    </div>
</template>
<script>
import { useGameLife } from '@/hook/useGameLife'
export default {
    name: 'MainPage',
    setup() {
        const { App, restart } = useGameLife()
        return {
            App,
            restart
        } 
    }
}
</script>
<style>
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;
    }

    .game {
        margin-top: 50px;
    }

    .restart {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
        padding: 10px 20px;
        cursor: pointer;
        text-transform: uppercase;
        font-weight: 700;
        color: #fff;
        background-color: #0400ff;
        border-radius: 5px;
    }
</style>