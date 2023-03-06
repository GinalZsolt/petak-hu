<script lang="ts">
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
    import type { Statistics } from '../../../services/dbStatistics';
    export let Data: Statistics[];
    let ctx: HTMLCanvasElement;
    onMount(async ()=>{
        Data = Data.sort((a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime());
        Data = Data;
        new Chart(ctx, {
            type:"bar",
            data:{
                labels:Data.map(e=>e.date),
                datasets:[
                        {
                            label:Data.map(e=>e.title)[0],
                            data: Data.map(e=>e.value)
                        }
                ]
            },
            options:{
                responsive:true
            }
        })
    })
</script>
<canvas bind:this={ctx}></canvas>