<div class={isFirst?"carousel-item active":"carousel-item"}>
    <div>
        <CoinCard coin={coin}/>
    </div>
  </div>
  <script lang="ts">
    import type {Coin} from "../../classes/Coin/Coin";
    import CoinCard from "./CoinCard.svelte";
    export let coin:Coin;
    export let isFirst:boolean|undefined;
  </script>