<div class={isFirst?"carousel-item active":"carousel-item"}>
  <div>
      <AuctionCard Auction={Auction}/>
  </div>
</div>
<script lang="ts">
  import type { Auction } from "../../classes/Auction";
  import AuctionCard from "./AuctionCard.svelte";
  export let Auction:Auction;
  export let isFirst:boolean|undefined;
</script>