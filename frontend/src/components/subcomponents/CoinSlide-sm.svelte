<div class={isFirst?"carousel-item active":"carousel-item"}>
  <div on:click={()=>{PickCoin(coin)}}>
    <CoinCard coin={coin} />
  </div>
</div>

<CoinModal bind:this={modal} />
  <script lang="ts">
    import type {Coin} from "../../interfaces/Coin";
    import CoinCard from "./CoinCard.svelte";
    export let coin:Coin;
    export let isFirst:boolean|undefined;
    import CoinModal from "./coinModal.svelte";
    let modal
    function PickCoin(picked){
      modal.loadmodal(picked)
      console.log(picked)
    }
  </script>