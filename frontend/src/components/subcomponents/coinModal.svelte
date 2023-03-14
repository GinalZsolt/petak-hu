<script lang="ts">
  import type { Coin } from "../../interfaces/Coin";
  import { userPerms, Token } from "../../stores";
  export let coin: Coin;
  import CoinMod from "./CoinMod.svelte";
  import AuctionUploadModal from "./AuctionUploadModal.svelte";
  async function CopyLink(){
    await navigator.clipboard.writeText('http://localhost:8080/profile/'+$userPerms.id);
  }
  export function loadmodal(loadable){
    coin=loadable
  }
</script>
{#if coin != undefined}
<div class="modal fade" tabindex="-1" role="dialog" id="coinmodal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">{coin.name}</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div
          class="d-flex flex-row w-100 border-dark border rounded-start rounded-end mb-5"
        >
          <button
            class="startBtn btn btn-primary rounded-0 rounded-start border-0 border-end border-dark fw-bold"
            data-bs-target="#modalslider"
            data-bs-slide="prev"><i class="bi bi-arrow-left" /></button
          >
          <div
            id="modalslider"
            class="carousel slide w-100"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="d-flex justify-content-center imageback">
                  <img class="img-fluid"
                    src={"http://localhost:8080/img/" + coin.headfile}
                    alt=""
                  />
                </div>
              </div>
              <div class="carousel-item">
                <div class="d-flex justify-content-center imageback">
                  <img class="img-fluid"
                  src={"http://localhost:8080/img/" + coin.tailfile}
                  alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            class="endBtn btn btn-primary rounded-0 rounded-end border-0 border-start border-dark fw-bold"
            data-bs-target="#modalslider"
            data-bs-slide="next"><i class="bi bi-arrow-right" /></button
          >
        </div>
        <h4>Becsült érték: {coin.worth} Ft</h4>
        <hr>
        <h4>Információk az érméről:</h4>
        {#each coin.description.split('\n') as text}
          <p>{text}</p>
        {/each}
        </div>
      <div class={`modal-footer ${coin.userID == $userPerms.id ? 'd-flex flex-row justify-content-between': ''}`}>
        {#if coin.userID == $userPerms.id}
          <div>
            <button type="button" class="btn btn-primary" data-bs-target="#CoinMod" data-bs-toggle="modal">Módosítás</button>
            <button type="button" class="btn btn-primary" data-bs-target="#auctionupload" data-bs-toggle="modal">Aukció</button>
          </div>
        {/if}
        <div>
          <button 
            type="button"
            class="btn btn-primary" 
            data-bs-dismiss="modal"
          >
            OK
          </button>
          <button><i class="bi btn bi-share"></i></button>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}
<CoinMod Coin={coin}/>
<AuctionUploadModal/>
<style lang="sass">
  .btn
    background-color: #ea9e60
  .modalpic
    display: flex
    flex-direction: column
    align-items: flex-start
  .imageback
    background-color: black
</style>
