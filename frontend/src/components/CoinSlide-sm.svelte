<div class={isFirst?"carousel-item active":"carousel-item"}>
    <div>
        <AuctionCard Auction={undefined} Coin={Coin}/>
    </div>
  </div>
  <script lang="ts">
    import type {Coin} from '../interfaces/Coin';
    import AuctionCard from "./subcomponents/AuctionCard.svelte";
    export let Coin:Coin;
    export let isFirst:boolean|undefined;
  </script>