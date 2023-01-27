<script lang="ts">
  import { Auction } from "../classes/Auction";
    import { Coin } from "../classes/Coin";
import AuctionCard from "./subcomponents/AuctionCard.svelte";
  let searchText: string = "";
  let testAuction: Auction = new Auction({
    ID:0,
    price:11,
    title:"Lorem",
    minBid:50,
    description:"Lorem ipsum dolor sit amet",
    expiration: new Date()
  });
  testAuction.coin = new Coin({
    ID:0,
    worth:11,
    name:"Zsetonergopaeriofgjoi3jgoi5trjgoe4rjiogt",
    description:"Zseton leírás",
    headfile:"test.png",
    tailfile:"test.png"
  });
</script>

<main>

  
  <div class="col-lg-9 col-md-10 col-11 mx-auto">
    <div class="input-group mb-3">
      <span class="input-group-text border-dark"
      ><i class="bi bi-search" /></span
      >
      
      <input
        type="text"
        class="form-control border-dark"
        placeholder="Keresés az aukciók közt"
        bind:value={searchText}
      />
    </div>
    <h3>Aktuális aukciók</h3>
    <div class="carousel slide" data-bs-ride="carousel" id="top">
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#top"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true" />
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#top"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true" />
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <h3 class="my-3">Legfrissebb aukciók</h3>
    <div class="carousel slide" id="new" data-bs-ride="carousel">
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#new"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true" />
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#new"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true" />
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <AuctionCard Auction={testAuction} />
</main>

<style lang="sass">
    $searchbarColor: #ffcc95
    .input-group-text
        background-color: $searchbarColor
    .carousel
        height: 25vh
        background-color: #000
</style>
