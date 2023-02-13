<script lang="ts">
    //import {Coin} from "../../classes/Coin";
    let editMode:Boolean = false;

    function editModeSet(){
      editMode=!editMode;
      console.log(editMode);
    }

    let test_coin = new Coin({
    ID: 0,
    worth: 11,
    name: "Zseton",
    description: "Zseton leírás",
    headfile: "test.png",
    tailfile: "test.png",
  });
  import { Auction } from "../../classes/Auction";
  import AuctionSlideSm from "../subcomponents/AuctionSlide-sm.svelte";
  import AuctionSlideMdLg from "../subcomponents/AuctionSlide-md-lg.svelte";
  let searchText: string = "";
  function mediaQuery(pixels: number): boolean {
    const mediaquery: any = window.matchMedia(`(max-width:${pixels}px)`);
    return mediaquery.matches;
  }
</script>
  <div>
    <div class="modal" tabindex="-1" role="dialog" id={"coin_"+test_coin.ID}>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header modalpic">
              <h2 class="modal-title">{test_coin.name}</h2>
              <div        
      class="d-flex flex-row w-100 border-dark border rounded-start rounded-end mb-5">
      <button
        class="startBtn btn btn-primary rounded-0 rounded-start border-0 border-end border-dark fw-bold"
        data-bs-target="#modalslider"
        data-bs-slide="prev"><i class="bi bi-arrow-left" /></button>
      <div id="modalslider" class="carousel slide w-100" data-bs-ride="carousel">
        <div class="carousel-inner">
          {#if mediaQuery(576)}
            <AuctionSlideSm Auction={testAuction} isFirst={true} />
            <AuctionSlideSm Auction={testAuction} isFirst={true} />
            {:else if mediaQuery(768)}
            <AuctionSlideMdLg Auctions={[testAuction]} isFirst={true} />
            <AuctionSlideMdLg Auctions={[testAuction]} isFirst={true} />
            {:else}
            <AuctionSlideMdLg Auctions={[testAuction]} isFirst={true}/>
            <AuctionSlideMdLg Auctions={[testAuction]} isFirst={true}/>
          {/if}
        </div>
      </div>
      <button
        class="endBtn btn btn-primary rounded-0 rounded-end border-0 border-start border-dark fw-bold"
        data-bs-target="#modalslider"
        data-bs-slide="next"><i class="bi bi-arrow-right" /></button
      >
    </div>  
            </div>
            {#if editMode}
            <div class="modal-body">
              <h4>Becsült érték: <input type="text" id="coinValue" value={test_coin.worth}> Ft</h4>
              <h4>Leírás</h4>
              <p><textarea name="" id="coinDes" cols="30" rows="10">{test_coin.description}</textarea></p>
            </div>
            <div class="modal-footer">
              <button type="button" on:click={editModeSet} class="btn btn-primary">Mósdosítás</button>
              <button type="button" class="btn btn-primary">Aukció</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
            </div>
            {:else}
            <div class="modal-body">
              <h4>Becsült érték: {test_coin.worth} Ft</h4>
              <h4>Leírás</h4>
              <p>{test_coin.description}</p>
            </div>
            <div class="modal-footer">
              <button type="button" on:click={editModeSet} class="btn btn-primary">Mósdosítás</button>
              <button type="button" class="btn btn-primary">Aukció</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
            </div>
            {/if}
          </div>
          <button
            class="endBtn btn btn-primary rounded-0 rounded-end border-0 border-start border-dark fw-bold"
            data-bs-target="#modalslider"
            data-bs-slide="next"><i class="bi bi-arrow-right" /></button
          >
        </div>
      </div>
      <div class="modal-body">
        <h4>Becsült érték: <!--Ide kell az értéke a zsetonnak! --> Ft</h4>
        <h4>Leírás</h4>
        <p>leírás <!-- Itt add meg a leírást! --></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Mósdosítás</button>
        <button type="button" class="btn btn-primary">Aukció</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
          >OK</button
        >
      </div>
    </div>

<style lang="sass">
    .btn
        background-color: #ea9e60
    .modalpic
        display: flex
        flex-direction: column
        align-items: flex-start
    .modal-header
        height: 32vh
        padding-bottom: 0vh
    input 
      width: 25vw
    textarea
      resize: none
</style>
