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
    import { db } from "../services/dbForum";
  
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
    /*if (new Date(auction.expiration) < new Date()){
      db  
    }*/
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
    if (auction.price >= originalPrice + auction.minBid && $userPerms.id!=auction.userID) {
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
        <a href="/auctions" class="btn border-dark me-2"><i class="bi bi-arrow-left" /></a>
        <h2 class="mb-0">{auction.userID} - {auction.title}</h2>
      </aside>
      <div class="row mx-auto">
        {#if coin}
        <CoinModal coin={coin} />
        <div class="ps-md-0 col-md-6 col-12 mb-md-0 mb-3" data-bs-target='#_coinmodal' data-bs-toggle="modal">
          <div class="container-fluid h-100" id="AuctionCoin">
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
          {#if new Date(auction.expiration)>new Date()}
          {#if $userPerms.permission>0}
          <h3>Licitálás</h3>
          <div class="d-flex flex-row mb-3">
            <div class="input-group me-lg-3">
              {#if bidders}
              <input
                type="number"
                min={originalPrice}
                step={auction.minBid}
                disabled={auction.userID==$userPerms.id || bidders[0].userID==$userPerms.id}
                bind:value={auction.price}
                name="bidAmount"
                class="form-control border-dark"
              />
              {/if}
              <label for="bidAmount" class={"input-group-text border-dark"+($userPerms.id==auction.userID ? 'disabled' : '')}>Ft</label>
            </div>
            <button class="btn border-dark ms-2" disabled={auction.userID==$userPerms.id || bidders[0].userID==$userPerms.id} on:click={Bid}>Licitálás</button>
          </div>
          <p class="border-bottom border-dark pb-3">
            Licitlépcső: {auction.minBid} Ft
          </p>
          {/if}
          {:else}
          <div class="alert alert-primary">Ennek az aukciónak vége lett!</div>
          {/if}
          <h3>{#if new Date(auction.expiration)<new Date()}Az aukcióra licitáltak{:else}Legutóbbi licitek{/if}</h3>
          <div id="Bidders">
            {#if bidders}
              {#if bidders.length>0}
                {#each bidders as bidder, i}
                  {#if new Date(auction.expiration)<new Date() && i == 0}
                    <p transition:fade>
                      <a class="link-success" href={`/profile/${bidder.userID}`}>{bidder.username} <i class="bi bi-trophy-fill"></i></a> - {new Intl.NumberFormat('hu-HU', {
                      currency:'HUF',
                      style:'currency'
                    }).format(bidder.price) } | {new Intl.DateTimeFormat('hu-HU', {
                      dateStyle:'long',
                    }).format(new Date(bidder.date))} - {bidder.date.split('T')[1].split('.')[0]}
                    </p>
                  {:else}
                    <p transition:fade>
                      <a href={`/profile/${bidder.userID}`}>{bidder.username}</a> - {new Intl.NumberFormat('hu-HU', {
                      currency:'HUF',
                      style:'currency'
                    }).format(bidder.price) } | {new Intl.DateTimeFormat('hu-HU', {
                      dateStyle:'long',
                    }).format(new Date(bidder.date))} - {bidder.date.split('T')[1].split('.')[0]}
                    </p>
                  {/if}
                {/each}
              {:else}
              <h3 class="text-danger">Jelenleg nem érkezett még licit erre az aukcióra!</h3>
              {/if}
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
.disabled
  opacity: 0.65 !important
</style>
