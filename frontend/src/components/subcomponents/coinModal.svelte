<script lang="ts">
  import type { Coin } from "../../interfaces/Coin";
  import { userPerms, Token } from "../../stores";
  export let coin: Coin;
  import CoinMod from "./CoinMod.svelte";
  import AuctionUploadModal from "./AuctionUploadModal.svelte";
  import { GetAllAuctions } from "../../services/dbAuction";
  import {createEventDispatcher} from 'svelte';
  import { GetUserProfile } from "../../services/dbUser";

  let auctionmodal
  let dispatcher = createEventDispatcher();


  async function CopyLink() {
    await navigator.clipboard.writeText(
      "http://localhost:5173/profile/" + coin.userID
    );
  }
  async function CheckIfCanAuction(coinID: number): Promise<{reason:string, can:boolean}> {
    let auction = await GetAllAuctions($Token.token);
    let user = await GetUserProfile($userPerms.id, $Token.token);
    return await Promise.all([auction, user]).then((res) => {
      return {can:(
        res[1].user.address != null &&
        res[1].user.phone != null &&
        res[0].find((e) => e.coinID == coinID) == undefined &&
        res[1].user.phone!="null"&&
        res[1].user.address!="null"
      ), 
        reason:res[0].find((e) => e.coinID == coinID) == undefined ? "noaddress" : "alreadyonauction"
    };
    });
  }
  export function loadmodal(loadable) {
    coin = loadable;
  }

</script>

{#if coin != undefined}
  <div class="modal fade" tabindex="-1" role="dialog" id="coinmodal">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{coin.name}</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <div
            class="d-flex flex-row w-100 border-dark border rounded-start rounded-end mb-5"
          >
            <button
              class="startBtn btn rounded-0 rounded-start border-0 border-end border-dark fw-bold"
              data-bs-target="#modalslider"
              data-bs-slide="prev"><i class="bi bi-arrow-left" /></button
            >
            <div
              id="modalslider"
              class="carousel slide carousel-fade w-100"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="img">
                    <img
                      class="img-fluid"
                      src={"http://localhost:8080/img/" + coin.headfile}
                      alt=""
                    />
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="img">
                    <img
                      class="img-fluid"
                      src={"http://localhost:8080/img/" + coin.tailfile}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              class="endBtn btn rounded-0 rounded-end border-0 border-start border-dark fw-bold"
              data-bs-target="#modalslider"
              data-bs-slide="next"><i class="bi bi-arrow-right" /></button
            >
          </div>
          <h4>Becsült érték: {coin.worth} Ft</h4>
          <hr />
          <h4>Információk az érméről:</h4>
          {#each coin.description.split("\n") as text}
            <p class="text-break text-wrap">{text}</p>
          {/each}
        </div>
        <div class="modal-footer">
          <div class={"buttons "+ ($userPerms.id==coin.userID) ? "d-flex w-100 justify-content-between" : "" }>
            {#if $userPerms.id && coin.userID}
            {#if ($userPerms.id == coin.userID)}
              <div>
                
                {#await CheckIfCanAuction(coin.ID) then result}
                  {#if result.can}
                    <button
                      type="button"
                      class="btn"
                      on:click={()=>{auctionmodal.loadmodal(coin)}}
                      data-bs-target="#auctionupload"
                      data-bs-toggle="modal">Aukció</button
                    >
                    <button
                      type="button"
                      class="btn"
                      data-bs-target="#CoinMod"
                      data-bs-toggle="modal">Módosítás</button
                    >
                    {:else if result.reason == "noaddress"}
                    <button
                    type="button"
                    class="btn"
                    data-bs-target="#noaddress"
                    data-bs-toggle="collapse">Aukció</button
                    >
                    <button
                      type="button"
                      class="btn"
                      data-bs-target="#CoinMod"
                      data-bs-toggle="modal">Módosítás</button
                    >
                    {:else}
                    <button
                    type="button"
                    class="btn"
                    disabled
                    data-bs-target="#noaddress"
                    data-bs-toggle="collapse">Aukció</button
                    >
                    <button
                      type="button"
                      class="btn"
                      data-bs-target="#CoinMod"
                      data-bs-toggle="modal" disabled={true}>Módosítás</button
                    >
                  {/if}
                {/await}
              </div>
            {/if}
            {/if}
            <div>
              <button type="button" class="btn" data-bs-dismiss="modal">OK</button
              >
              <button class="btn" on:click={CopyLink}><i class="bi bi-share" /></button>
            </div>
          </div>
          {#await CheckIfCanAuction(coin.ID) then result}
            {#if !result.can && result.reason == "noaddress"}
            <div class="collapse w-100" id="noaddress">
              <div class="card bg-danger text-light fw-bold card-body">
                <p class="mb-0">
                  Még nem adott meg elérhetőséget, kérem adja meg a
                </p>
                <p class="mb-0">
                  <a class="link-light" data-bs-dismiss="modal" href="/profilemod">profilmódosításnál!</a>
                </p>
              </div>
            </div>
            {/if}
          {/await}
        </div>
      </div>
    </div>
  </div>
  {#if $userPerms.id == coin.userID}
    <CoinMod on:mod={()=>{dispatcher('mod')}} Coin={coin} />
    <AuctionUploadModal bind:this={auctionmodal} Coin={coin}/>
  {/if}
{/if}

<!--<CoinMod Coin={coin}/>-->
<style lang="sass">
  .btn
    background-color: #ea9e60
    border: 0
  .btn:active
    background-color: #ea9e60bf
  .btn:hover
    background-color: #ea9e60ef
  .img
    height: 300px
    background-color: black
    display: flex
    justify-content: center
  .img-fluid
    object-fit: cover
    height: 100%
  .modal-header
    background-color: #f59445
    background-image: linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))
</style>
