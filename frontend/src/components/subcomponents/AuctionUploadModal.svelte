<script lang="ts">
  import {userPerms, Token} from '../../stores';
  import {Post} from '../../services/dbQueries';
  import type { Coin } from '../../interfaces/Coin';
  import ErrorAlert from './ErrorAlert.svelte';
  import { router } from 'tinro';
  export let Coin:Coin;
  let data = {
    coinID: Coin.ID,
    userID: $userPerms.id,
    title: "",
    price: Coin.worth,
    minBid: 0,
    description: "",
    expiration: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
  }
  let err1
  function AUCTION_UPLOAD(){
    if(filledForm()){ 
      Post($Token.token, "auctions", data).then(/*res=> router.goto("/auctions/"+ res.insertId)*/);
    }
    else err1.showError();
  }
  function filledForm():boolean{
    return data.title!="" &&data.title!=undefined && data.price!=undefined  && data.minBid>0 && data.description!=""&&data.description!=undefined;
  }
</script>

<div class="modal fade" tabindex="-1" id="auctionupload">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Új aukció létrehozása</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ErrorAlert bind:this={err1} Error={{id:"emptyfields",text:"Nem töltöttél ki minden mezőt!",error:true}}/>
            <form class="modal-form ">
                <div class="mb-3">
                  <label for="coin">Aukcióra bocsátandó érme</label>
                  <input type="text" class="form-control" bind:value={Coin.name} id="coin" disabled>
                </div>
                <div class="mb-3">
                  <label for="coin" >Aukció címe</label>
                  <input type="text" class="form-control" bind:value={data.title} id="coin">
                </div>
                <div class="mb-3">
                    <label for="auction_start_value">Aukció kezdő értéke</label>
                    <div class="input-group mx-w">
                        <input type="number" class="form-control" min={Coin.worth} bind:value={data.price}>
                        <span class="input-group-text bg-orange" >Ft</span>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="auction-licit">Aukció licitlépcsője</label>
                    <div class="input-group mx-w">
                        <input type="number" class="form-control" min="0" bind:value={data.minBid}>
                        <span class="input-group-text bg-orange" >Ft</span>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="auction_start_value">Aukció leírása</label>
                    <textarea class="form-control" bind:value={data.description}></textarea>
                </div>
                <div class="mb-3">
                  <label for="end_date">Aukció vég dátuma: </label>
                  <input type="date" class="form-control" min={data.expiration} on:change={()=>{console.log(data)}} bind:value={data.expiration} id="end_date" placeholder="" aria-describedby="inputGroupPrepend2" required>
                </div>
              </form>
        </div>
        <div class="modal-footer">
          <button type="button" on:click={AUCTION_UPLOAD} class="btn bg-orange">Létrehozás</button>
        </div>
      </div>
    </div>
  </div>
  
  <style lang="sass">
        .bg-orange
          background-color: #ea9e60
        .btn
          border: 0
        .btn:active
          background-color: #ea9e60af
          box-shadow: 0 0 0 0.2rem #ea9e604f
        textarea
          height: 15vh
        .modal-header
          background-color: #f59445
          background-image: linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))  
  </style>