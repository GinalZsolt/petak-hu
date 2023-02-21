<script lang="ts">
  import { io } from "socket.io-client";
  import type { Auction, Bidder } from "../interfaces/Auction";
  import {
    GetAuctionData,
    GetBidders,
    PostNewAuctionPrice,
    PostNewBidder,
  } from "../services/dbAuction";
  import { Token, userPerms } from "../stores";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import type { Coin } from "../interfaces/Coin";
    import { GetCoin } from "../services/dbCoin";
    import CoinModal from "./subcomponents/coinModal.svelte";
  
  export let ID: number;
  
  let coin:Coin;
  let auction: Auction;
  let bidders: Bidder[];
  let originalPrice: number;
  let room = "auction-" + ID;


  onMount(async () => {
    bidders = (await GetBidders($Token.token, ID)).sort((a,b)=>new Date(a.date)<new Date(b.date));
    auction = await GetAuctionData($Token.token, ID);
    originalPrice = await (await GetAuctionData($Token.token, ID)).price;
    coin = (await GetCoin(auction.coinID, $Token.token));
    console.log(await GetCoin(auction.coinID, $Token.token));
    console.log(originalPrice+auction.minBid);
  });

  const socket = io("ws://localhost:8080");
  socket.emit("roomJoin", "auction-" + ID);
  socket.on("newPrice", async (data) => {
    auction.price = data;
    originalPrice = data;
    bidders = (await GetBidders($Token.token, ID)).sort((a,b)=>new Date(a.date)<new Date(b.date));
  });

  function Bid() {
    console.log(auction.price);
    if (auction.price >= originalPrice + auction.minBid) {
      PostNewAuctionPrice($Token.token, ID, auction.price).then(
        () => {
          PostNewBidder($Token.token, {
            amount: auction.price,
            auctionID: ID,
            userID: $userPerms.id,
            date: new Date().toISOString(),
          }).then(() => {
            socket.emit("bid", auction.price, room);
          });
        }
      );
    }
  }
</script>

<main>
  {#if auction}
    <div class="col-11 mx-auto mt-5">
      <aside class="d-block mb-4 d-flex flex-row align-items-center">
        <button class="btn border-dark me-2"><i class="bi bi-arrow-left" /></button>
        <h2 class="mb-0">{auction.userID} - {auction.title}</h2>
      </aside>
      <div class="row mx-auto">
        {#if coin}
        <CoinModal coin={coin} />
        <div class="ps-md-0 col-md-6 col-12 mb-md-0 mb-3" data-bs-target='#coin_' data-bs-toggle="modal">
          <div class="w-100 h-100" id="AuctionCoin">
            <img class="img-fluid h-100" src={'http://localhost:8080/img/'+coin.headfile} alt="" />
          <p class="w-100 px-2" id="title">{auction.title}</p>
          </div>
        </div>
        {:else}
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        {/if}
        <div class="col-md-6 col-12 pe-md-0">
          <h3>Licitálás</h3>
          <div class="d-flex flex-row mb-3">
            <div class="input-group me-lg-3">
              <input
                type="number"
                min={originalPrice}
                step={auction.minBid}
                
                bind:value={auction.price}

                name="bidAmount"
                class="form-control border-dark"
              />
              <label for="bidAmount" class="input-group-text border-dark">Ft</label>
            </div>
            <button class="btn border-dark ms-2" on:click={Bid}>Licitálás</button>
          </div>
          <p class="border-bottom border-dark pb-3">
            Licitlépcső: {auction.minBid} Ft
          </p>
          <h3>Legutóbbi licitek</h3>
          <div id="Bidders">
            {#if bidders}
              {#each bidders as bidder}
                <p transition:fade>{bidder.username} - {bidder.price} Ft | {new Intl.DateTimeFormat('hu-HU', {
                  dateStyle:'long',
                }).format(new Date(bidder.date))} - {bidder.date.split('T')[1].split('.')[0]}</p>
              {/each}
              {:else}
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
            {/if}
          </div>
        </div>
      </div>
      <hr class="my-3" />
      <div class="mx-auto">
        <h3>Az aukcióról:</h3>
        {#each auction.description.split("\n") as line}
          <p>{line}</p>
        {/each}
        <hr>
        {#if coin}
        <h3>Az érméről:</h3>
        {#each coin.description.split("\n") as line}
          <p>{line}</p>
        {/each}
        {/if}
      </div>
    </div>
    
    {:else}
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  {/if}
</main>

<style lang="sass">
hr
  background-color: --bs-dark
#Bidders
  max-height: 150px
  overflow: auto
#AuctionCoin
  border-radius: 0.25rem
  display: flex
  flex-flow: row wrap
  justify-content: center
  background-color: black
  position: relative
  overflow: hidden
  img
    border: 1px solid black
.input-group-text
  background-color: #e99d60
#title
  margin-bottom: 0
  position: absolute
  top: calc( 100% - 24px )
  left: 0
  color: white
  background: #ffffff54
.btn
  background-color: #e99d60
</style>
