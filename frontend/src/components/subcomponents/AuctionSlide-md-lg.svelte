<div class={isFirst?"carousel-item active":"carousel-item"}>
  <div class="d-flex">
      {#each Auctions as auction, i}
          <AuctionCard Auction={auction}/>
      {/each}
  </div>
</div>

<script lang="ts">
  import type { Auction } from "../../interfaces/Auction";
  import type {Coin} from "../../classes/Coin/Coin";
  import AuctionCard from './AuctionCard.svelte';
  export let Auctions:Array<Auction>, isFirst:boolean|undefined;
</script>