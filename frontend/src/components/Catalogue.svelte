<script lang="ts">
  import CoinCard from "./subcomponents/Cards/CoinCard.svelte";
  import type { Coin } from "../interfaces/Coin";
  import CoinModal from "./subcomponents/Modals/coinModal.svelte";
  import {Token, userPerms} from './../stores';
  import { onMount } from "svelte";
  import { GetUserData } from "../services/dbUser";
  import { router } from "tinro";
  import CoinUpload from "./subcomponents/Modals/CoinUpload.svelte";
  import { GetUserCoins } from "../services/dbCoin";
  //variables.  
  let ID = Number(router.meta().params.id);
    let modal
    let searchtext:string=""
    let profile={
        name:"",
        coin_list:[] as Coin[],
    }
    let selectedcoin:Coin
  //Get the users coins from the backend.
    async function getCoinList() {
      profile.coin_list = await GetUserCoins($Token.token, ID);
      selectedcoin=profile.coin_list[0]
    }
  //on loading get all of the user's data.
  //if the user doesn't exist, then go back to the proper site. 
  //(non-registered users go to login, logged-in users go back to the dashboard).
    onMount(async()=>{
      await GetUserData(ID,$Token.token).then((res)=>{
        if (res[0]){
          profile.name=res[0].name
        }
        else router.goto('/dashboard');
      }).catch(()=>router.goto('/dashboard'));
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
      <h4><a  class="btn border-dark" href={"/profile/"+ID}><i class="bi bi-arrow-left" /></a> {profile.name} katalógusa</h4>
      {#if ID == $userPerms.id}
      <button data-bs-target="#CoinUpload" title="Érem feltöltése" data-bs-toggle="modal" class="btn"><i class="bi bi-plus-lg"></i></button>
      {/if}
    </div>
    {#if profile.coin_list}
    {#if profile.coin_list.length>0}
    <div class="input-group  border rounded mt-3">
      <span class="input-group-text border-dark"><i class="bi bi-search" /></span>
      <input type="text" class="form-control border-dark" placeholder="Keresés..." bind:value={searchtext}>
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
        {#each profile.coin_list
                  .filter(e=>
                    e.tags.filter(h=>h.description.toLowerCase().includes(searchtext.toLowerCase())).length>0
                    || e.name.toLowerCase().includes(searchtext.toLowerCase())) as coin}
          <div class="col-lg-4 col-md-6 col-12 cn" on:click={()=>{PickCoin(coin)}} on:keypress={()=>{}}>
            <CoinCard coin={coin} />
          </div>
        {/each}
    </div>
    {/if}
    <CoinModal bind:this={modal} on:mod={()=>getCoinList()} coin={selectedcoin}/>
    <CoinUpload on:success={async()=>{await getCoinList()}}/>
  </div>
</main>

<style lang="sass">
    .input-group-text
      background-color: #e99d60
    .cn
      margin-bottom: 1rem
    .link-primary
      cursor: pointer
    .input-group-text
      background-color: #e99d60
</style>