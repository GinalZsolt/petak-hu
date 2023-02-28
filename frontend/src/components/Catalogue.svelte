<script lang="ts">
    import CoinCard from "./subcomponents/CoinCard.svelte";
    import type { Coin } from "../classes/Coin/Coin";
    import CoinModal from "./subcomponents/coinModal.svelte";
    import {userPerms, Token} from './../stores';
    import {Get} from '../services/dbQueries';
    import { onMount } from "svelte";
    import { GetUserData } from "../services/dbUser";
    export let ID:number;
    let searchtext:string=""
    let profile={
        name:"",
        coin_list:[] as Coin[],
    }
    let selectedcoin:Coin
    
    async function getCoinList() {
      profile.coin_list = await await Get($Token.token, "coins", "userID", $userPerms.id);
      selectedcoin=profile.coin_list[0]
    }
    onMount(async()=>{
      await GetUserData(ID,$Token.token).then((res)=>{
        profile.name=res[0].name
      })
      await getCoinList();
      console.log(profile.coin_list);
    })
    function PickCoin(pickedid){
      selectedcoin=profile.coin_list.find(x=>x.ID==pickedid)
    }
</script>

<main>
    <div class="d-flex">
        <a  class="btn border-dark me-2" href="/"><i class="bi bi-arrow-left w-auto" /></a>
        <h4>{profile.name} katalógusa</h4>
    </div>
    <nav class="navbar bg-light">
        <form class="container-fluid">
          <div class="input-group  border border-dark rounded">
            <button class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></button>
            <input type="text" class="form-control" bind:value={searchtext}>
          </div>
        </form>
    </nav>
    <!--Érme katalógus-->
    <div class="cards row">
      {#if profile.coin_list}
        {#each profile.coin_list as coin}
          <CoinCard Coin={coin} on:click={()=>{PickCoin(coin.ID)}}/>
        {/each}
      {/if}
    </div>
      <CoinModal Coin={selectedcoin}/>
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
</style>