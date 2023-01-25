<script lang="ts">
  import AuctionCard from "./subcomponents/AuctionCard.svelte";
  let searchText: string = "";
</script>

<main>
  <div class="input-group mb-3">
    <span class="input-group-text border-dark"><i class="bi bi-search" /></span>
    <input
      type="text"
      class="form-control border-dark"
      placeholder="Keresés az aukciók közt"
      bind:value={searchText}
    />
  </div>
  <div class="carousel slide" data-bs-ride="carousel" id="#top">
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    
  </div>
  <div class="carousel slide" id="new" data-bs-ride="carousel">
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    
  </div>
</main>

<style lang="sass">
    $searchbarColor: #ffcc95
    .input-group-text
        background-color: $searchbarColor
</style>
