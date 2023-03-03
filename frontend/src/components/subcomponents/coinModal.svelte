<script lang="ts">
  import type { Coin } from "../../interfaces/Coin";
  import { userPerms } from "../../stores";
    import Login from "../Login.svelte";
  export let coin: Coin;
  let editMode=false;
  console.log(coin)
  async function CopyLink(){
    await navigator.clipboard.writeText('http://localhost:8080/profile/'+$userPerms.id);
  }
  export function loadmodal(loadable){
    coin=loadable
  }
  function editmodechange(){
    editMode=!editMode;
    console.log(editMode);
  }
</script>

<div class="modal fade" tabindex="-1" role="dialog" id={"CoinMod"}>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        {#if editMode}
          <input type="text" class="modal-title" bind:value={coin.name}>
        {:else}
          <h2 class="modal-title">{coin.name}</h2>
        {/if}
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
          {#if editMode}
            <button type="button" class="btn btn-primary" on:click={editmodechange}>Módosítás</button>
          {:else}
            <button type="button" class="btn btn-success" on:click={editmodechange}>Módosítás</button>
          {/if}
            <button type="button" class="btn btn-primary">Aukció</button>
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
