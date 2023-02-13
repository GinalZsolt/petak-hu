<script lang="ts">
  import type { Auction } from "../classes/Auction";

  export let auction: Auction;
  let username: string = "mintajanos";
</script>

<main>
  <div class="col-11 mx-auto mt-5">
    <aside class="d-block mb-4 d-flex flex-row align-items-center">
      <button class="btn border-dark me-2"><i class="bi bi-arrow-left" /></button>
      <h2 class="mb-0">{username} - {auction.title}</h2>
    </aside>
    <div class="row mx-auto">
      <div class="ps-md-0 col-md-6 col-12 mb-md-0 mb-3">
        <div class="w-100 h-100" id="AuctionCoin">
          <img class="img-fluid h-100" src={auction.coin.images.head} alt="" />
          <p class="w-100 px-2" id="title">{auction.coin.name}</p>
        </div>
      </div>
      <div class="col-md-6 col-12 pe-md-0">
        <h3>Licitálás</h3>
        <div class="d-flex flex-row mb-3">
          <div class="input-group me-lg-3">
            <input type="number" min={auction.price +auction.minBid} value={auction.price + auction.minBid} name="bidAmount" class="form-control border-dark" />
            <label for="bidAmount" class="input-group-text border-dark">Ft</label>
          </div>
          <button class="btn border-dark">Licitálás</button>
        </div>
        <p class="border-bottom border-dark pb-3">Licitlépcső: {auction.minBid} Ft</p>
        <h3>Legutóbbi licitek</h3>
        <div id="Bidders">
          <p>mintajanos02 - 200 Ft {new Date().toISOString()}</p>
          <p>mintajanos02 - 200 Ft {new Date().toISOString()}</p>
          <p>mintajanos02 - 200 Ft {new Date().toISOString()}</p>
          <p>mintajanos02 - 200 Ft {new Date().toISOString()}</p>
          <p>mintajanos02 - 200 Ft {new Date().toISOString()}</p>
        </div>
      </div>
    </div>
    <hr class="my-3">
    <div class="mx-auto">
      <h3>Az aukcióról:</h3>
      {#each auction.description.split('\n') as line}
      <p>{line}</p>
      {/each}
    </div>
  </div>
</main>

<style lang="sass">
hr
  background-color: --bs-dark
#Bidders
  max-height: 150px
  overflow: auto
#AuctionCoin
  border-radius: 0.25rem
  display: flex
  flex-flow: row wrap
  justify-content: center
  background-color: black
  position: relative
  overflow: hidden
  img
    border: 1px solid black
.input-group-text
  background-color: #e99d60
#title
  margin-bottom: 0
  position: absolute
  top: calc( 100% - 24px )
  left: 0
  color: white
  background: #ffffff54
.btn
  background-color: #e99d60
</style>
