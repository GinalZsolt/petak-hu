<div class={isFirst?"carousel-item active":"carousel-item"}>
  <div class="d-flex">
      {#each Auctions as auction}
          <AuctionCard Auction={auction}/>
      {/each}
  </div>
</div>

<script lang="ts">
  import type { Auction } from "../../classes/Auction";
  import AuctionCard from './AuctionCard.svelte';
  export let Auctions:Array<Auction>, isFirst:boolean;
</script>