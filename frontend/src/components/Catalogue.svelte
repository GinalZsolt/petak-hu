<script lang="ts">
    let profile={
        picture: "/test.png",
        name: "test",
        email: "test@test.com",
        coin_list: ["test, test2", "test3"],
        auction_list: ["test", "test2"]
    }
    import { Auction } from "../classes/Auction";
    import { Coin } from "../classes/Coin";
    import AuctionSlideSm from "./subcomponents/AuctionSlide-sm.svelte";
    import AuctionSlideMdLg from "./subcomponents/AuctionSlide-md-lg.svelte";
    import CoinModal from "./subcomponents/coinModal.svelte";
    let searchText: string = "";
    let testAuction: Auction = new Auction({
    ID: 0,
    price: 11,
    title: "Lorem",
    minBid: 50,
    description: "Lorem ipsum dolor sit amet",
    expiration: new Date(),
  });
  testAuction.coin = new Coin({
    ID: 0,
    worth: 11,
    name: "Zseton",
    description: "Zseton leírás",
    headfile: "test.png",
    tailfile: "test.png",
  });
    function mediaQuery(pixels:number):boolean{
    const mediaquery:any = window.matchMedia(`(max-width:${pixels}px)`);
    return mediaquery.matches;
  }
  let test_array = [testAuction, testAuction, testAuction, testAuction];
</script>

<main>
    <div class="d-flex">
        <button class="btn border-dark me-2"><i class="bi bi-arrow-left w-auto" /></button>
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
    <!--Érme katalógus-->
    <div class="cards row">
      {#each test_array as coin}
      <div class="col-lg-4 col-md-6 col-12 element">
        <div class="card p-0">
          <img src={"/"+coin.coin.images.tail} class="card-img-top image img-fluid mx-auto" alt="...">
          <div class="card-body bg-grey">
            <p class="card-text">{coin.coin.description}</p>
          </div>
        </div>
      </div>
      {/each}
    </div>

</main>

<style lang="sass">
    main
        background-color: white
        width: 80vw
        height: 100vh
        margin-left: 10vw
    .btn
        background-color: #e99d60
        width: 5vw
    h4
      margin-top: 1vh
    .w-auto
      width: auto
    .bg-grey
      background-color: lightgrey 
      padding: 0px
      font-size: 14pt
      text-align: center
    .image 
      height: auto
      width: 20vw
    .element
      margin-bottom: 2%
</style>