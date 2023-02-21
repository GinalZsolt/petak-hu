<script lang="ts">
    let profile={
        picture: "/test.png",
        name: "test",
        email: "test@test.com",
        coin_list: [],
        auction_list: ["test", "test2"]
    }
    import type { Coin } from "../classes/Coin/Coin";
    import AuctionSlideSm from "./subcomponents/AuctionSlide-sm.svelte";
    import AuctionSlideMdLg from "./subcomponents/AuctionSlide-md-lg.svelte";
    import CoinModal from "./subcomponents/coinModal.svelte";
    import {userPerms, Token} from './../stores';
    import {Get, Post, Patch, Delete} from '../services/dbQueries';
    import { onMount } from "svelte";
    export let ID:number;

    async function getCoinList() {
      profile.coin_list = await await Get($Token.token, "coins", "userID", $userPerms.id);
    }
    onMount(async()=>{
      await getCoinList();
      console.log(profile.coin_list);
    })
</script>

<main>
    <div class="d-flex">
        <button class="btn border-dark me-2"><i class="bi bi-arrow-left w-auto" /></button>
        <h4>{profile.name} katalógus</h4>
    </div>
    <nav class="navbar bg-light">
        <form class="container-fluid">
          <div class="input-group  border border-dark rounded">
            <button class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></button>
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
          </div>
        </form>
    </nav>
    <!--Érme katalógus-->
    <div class="cards row">
      {#if profile.coin_list}
      {#each profile.coin_list as coin}
      <div class="col-lg-4 col-md-6 col-12 element">
        <div class="card p-0">
          <img src={"http://localhost:8080/img/"+coin.headfile} class="card-img-top image img-fluid mx-auto" alt="...">
          <div class="card-body bg-grey">
            <p class="card-text">{coin.description}</p>
          </div>
        </div> 
      </div>
      {/each}
      {/if}
    </div>

</main>

<style lang="sass">
    main
        background-color: white
        width: 80vw
        height: 100vh
        margin-left: 10vw
    .btn
        background-color: #e99d60
        width: 5vw
    h4
      margin-top: 1vh
    .w-auto
      width: auto
    .bg-grey
      background-color: lightgrey 
      padding: 0px
      font-size: 14pt
      text-align: center
    .image 
      height: auto
      width: 20vw
    .element
      margin-bottom: 2%
</style>