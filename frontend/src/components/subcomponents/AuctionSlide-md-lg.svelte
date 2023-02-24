<div class={isFirst?"carousel-item active":"carousel-item"}>
  <div class="d-flex">
      {#each Auctions as auction, i}
          <AuctionCard Auction={auction} Coin={Coins[i]}/>
      {/each}
  </div>
</div>

<script lang="ts">
  import type { Auction } from "../../interfaces/Auction";
  import type {Coin} from '../../interfaces/Coin';
  import AuctionCard from './AuctionCard.svelte';
  export let Coins:Coin[];
  export let Auctions:Array<Auction>, isFirst:boolean|undefined;
  console.log(Coins, Auctions);
</script>