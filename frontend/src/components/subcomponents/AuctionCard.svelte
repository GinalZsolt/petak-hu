<script lang="ts">
  import type { Auction } from "../../interfaces/Auction";
  import type { Coin } from '../../interfaces/Coin';
  export let Auction: Auction;
  export let Coin: Coin;
</script>
<a href={"/auctions/"+Auction.ID} class="flexCard"><div class="Card">
  <div class="auctimg d-flex justify-content-center">
    <img
      class="m-auto img-fluid"
      src={"/" + Coin.headfile}
      alt={Auction.title}
    />
  </div>
  <div
    class="bottomText d-flex flex-wrap justify-content-between text-light overflow-hidden px-1"
  >
    <p class="my-0 py-0">
      {
      Auction.title.substring(0, 15) == Auction.title
        ? Auction.title
        : Auction.title.substring(0, 15) + "..."
      }
    </p>
    <p class="my-0 py-0">{Auction.price} Ft</p>
  </div>
</div></a>

<style lang="sass">
.flexCard
  flex: 1 1 auto
  border-left: 1px solid white
  border-right: 1px solid white
.Card
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
