<script lang="ts">
  import { GetAllAuctions, GetAuctions } from "../services/dbAuction";
  import { Token } from "../stores";
  import AuctionCard from "./subcomponents/AuctionCard.svelte";
  let searchText: string = "";
  function mediaQuery(pixels:number):boolean{
    const mediaquery:any = window.matchMedia(`(max-width:${pixels}px)`);
    return mediaquery.matches;
  }
  let Auctions = GetAllAuctions($Token.token);
</script>

<main>
  <div class="col-lg-9 col-md-10 col-11 mx-auto">
    <div class="input-group mb-5">
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
    <div
      class="d-flex flex-row w-100 border-dark border rounded-start rounded-end mb-5"
    >
      <button
        class="startBtn btn btn-primary rounded-0 rounded-start border-0 border-end border-dark fw-bold"
        data-bs-target="#top"
        data-bs-slide="prev"><i class="bi bi-arrow-left" /></button
      >
      <div id="top" class="carousel slide w-100" data-bs-ride="carousel">
        <div class="carousel-inner">
          {#await Auctions}
            <div class="spinner-border"></div>
            {:then Data}
              {#each Array(Math.ceil((Data.length/3))) as i, index}
              <div class={"carousel-item" + (index == 0 ? " active" : "")}>
                <div class="d-flex">
                  {#if Data[index]}
                  <AuctionCard Auction={Data[index]} />
                  {/if}
                  {#if Data[index+1]}
                  <AuctionCard Auction={Data[index+1]} />
                  {/if}
                  {#if Data[index+2]}
                  <AuctionCard Auction={Data[index+2]} />
                  {/if}
                </div>
              </div>
              {/each}
          {/await}
        </div>
      </div>
      <button
        class="endBtn btn btn-primary rounded-0 rounded-end border-0 border-start border-dark fw-bold"
        data-bs-target="#top"
        data-bs-slide="next"><i class="bi bi-arrow-right" /></button
      >
    </div>
    <h3>Legújabb aukciók</h3>
    <div
      class="d-flex flex-row w-100 border-dark border rounded-start rounded-end"
    >
      <button
        class="startBtn btn btn-primary rounded-0 rounded-start border-0 border-end border-dark fw-bold"
        data-bs-target="#bottom"
        data-bs-slide="prev"><i class="bi bi-arrow-left" /></button
      >
      <div id="bottom" class="carousel slide w-100" data-bs-ride="carousel">
        <div class="carousel-inner">
          {#await Auctions}
            <div class="spinner-border"></div>
            {:then Data}
              {#each Array(Math.ceil((Data.length/3))) as i, index}
              <div class={"carousel-item" + (index == 0 ? " active" : "")}>
                <div class="d-flex">
                  {#if Data[index]}
                  <AuctionCard Auction={Data[index]} />
                  {/if}
                  {#if Data[index+1]}
                  <AuctionCard Auction={Data[index+1]} />
                  {/if}
                  {#if Data[index+2]}
                  <AuctionCard Auction={Data[index+2]} />
                  {/if}
                </div>
              </div>
              {/each}
          {/await}
        </div>
      </div>
      <button
        class="endBtn btn btn-primary rounded-0 rounded-end border-0 border-start border-dark fw-bold"
        data-bs-target="#bottom"
        data-bs-slide="next"><i class="bi bi-arrow-right" /></button
      >
    </div>
  </div>
</main>

<style lang="sass">
    $searchbarColor: #ffcc95
    .input-group-text
        background-color: $searchbarColor
    .carousel
        background-color: #000
    .startBtn
        background: linear-gradient(42deg, rgba(234,149,80,1) 0%, rgba(215,113,29,1) 100%)
    .endBtn
        background: linear-gradient(231deg, rgba(234,149,80,1) 0%, rgba(215,113,29,1) 100%)
</style>
