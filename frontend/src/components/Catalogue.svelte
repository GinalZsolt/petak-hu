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
  <div id="catalogue" class="col-lg-9 col-md-10 col-11 mx-auto mt-5">
    <h4><a  class="btn border-dark" href="/"><i class="bi bi-arrow-left" /></a> {profile.name} katalógusa</h4>
    <div class="input-group  border border-dark rounded mt-3">
      <span class="input-group-text border-dark"
        ><i class="bi bi-search" /></span
      >
      <input type="text" class="form-control border-dark" placeholder="Keresés..." bind:value={searchtext}>
     </div>
    <!--Érme katalógus-->
    <div class="cards row">
      {#if profile.coin_list}
        {#each profile.coin_list.filter(e=>e.name.toLowerCase().includes(searchtext.toLowerCase())) as coin}
          <div class="col-lg-4 col-md-6 col-12 cn" on:click={()=>{PickCoin(coin)}}>
            <CoinCard coin={coin} />
          </div>
        {/each}
      {/if}
    </div>
    <CoinModal bind:this={modal} coin={selectedcoin}/>
  </div>
</main>

<style lang="sass">
    $searchbarColor: #ffcc95
    .btn
      background-color: #e99d60
    .cn
      margin-bottom: 1rem
    .input-group-text
      background-color: $searchbarColor
</style>