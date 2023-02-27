<div class={isFirst?"carousel-item active":"carousel-item"}>
    <div class="d-flex">
        {#each Coins as coin, i}
            <CoinCard Coin={coin[i]}/>
        {/each}
    </div>
  </div>
  
  <script lang="ts">
    import type {Coin} from '../../interfaces/Coin';
    import CoinCard from "./CoinCard.svelte";
    export let Coins:Coin[];
    export let isFirst: boolean;
  </script>