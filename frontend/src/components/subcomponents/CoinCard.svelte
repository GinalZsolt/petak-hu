<script lang="ts">
    import type { Coin } from '../../classes/Coin/Coin';
    import Profil from '../Profil.svelte';
    import CoinModal from './coinModal.svelte';
    export let coin: Coin;
    console.log(coin)
</script>
    
<a href="#" class="flexCard"  data-bs-target={"#cmodal"} data-bs-toggle="modal">
    <div class="Card">
    <div class="auctimg d-flex justify-content-center">
    <img class="m-auto img-fluid" src={"http://localhost:8080/img/" + coin.images.headfile} alt={coin.name} />
</div>
        <div
        class="bottomText d-flex flex-wrap justify-content-between text-light overflow-hidden px-1"
        >
        <p class="my-0 py-0">
        {
          coin.name.substring(0, 15) == coin.name
          ? coin.name
          : coin.name.substring(0, 15) + "..."
        }
        </p>
        <p class="my-0 py-0">{coin.worth} Ft</p>
      </div>
    </div>
</a>
  <style lang="sass">
      a
        color: white
        text-decoration: none
      .flexCard
        flex: 1 1 auto
        border-left: 1px solid white
        border-right: 1px solid white
      .Card
        height: 100%
        position: relative
      .auctimg
        background-color: #000
      .bottomText
        position: absolute
        top: calc(100% - 24px)
        width: 100%
        max-height: 24px
        background-color: #000000b3
  </style>
