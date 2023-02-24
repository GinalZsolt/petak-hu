<div class={isFirst?"carousel-item active":"carousel-item"}>
    <div class="d-flex">
        {#each Coins as coin, i}
            <AuctionCard Coin={coin[i]} Auction={undefined}/>
        {/each}
    </div>
  </div>
  
  <script lang="ts">
    import type {Coin} from '../../interfaces/Coin';
    import AuctionCard from './AuctionCard.svelte';
    export let Coins:Coin[];
    export let isFirst: boolean;
  </script>