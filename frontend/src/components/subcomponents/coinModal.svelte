<script lang="ts">
  import { Coin } from "../../classes/Coin/Coin";
  import { Auction } from "../../classes/Auction";
  import AuctionSlideSm from "../subcomponents/AuctionSlide-sm.svelte";
  import AuctionSlideMdLg from "../subcomponents/AuctionSlide-md-lg.svelte";
  let searchText: string = "";
  function mediaQuery(pixels: number): boolean {
    const mediaquery: any = window.matchMedia(`(max-width:${pixels}px)`);
    return mediaquery.matches;
  }
</script>
                                  <!-- add meg itt az ID-t! -->
<div class="modal" tabindex="-1" role="dialog"  id="">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header modalpic">
        <!-- Itt add meg a title-t! -->
        <h2 class="modal-title">Lorem</h2>
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
              <!-- Add meg itt a cardokat! -->
            </div>
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
</style>
