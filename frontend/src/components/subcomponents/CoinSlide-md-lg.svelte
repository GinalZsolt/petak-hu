<div class={isFirst?"carousel-item active":"carousel-item"}>
  {#if Coins}  
  <div class="d-flex">
        {#each Coins as coin}
          <div on:click={()=>{PickCoin(coin)}}>
            <CoinCard coin={coin} />
          </div>
        {/each}
  </div>
  {/if}
</div>
  
  <script lang="ts">
    import type {Coin} from "../../interfaces/Coin";
    import CoinCard from "./CoinCard.svelte";
    export let Coins:Coin[];
    export let isFirst: boolean;
    let modal
    function PickCoin(picked){
      modal.loadmodal(picked)
      console.log(picked)
    }
  </script>