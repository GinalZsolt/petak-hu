<div class={isFirst?"carousel-item active":"carousel-item"}>
    <div>
        <CoinCard Coin={Coin}/>
    </div>
  </div>
  <script lang="ts">
    import type {Coin} from '../../interfaces/Coin';
    import CoinCard from "./CoinCard.svelte";
    export let Coin:Coin;
    export let isFirst:boolean|undefined;
  </script>