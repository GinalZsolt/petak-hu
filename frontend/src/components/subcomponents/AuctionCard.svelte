<script lang="ts">
  import type { Auction } from "../../classes/Auction";
  export let Auction: Auction;
  function ShowModal(){
    console.log('asd')
  }
</script>
<a href="/"><div id="card">
  <div class="auctimg d-flex justify-content-center">
    <img
      class="m-auto img-fluid"
      src={"/" + Auction.coin.images.head}
      alt={Auction.title}
    />
  </div>
  <div
    class="bottomText d-flex flex-wrap justify-content-between text-light overflow-hidden"
  >
    <p class="my-0 py-0">
      {Auction.coin.name.substring(0, 15) == Auction.coin.name
        ? Auction.coin.name
        : Auction.coin.name.substring(0, 15) + "..."}
    </p>
    <p class="my-0 py-0">{Auction.price} Ft</p>
  </div>
</div></a>

<style lang="sass">
#card
  height: 100%
  position: relative
.auctimg
  background-color: #000
.bottomText
  position: absolute
  top: calc(100% - 24px)
  width: 100%
  max-height: 24px
  background-color: #000000b3

</style>
