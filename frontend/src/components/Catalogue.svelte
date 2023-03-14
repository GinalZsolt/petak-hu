<script lang="ts">
    import CoinCard from "./subcomponents/CoinCard.svelte";
    import type { Coin } from "../interfaces/Coin";
    import CoinModal from "./subcomponents/coinModal.svelte";
    import {Token} from './../stores';
    import {Get} from '../services/dbQueries';
    import { onMount } from "svelte";
    import { GetUserData } from "../services/dbUser";
    import { router } from "tinro";
    let ID = Number(router.meta().params.id);
    let modal
    let searchtext:string=""
    let profile={
        name:"",
        coin_list:[] as Coin[],
    }
    let selectedcoin:Coin
    
    async function getCoinList() {
      profile.coin_list = await await Get($Token.token, "coins", "userID", ID);
      selectedcoin=profile.coin_list[0]
    }
    onMount(async()=>{
      await GetUserData(ID,$Token.token).then((res)=>{
        profile.name=res[0].name
      })
      await getCoinList();
      modal.loadmodal(profile.coin_list[0])
      console.log(profile.coin_list);
    })
    function PickCoin(picked){
      modal.loadmodal(picked)
      console.log(picked)
    }
</script>

<main>
    <div class="d-flex">
        <a  class="btn border-dark me-2" href="/"><i class="bi bi-arrow-left w-auto" /></a>
        <h4>{profile.name} katalógusa</h4>
    </div>
    <div class="input-group  border border-dark rounded mt-3">
      <button class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></button>
      <input type="text" class="form-control" bind:value={searchtext}>
     </div>
    <!--Érme katalógus-->
    <div class="cards row">
      {#if profile.coin_list}
        {#each profile.coin_list.filter(e=>e.name.toLowerCase().includes(searchtext.toLowerCase())) as coin}
          <div class="col-lg-4 col-md-6 col-12" on:click={()=>{PickCoin(coin)}}>
            <CoinCard coin={coin} />
          </div>
        {/each}
      {/if}
    </div>
    <CoinModal bind:this={modal}/>
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