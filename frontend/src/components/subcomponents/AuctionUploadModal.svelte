<script lang="ts">
import axios from "axios";
    import { onMount } from "svelte";
import {userPerms} from '../../stores';
onMount(()=>{
  console.log($userPerms);
})
function AUCTION_UPLOAD(){
  let isCorrectInput: boolean=true;
  let data={
    'title': document.querySelector('#coin').value != "" ? document.querySelector('#coin').value : isCorrectInput = false,
    'minBid': document.querySelector('#auction_start_value').value !="" ? document.querySelector('#auction_start_value').value : isCorrectInput = false,
    'auction_licit': document.querySelector('#auction_licit').value != "" ? document.querySelector('#auction_licit').value : isCorrectInput = false,
    'description': document.querySelector('#des').value != "" ? document.querySelector('#des').value : isCorrectInput = false
  }

  if(isCorrectInput) {
    /*axios.post('/auctions', {data}).then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });*/
  }
  else alert('A bemeneti adatok hiányosak vagy nem megfelelőek!');
  
  console.log(data);
  console.log(isCorrectInput);
}

</script>

<div class="modal" tabindex="-1" id="auctionupload">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Új aukció létrehozása</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form class="modal-form">
                <div class="form-group">
                  <label for="coin">Aukcióra bocsátandó érme</label>
                  <input type="text" class="form-control" id="coin" aria-describedby="emailHelp" placeholder="" required>
                </div>
                
                <div class="col-md-4 mb-3 mx-w">
                    <label for="auction_start_value">Aukció kezdő értéke</label>
                    <div class="input-group mx-w">
                        <input type="number" class="form-control" id="auction_start_value" placeholder="" aria-describedby="inputGroupPrepend2" required>
                        <div class="input-group-prepend">
                          <span class="input-group-text bg-orange" id="inputGroupPrepend2">Ft</span>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-3 mx-w">
                    <label for="auction-licit">Aukció licitlépcsője</label>
                    <div class="input-group mx-w">
                        <input type="number" class="form-control" id="auction_licit" placeholder="" aria-describedby="inputGroupPrepend2" required>
                        <div class="input-group-prepend">
                          <span class="input-group-text bg-orange" id="inputGroupPrepend2">Ft</span>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-3 mx-w">
                    <label for="auction_start_value">Aukció leírása</label>
                    <textarea name="" id="des" cols="30" class="mx-w" rows="10"></textarea>
                </div>
              </form>
        </div>
        <div class="modal-footer">
          <button type="button" id="CREATE_AUCTION_BTN" on:click={AUCTION_UPLOAD} class="btn btn-primary bg-orange">Létrehozás</button>
        </div>
      </div>
    </div>
  </div>
  
  <style lang="sass">
        .bg-orange
            background-color: #ea9e60
        .modal-form
            width: 20vw
        .mx-w
            width: 100%
  </style>