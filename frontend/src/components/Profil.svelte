<script lang="ts">
    import { GetUserProfile } from "../services/dbUser";
    import { Token,userPerms } from '../stores';
    import ProfileCard from "./subcomponents/Cards/profileCard.svelte";
    import {Patch, Get} from "../services/dbQueries";
    import BanModal from "./subcomponents/Modals/BanModal.svelte";
    import ErrorAlert from "./subcomponents/ErrorAlert.svelte";
    import CoinUpload from "./subcomponents/Modals/CoinUpload.svelte";
    import { router } from "tinro";
    import CoinMod from "./subcomponents/Modals/CoinMod.svelte";
    import type { TagInterface } from "../interfaces/Tags";
    import { GetCoin } from "../services/dbCoin";
    import CoinModal from "./subcomponents/Modals/coinModal.svelte";
    import type { Coin } from "../interfaces/Coin";

    //Variables
    let ID = Number(router.meta().params.id);
    let profile = GetUserProfile(ID, $Token.token);
    let modal:CoinModal;
    let err1
    let err2
    let selectedcoin: Coin;
    let modcoin: Coin ={
        ID: 0,
        name:"",
        worth: 0,
        description: "",
        headfile: "",
        tailfile: "",    
        userID: 0,
        uploadDate: "",
        tags: []
    };
    let tags: Array<TagInterface>=[]; 
    //If the user is admin, then he can promote other users to admin level.
    //If the promoted user is already an admin, then throw an error.
    function Promote(userperm:number){
    if (userperm!=2) {
      Patch($Token.token,"users","ID",ID,{permission:"2"}).then((res)=>{
        err1.showError()
      })
    }
    else{
      err2.showError()
    }
  }
  
  async function handleMessage(event) {
    modcoin=event.detail.Coin;
    await GetTags(modcoin);
	}
  //If the user uploaded a coin, or took a coin for an auction, then update the list of coins and auctions.
  async function handleCoinModUpdate(event) {
    profile = GetUserProfile(ID, $Token.token)
	}
  //If the user selected a coin, get it's tags.
  async function GetTags(Coin:Coin) {
      tags = await Get($Token.token, "tags", "coinID", Coin.ID).then((res)=> res);
    }
</script>

<main>
  <CoinUpload on:success={()=>{profile = GetUserProfile(ID, $Token.token)}}/>
  <div class="col-lg-7 col-md-9 col-11 mx-auto">
    {#await profile}
    <div class="spinner-border"></div>
    {:then ProfileData}
    {#if ProfileData.user.ID == undefined}
    {router.goto('/dashboard')}
    {/if}
      <BanModal User={ProfileData.user} />
      <ErrorAlert bind:this={err1} Error={{id:"promoted",text:"Sikeres Promoció!",error:false}}/>
      <ErrorAlert bind:this={err2} Error={{id:"promoted",text:"Ez a felhasználó már admin!",error:true}}/>
      <div class="profileheader mt-3">
        <div class="d-flex flex-row flex-wrap justify-content-between align-items-end">
          <div>
            <div class="profileimage rounded-circle">
              {#if ProfileData.user.imagefile!=null && ProfileData.user.imagefile!="null"}
              <img src={'http://localhost:8080/img/'+ProfileData.user.imagefile} alt="" class="img-fluid">
              {:else}
              <img src="/tempProfile.jpg" alt="" class="img-fluid">
              {/if}
            </div>
            <h3 class="mb-0 mt-3">{ProfileData.user.name}</h3>
            <h4 class="text-muted mb-0">{ProfileData.user.email}</h4>
          </div>

          {#if ID!=$userPerms.id&&$userPerms.permission==2}
          <div class="dropdown">
            <button class="btn" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi-three-dots"></i></button> <!-- options button -->
            <ul class="dropdown-menu">
              <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#Ban">Kitiltás</button></li>
              <li><button class="dropdown-item" on:click={()=>{Promote(ProfileData.user.permission)}}>Adminokhoz adás</button></li>
            </ul>
          </div>
          {/if}

        </div>
      </div>
      <hr>
      {#if ProfileData.coins.length>0}
      <div class="d-flex justify-content-between align-items-center mb-1">
        <h3>{ProfileData.user.name} érméi</h3>
        {#if ID===$userPerms.id}
          <button class="btn" data-bs-toggle="modal" data-bs-target="#CoinUpload" title="Érem feltöltése"><i class="bi bi-plus-lg"></i></button>
        {/if}
      </div>
      <div class="coins mb-3">
          <div class="d-flex flex-column flex-sm-row justify-content-between">
            {#if ProfileData.coins[0]}
              <ProfileCard on:modcoin={handleMessage} coin={ProfileData.coins[0]} on:click={()=>{selectedcoin = ProfileData.coins[0]}}/>
            {:else}
              <ProfileCard/>
            {/if}
            {#if ProfileData.coins[1]}
              <ProfileCard on:modcoin={handleMessage} coin={ProfileData.coins[1]} on:click={()=>{selectedcoin = ProfileData.coins[1]}}/>
            {:else}
              <ProfileCard />
            {/if}
            {#if ProfileData.coins[2]}
              <ProfileCard on:modcoin={handleMessage} coin={ProfileData.coins[2]} on:click={()=>{selectedcoin = ProfileData.coins[2]}} />
            {:else}
              <ProfileCard />
            {/if}
          </div>
          <a class="btn w-100" id="catalogueBtn" href={`/catalogue/${ProfileData.user.ID}`}>Teljes érmekatalógus megtekintése</a>
      </div>
      {:else}
        {#if $userPerms.id == ID}
          <div class="d-flex justify-content-end align-items-middle mb-1"><button class="btn" data-bs-toggle="modal" data-bs-target="#CoinUpload"><i class="bi bi-plus-lg"></i></button></div>
        {/if}
      {/if}
      {#if ProfileData.auctions.length>0}
      <h3>{ProfileData.user.name} aukciói</h3>
      <div class="auctions mb-3">
        <div class="d-flex flex-column flex-sm-row flex-wrap justify-content-between">
          {#if ProfileData.auctions[0]}
            <ProfileCard auction={ProfileData.auctions[0]} coin={ProfileData.coins.find(e=>e.ID==ProfileData.auctions[0].coinID)} />
            {:else}
            <ProfileCard />
          {/if}
          {#if ProfileData.auctions[1]}
            <ProfileCard auction={ProfileData.auctions[1]} coin={ProfileData.coins.find(e=>e.ID==ProfileData.auctions[1].coinID)} />
            {:else}
            <ProfileCard />
          {/if}
          {#if ProfileData.auctions[2]}
            <ProfileCard auction={ProfileData.auctions[2]} coin={ProfileData.coins.find(e=>e.ID==ProfileData.auctions[2].coinID)} />
            {:else}
            <ProfileCard />
          {/if}
        </div>
      </div>
      {/if}
      {:catch}
      {router.goto("/dashboard")}
    {/await}
    <CoinModal on:mod={()=>{profile = GetUserProfile(ID, $Token.token)}} coin={modcoin}/>
</main>


<style lang="sass">
  h3, h4
    cursor: default
  .auctions, .coins
    border: 1px solid black
    padding: 1rem
    border-radius: 0.25rem
  .img-fluid
    height: 100%
    object-fit: cover
  .profileimage
    height: 100px
    width: 100px
    overflow: hidden
    border: 1px solid black
  #catalogueBtn
    margin-top: 1rem
  #interactionbtn
    height: 100%
  @media screen and (max-width:576px)
    .auctions, .coins
      max-height: calc(175px + 2.5rem)
      overflow: auto
</style>