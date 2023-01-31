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