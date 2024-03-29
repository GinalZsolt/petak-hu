<script lang="ts">
  import { AuctionPageAuctions, GetAllAuctions } from "../services/dbAuction";
  import { Token, userPerms } from "../stores";
  import AuctionCard from "./subcomponents/Cards/AuctionCard.svelte";
  import {fade} from 'svelte/transition';
  import MediaQuery from "./subcomponents/MediaQuery.svelte";
  let searchText: string = "";
</script>

<main>
  {#await AuctionPageAuctions($Token.token)}
  <div class="spinner-border"></div>
  {:then Data}
  {#if Data.length>0}
  <div class="col-lg-9 col-md-10 col-11 mx-auto mt-5">
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
    {#if searchText == "" || searchText == undefined}
    <h3>Aktuális aukciók</h3>
    <div
      class="d-flex flex-row w-100 border-dark border rounded-start rounded-end mb-5"
    >
      <button
        class="startBtn btn btn-primary rounded-0 rounded-start border-0 border-end border-dark fw-bold"
        data-bs-target="#top"
        data-bs-slide="prev"><i class="bi bi-arrow-left" /></button
      >
      <div id="top" class="carousel slide w-100" data-bs-ride="carousel" in:fade='{{duration:140}}'>
        <div class="carousel-inner">
          <MediaQuery query="(min-width: 768px)" let:matches>
            {#if matches}
                <div class="spinner-border"></div>
                
                  {#each Data as array, i}
                  <div class={"carousel-item" + (i == 0 ? " active" : "")}>
                    <div class="d-flex">
                      {#if array[0]}  
                        <AuctionCard Auction={array[0]}/>
                      {:else}
                        <div class="flexCard"></div>
                      {/if}
                      {#if array[1]}  
                      <AuctionCard Auction={array[1]}/>
                      {:else}
                      <div class="flexCard"></div>
                      {/if}
                      {#if array[2]}  
                      <AuctionCard Auction={array[2]}/>
                      {:else}
                      <div class="flexCard"></div>
                      {/if}
                    </div>
                  </div>
                  {/each}
              
            {/if}
            {#if !matches}
              {#await GetAllAuctions($Token.Token) then Data}
                  {#each Data as auction, i}
                    <div class={"carousel-item" + (i == 0 ? " active" : "")}>
                      <div class="d-flex">
                        {#if auction}  
                          <AuctionCard Auction={auction}/>
                        {:else}
                          <div class="flexCard"></div>
                        {/if}
                      </div>
                    </div>
                  {/each}
              {/await}
            {/if}
          </MediaQuery>
        </div>
      </div>
      <button
      class="endBtn btn btn-primary rounded-0 rounded-end border-0 border-start border-dark fw-bold"
      data-bs-target="#top"
      data-bs-slide="next"><i class="bi bi-arrow-right" /></button
      >
    </div>
    
      
    {:else}
    <div id="searchresults">
      {#await AuctionPageAuctions($Token.token)}
        <i class="bi threedots"></i>
      {:then data} 
      {#each data as array}
        {#each array.filter(e=>e.title.toLowerCase().includes(searchText.toLowerCase())) as item}
        <a in:fade='{{duration:140}}' href={`/auctions/${item.ID}`}><p class="searchresult">{item.title} | {new Intl.NumberFormat('hu-HU', {style:'currency', currency:'HUF'}).format(item.price)}</p></a>
        {/each}
      {/each}
      {/await}
    </div>
    {/if}
  </div>
  {:else}
  <div class="mt-5 text-center">
    <h2>Még nincs aukció feltöltve!</h2>
    {#if $userPerms.permission>0}
      <h3>A <a href={`/catalogue/${$userPerms.id}`}>katalógusában</a> aukcióra bocsáthat érmét!</h3>
    {:else}
      <h3><a href="/register">Regisztráljon</a> és vegye fel maga az elsőt!</h3>
    {/if}
  </div>
  {/if}
  {/await}
</main>

<style lang="sass">
    #searchresults
      .searchresult
        margin-bottom: 0
        color: black
        text-decoration: underline 1px solid black
        transition: font-weight 0.1s, background-color 0.1s
        border-bottom: 1px solid gray
      .searchresult:hover
        font-weight: bold
        background-color: #00000011
    .flexCard
      width:33%
    .carousel
      background-color: #000
    .startBtn, .endBtn
      transition: opacity 0.3s ease-out
    .startBtn
        background: linear-gradient(42deg, rgba(234,149,80,1) 0%, rgba(215,113,29,1) 100%)
    .endBtn
        background: linear-gradient(231deg, rgba(234,149,80,1) 0%, rgba(215,113,29,1) 100%)
    .startBtn:hover, .endBtn:hover
        opacity: 0.8
</style>
