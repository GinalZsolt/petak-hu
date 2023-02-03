<script lang="ts">
    let profile={
        picture: "/test.png",
        name: "test",
        email: "test@test.com",
        coin_list: ["test, test2", "test3"],
        auction_list: ["test", "test2"]
    }
    import { Auction } from "../classes/Auction";
    import { Coin } from "../classes/Coin/Coin";
    import AuctionSlideSm from "./subcomponents/AuctionSlide-sm.svelte";
    import AuctionSlideMdLg from "./subcomponents/AuctionSlide-md-lg.svelte";
    import CoinModal from "./subcomponents/coinModal.svelte";
    let searchText: string = "";
    function mediaQuery(pixels:number):boolean{
    const mediaquery:any = window.matchMedia(`(max-width:${pixels}px)`);
    return mediaquery.matches;
  }
</script>

<main>
    <div class="d-flex">
        <button class="btn border-dark me-2"><i class="bi bi-arrow-left" /></button>
        <h4>{profile.name} katalógus</h4>
    </div>
    <nav class="navbar bg-light">
        <form class="container-fluid">
          <div class="input-group  border border-dark rounded">
            <button class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></button>
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
          </div>
        </form>
    </nav>
    <div class="cards">
        
    </div>
</main>

<style lang="sass">
    main
        background-color: black
        width: 80vw
        height: 100vh
        margin-left: 10vw
    .btn
        background-color: #e99d60
        width: 5vw
    h4
      margin-top: 1vh

</style>