<script lang="ts">
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
    import type { Statistics } from '../../../services/dbStatistics';
    export let Data: Statistics[];
    let ctx: HTMLCanvasElement;
    onMount(async ()=>{
        let dates=[]

        Data = Data.sort((a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime());
        Data = Data;

        Data.map(e=>e.date).forEach(element => {
            dates.push( new Intl.DateTimeFormat("hu-HU").format(new Date(element)))
        });
        
        new Chart(ctx, {
            type:"line",
            data:{
                labels:dates,
                datasets:[
                        {
                            label:Data.map(e=>e.title)[0],
                            data: Data.map(e=>e.value),
                            backgroundColor: "#f59445",
                            borderColor: '#f59445af',
                            tension: 0.1
                        }
                ]
            },
            options:{
                responsive:true,
                plugins:{
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    },
                },
                scales: 
                {
                    x: {
                        title: {
                        display: true,
                        text: 'Dátum'
                        }
                    },
                    y: {
                        title: {
                        display: true,
                        },
                        ticks: {
                        stepSize: 1
                        }
                    }
                }
            }
        })
    })
</script>
<canvas bind:this={ctx}></canvas>