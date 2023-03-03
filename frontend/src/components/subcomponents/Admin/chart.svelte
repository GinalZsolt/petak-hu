<script lang="ts">
    import {Chart} from 'chart.js';
    import type { CoinAmountStatistic, CoinWorthStatistic } from '../../../services/dbStatistics';
    let ctx:HTMLCanvasElement;
    let Data: CoinAmountStatistic[]| CoinWorthStatistic[];
    new Chart(ctx, {
        type:"bar",
        data:{
            labels:Data.map(e=>(e as CoinAmountStatistic).date),
            datasets:{
                [
                    {
                        data: Data.map(e=>(e as CoinAmountStatistic).count);
                    }
                ]
            }
        }
    })
</script>
<canvas bind:this={ctx}></canvas>