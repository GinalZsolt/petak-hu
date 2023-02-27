<script lang="ts">
    import type { Coin } from '../../interfaces/Coin';
    export let Coin: Coin;
</script>
    
<a href="/" class="flexCard"><div class="Card">
  <div class="auctimg d-flex justify-content-center">
    <img class="m-auto img-fluid" src={"http://localhost:8080/img/" + Coin.headfile} alt={Coin.name} />
  </div>
  <div
    class="bottomText d-flex flex-wrap justify-content-between text-light overflow-hidden px-1"
  >
    <p class="my-0 py-0">
      {
      Coin.name.substring(0, 15) == Coin.name
        ? Coin.name
        : Coin.name.substring(0, 15) + "..."
      }
    </p>
    <p class="my-0 py-0">{Coin.worth} Ft</p>
  </div>
</div></a>

  <style lang="sass">
      .coinname
        background-color: #B1B2B5
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
