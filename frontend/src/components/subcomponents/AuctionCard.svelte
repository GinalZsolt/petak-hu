<script lang="ts">
  import type { Auction } from "../../interfaces/Auction";
  import type {Coin} from "../../interfaces/Coin";
  import { GetCoin } from "../../services/dbCoin";
  import {Token} from '../../stores';
  export let Auction: Auction;
  let _Coin: Promise<Coin> = GetCoin(Auction.coinID, $Token.token);
</script>
<a href={"/auctions/"+Auction.ID} class="flexCard"><div class="Card">
  <div class="auctimg d-flex justify-content-center">
    {#await _Coin}
    {:then Data}
      <img
        class="m-auto img-fluid"
        src={"http://localhost:8080/img/" + Data.headfile}
        alt={Data.name}
      />
    {/await}
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
    <p class="my-0 py-0">{new Intl.NumberFormat('hu-HU', {style:'currency', currency:'HUF'}).format(Auction.price)}</p>
  </div>
</div></a>

<style lang="sass">
.flexCard
  flex: 1 1 auto
  border-left: 1px solid white
  border-right: 1px solid white
  width: 33%
.Card
  height: 100%
  position: relative
.auctimg
  background-color: #000
  max-width: 100%
.bottomText
  position: absolute
  top: calc(100% - 24px)
  width: 100%
  max-height: 24px
  background-color: #000000b3

</style>
