<style>

</style>
<script lang="ts">
  import { Auction } from "./classes/Auction";
  import { Coin } from "./classes/Coin";
    import AuctionPage from "./components/AuctionPage.svelte";
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
</script>


<AuctionPage auction={testAuction} />
<BlogPost Data={{author:"mintapista",date:"2023-01-31",title:"Tesztcím a blogposthoz",text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque libero iusto magnam odio at eaque vitae reiciendis, iste quia voluptatem maiores aliquid nesciunt voluptate non maxime alias minus. Odit, optio.",image:"../public/test.png"}}/>
