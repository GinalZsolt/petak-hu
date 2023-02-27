<div class={isFirst?"carousel-item active":"carousel-item"}>
  <div>
      <AuctionCard Auction={Auction} Coin={Coin}/>
  </div>
</div>
<script lang="ts">
  import type { Auction } from "../../interfaces/Auction";
  import type {Coin} from '../../interfaces/Coin';
  import AuctionCard from "./AuctionCard.svelte";
  export let Auction:Auction;
  export let Coin:Coin
  export let isFirst:boolean|undefined;
</script>