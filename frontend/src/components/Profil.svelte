<script lang="ts">
  import type { Auction } from "../interfaces/Auction";
  import type { Coin } from "../interfaces/Coin";
  import AuctionSlideSm from "./subcomponents/AuctionSlide-sm.svelte";
  import AuctionSlideMdLg from "./subcomponents/AuctionSlide-md-lg.svelte";
  import CoinSlideMdLg from "./subcomponents/CoinSlide-md-lg.svelte";
  import CoinSlideSm from "./subcomponents/CoinSlide-sm.svelte";
  import AuctionUploadModal from "./subcomponents/AuctionUploadModal.svelte";
  import {userPerms, Token} from './../stores';
  import CoinUpload from "./subcomponents/CoinUpload.svelte";
  import { onMount } from "svelte";
  import {Get,Patch} from "../services/dbQueries";
  import {GetAuctions} from "../services/dbAuction";
  import BanModal from "./subcomponents/BanModal.svelte";
  import { GetUserData } from "../services/dbUser";
  import ErrorAlert from "./subcomponents/ErrorAlert.svelte";
  import { GetUserCoins } from "../services/dbCoin";
  let err1 
  export let ID:number;
  let profile
  function Promote(){
    Patch($Token.token,"users","ID",ID,{permission:"2"}).then((res)=>{
      err1.showError()
    })
  }

  function mediaQuery(pixels:number):boolean{
    const mediaquery:any = window.matchMedia(`(max-width:${pixels}px)`);
    return mediaquery.matches;
  }


  async function getAuctions() {
    return await await GetAuctions($Token.token, $userPerms.id);

  }

  onMount(async()=>{
    await GetUserData(ID,$Token.token).then((res)=>{
      profile=res[0]
    })
    profile.coins=GetUserCoins($Token.token,$userPerms.id)
    profile.auctions = await getAuctions();
    console.log(await profile);    
  })

</script>
<CoinUpload/>
<BanModal User={profile} />
{#if profile}
<main>
  <ErrorAlert bind:this={err1} Error={{id:"promoted",text:"Sikeres Promoció!",error:false}}/>
    <div id="profile" class="row">  <!-- profile -->
        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 d-flex flex-row tulajdonsagok" >  
          {#if profile.imagefile==undefined||profile.imagefile==null||profile.imagefile==""}
            <div class="overflow-hidden"><img class="img-fluid mx-auto flexstart" src="../../public/test.png" alt=""></div> <!-- profile picture-->
            
          {:else}
            <div class="overflow-hidden"><img class="img-fluid mx-auto flexstart" src={"http://localhost:8080/img/"+profile.imagefile} alt=""></div> <!-- profile picture-->
            
          {/if}
            <div id="nevemail">
                <p>{profile.name}</p> <!-- profile name -->
                <p>{profile.email}</p> <!-- profile email -->
            </div>
        </div>
        <div id="buttons" class="col-lg col-md col-sm col-xs">
          {#if ID!=$userPerms.id&&$userPerms.permission==2}
          <div class="dropdown">
            <button class="btn" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi-three-dots"></i></button> <!-- options button -->
            <ul class="dropdown-menu">
              <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#Ban">Kitiltás</button></li>
              <li><button class="dropdown-item" on:click={()=>{Promote()}}>Adminokhoz adás</button></li>
            </ul>
          </div>
          {/if}
        </div>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <h2>{profile.name} katalógusa</h2>
      {#if ID==$userPerms.id}
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#CoinUpload"><i class="bi bi-plus-lg"></i></button>
      {/if}
    </div>
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
          <div id="bottom" class="carousel slide w-100" data-bs-ride="carousel">
            <div class="carousel-inner">
              {#if profile.coins}
                {#if mediaQuery(576)}
                  {#each profile.coins as coin, i}
                    <CoinSlideSm coin={coin} isFirst={i==0 ? true : false} />            
                  {/each}
                {:else if mediaQuery(768)}
                  {#each Array(profile.coins.length/2)  as index, i}
                    <CoinSlideMdLg Coins={[profile.coins[i], profile.coins[i+1]]} isFirst={i==0 ? true : false} />
                  {/each}
                {:else}
                  {#each Array(profile.coins.length/3)  as index, i}
                    <CoinSlideMdLg Coins={[profile.coins[i], profile.coins[i+1], profile.coins[i+2]]} isFirst={i==0 ? true : false} />
                  {/each}
                {/if}
              {/if} 
            </div>
          </div>
        </div>
      </div>
      <button
        class="endBtn btn btn-primary rounded-0 rounded-end border-0 border-start border-dark fw-bold"
        data-bs-target="#top"
        data-bs-slide="next"><i class="bi bi-arrow-right" /></button
      >
    </div> 
    <h2>{profile.name} aukciói</h2>
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
          {#if profile.auctions}
          {#if mediaQuery(576)}
            {#each profile.auctions as auction, i}
              <AuctionSlideSm Auction={auction} Coin={profile.coins.find(e=>e.ID==auction.coinID)} isFirst={i==0 ? true : false} />            
            {/each}
          {:else if mediaQuery(768)}
            {#each Array(profile.auctions.length/2)  as index, i}
              <AuctionSlideMdLg Auctions={[profile.auctions[i], profile.auctions[i+1]]} isFirst={i==0 ? true : false} />
            {/each}
            {:else}
            {#each Array(profile.auctions.length/3)  as index, i}
              <AuctionSlideMdLg Auctions={[profile.auctions[i], profile.auctions[i+1], profile.auctions[i+2]]} isFirst={i==0 ? true : false} />
            {/each}
            {/if}
        {/if}

        </div>
      </div>
      <button
        class="endBtn btn btn-primary rounded-0 rounded-end border-0 border-start border-dark fw-bold"
        data-bs-target="#bottom"
        data-bs-slide="next"><i class="bi bi-arrow-right" /></button
      >
    </div>  
    <button data-bs-target="#CoinMod" data-bs-toggle="modal">SEGÍCCSÉG</button>
    <AuctionUploadModal/>
    {#if profile.coins}
      <CoinModal coin={profile.coins[0]}></CoinModal>
    {/if}
  </main>
{/if}
<style lang="sass">
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
      padding-top: 4vh
</style>