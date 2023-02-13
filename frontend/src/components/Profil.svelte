<script lang="ts">
    let profile={
        picture: "/test.png",
        name: "test",
        email: "test@test.com",
        coin_list: ["test, test2", "test3"],
        auction_list: ["test", "test2"]
    }
  import { Auction } from "../classes/Auction";
  import { Coin } from "../classes/Coin/Coin";
  import AuctionSlideSm from "./subcomponents/AuctionSlide-sm.svelte";
  import AuctionSlideMdLg from "./subcomponents/AuctionSlide-md-lg.svelte";
  //import CoinModal from "./subcomponents/coinModal.svelte";
  import AuctionUploadModal from "./subcomponents/AuctionUploadModal.svelte";
  export let ID:number;
  let searchText: string = "";
    function mediaQuery(pixels:number):boolean{
    const mediaquery:any = window.matchMedia(`(max-width:${pixels}px)`);
    return mediaquery.matches;
  }
</script>

<main>
    <div id="profile">  <!-- profile -->
        <div class="col-lg-9 d-flex flex-row tulajdonsagok">  
            <div class="rounded-circle border-dark border overflow-hidden"><img class="img-fluid mx-auto flexstart" src={profile.picture} alt=""></div> <!-- profile picture-->
            <div id="nevemail">
                <p>{profile.name}</p> <!-- profile name -->
                <p>{profile.email}</p> <!-- profile email -->
            </div>
        </div>
        <div id="buttons">
            <button class="btn">chat</button> <!-- chat button -->
            <button class="btn"><i class="bi-three-dots"></i></button> <!-- options button -->
        </div>
    </div>
    <h2>{profile.name} katalógus</h2>
    <div        
      class="d-flex flex-row w-100 border-dark border rounded-start rounded-end mb-5"
    >                           <!-- katalogus -->
      <button
        class="startBtn btn btn-primary rounded-0 rounded-start border-0 border-end border-dark fw-bold"
        data-bs-target="#top"
        data-bs-slide="prev"><i class="bi bi-arrow-left" /></button
      >
      <div id="top" class="carousel slide w-100" data-bs-ride="carousel">
        <div class="carousel-inner">
          <!-- Ide a katalógus cardjai lesznek! -->
        </div>
      </div>
      <button
        class="endBtn btn btn-primary rounded-0 rounded-end border-0 border-start border-dark fw-bold"
        data-bs-target="#top"
        data-bs-slide="next"><i class="bi bi-arrow-right" /></button
      >
    </div> 
    <h2>{profile.name} aukció</h2>
    <div        
      class="d-flex flex-row w-100 border-dark border rounded-start rounded-end mb-5"
    >                           <!-- aukciók -->
      <button
        class="startBtn btn btn-primary rounded-0 rounded-start border-0 border-end border-dark fw-bold"
        data-bs-target="#bottom"
        data-bs-slide="prev"><i class="bi bi-arrow-left" /></button
      >
      <div id="bottom" class="carousel slide w-100" data-bs-ride="carousel">
        <div class="carousel-inner">
          <!--{#if mediaQuery(576)}
            <AuctionSlideSm Auction={testAuction} isFirst={true} />
            <AuctionSlideSm Auction={testAuction} isFirst={false} />
            {:else if mediaQuery(768)}
            <AuctionSlideMdLg Auctions={[testAuction, testAuction]} isFirst={true} />
            <AuctionSlideMdLg Auctions={[testAuction, testAuction]} isFirst={false} />
            {:else}
            <AuctionSlideMdLg Auctions={[testAuction, testAuction, testAuction]} isFirst={true}/>
            <AuctionSlideMdLg Auctions={[testAuction, testAuction, testAuction]} isFirst={false}/>
          {/if}-->
        </div>
      </div>
      <button
        class="endBtn btn btn-primary rounded-0 rounded-end border-0 border-start border-dark fw-bold"
        data-bs-target="#bottom"
        data-bs-slide="next"><i class="bi bi-arrow-right" /></button
      >
    </div>  
    <button data-bs-target="#auctionupload" data-bs-toggle="modal">SEGÍCCSÉG</button>
    <AuctionUploadModal/>
</main>

<style lang="sass">
    #profile
        display: flex
        flex-direction: row

    #Profile_pic
        width: 5vw
        height: 5vw

    .btn
        background-color: #ea9e60
    
    .katalogus
        margin: auto
        height: 20vh
        background-color: white
        border: 1px solid black
    
    .katalogusok
        margin: auto

    .tulajdonsagok
        display: flex   
        align-items: center
        margint-left: 0px

    #nevemail
        justify-self: center
        padding-left: 2vw

    main
        margin-left: 10vw
        margin-right: 10vw
    
    .flexstart
        justify-content: flex-start
    
    #profile #buttons
        justify-items: flex-end
        display: flex
        flex-direction: column
        padding-left: 15vw

    #profile #buttons button
        margin-bottom: 2vh
</style>