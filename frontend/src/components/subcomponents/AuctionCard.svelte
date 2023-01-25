<script lang="ts">
  import type { Auction } from "../../classes/Auction";
  export let Auction:Auction;
</script>

<div>
  <div class="auctimg">
    <img src={Auction.coin.images[0]} alt="{Auction.title}" />
  </div>
  <div class="bottomText">
    <p>{Auction.coin.name}</p>
    <p>{Auction.price} Ft</p>
  </div>
</div>
<style lang="sass">
</style>
