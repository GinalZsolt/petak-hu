<script lang="ts">
  import type { Auction } from "../../classes/Auction";
  export let Auction: Auction;
</script>

<div id="card">
  <div class="auctimg">
    <img src={'/'+Auction.coin.images.head} alt={Auction.title} />
  </div>
  <div class="bottomText d-flex justify-content-between">
    <p>{Auction.coin.name}</p>
    <p>{Auction.price} Ft</p>
  </div>
</div>

<style lang="sass">
#card
  width:18rem
#auctimg
  position: relative
  top: 0
  left: 0
.bottomText
  position: absolute
  top: 0
  left: 0
</style>
