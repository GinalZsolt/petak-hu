<script lang="ts">
    import CoinCard from "./subcomponents/CoinCard.svelte";
    import type { Coin } from "../interfaces/Coin";
    import CoinModal from "./subcomponents/coinModal.svelte";
    import {Token, userPerms} from './../stores';
    import {Get} from '../services/dbQueries';
    import { onMount } from "svelte";
    import { GetUserData } from "../services/dbUser";
    import { router } from "tinro";
  import CoinUpload from "./subcomponents/CoinUpload.svelte";
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
  <div id="catalogue" class="col-lg-9 col-md-10 col-11 mx-auto mt-5">
    <div class="d-flex justify-content-between align-items-center">
      <h4><a  class="btn border-dark" href="/"><i class="bi bi-arrow-left" /></a> {profile.name} katalógusa</h4>
      {#if ID == $userPerms.id}
      <button data-bs-target="#CoinUpload" data-bs-toggle="modal" class="btn"><i class="bi bi-plus-lg"></i></button>
      {/if}
    </div>
    {#if profile.coin_list}
    {#if profile.coin_list.length>0}
    <div class="input-group  border border-dark rounded mt-3">
      <span class="input-group-text border-dark"><i class="bi bi-search" /></span>
      <input type="text" class="form-control" placeholder="Keresés..." bind:value={searchtext}>
    </div>
    {:else}
    <div class="text-center my-5">
      {#if $userPerms.id == ID}
      <h2>Még nincs feltöltve érme a katalógusába!</h2>
      <h3><span data-bs-target="#CoinUpload" data-bs-toggle="modal" class="link-primary">Töltsön fel</span> egyet!</h3>
      {:else}
      <h2>{profile.name} még nem töltött fel zsetonokat!</h2>
      {/if}
    </div>
    {/if}
    <!--Érme katalógus-->
    <div class="cards row">
        {#each profile.coin_list.filter(e=>e.name.toLowerCase().includes(searchtext.toLowerCase())) as coin}
          <div class="col-lg-4 col-md-6 col-12 cn" on:click={()=>{PickCoin(coin)}} on:keypress={()=>{}}>
            <CoinCard coin={coin} />
          </div>
        {/each}
    </div>
    {/if}
    <CoinModal bind:this={modal} coin={selectedcoin}/>
    <CoinUpload on:success={async()=>{await getCoinList()}}/>
  </div>
</main>

<style lang="sass">
    .input-group-text
      background-color: #e99d60
    .btn
      background-color: #e99d60
      border: 0
    .btn:hover
      background-color: #e99d60bf
    .btn:active
      background-color: #e99d609f
      box-shadow: 0 0 0.25rem #e99d60
    .cn
      margin-bottom: 1rem
    .link-primary
      cursor: pointer
    .input-group-text
      background-color: #e99d60
</style>