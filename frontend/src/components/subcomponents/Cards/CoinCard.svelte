<script lang="ts">
    import type { Coin } from '../../../interfaces/Coin';
    export let coin: Coin;
    console.log(coin)
</script>
    
<a href="#" class="flexCard" data-bs-target="#coinmodal" data-bs-toggle="modal">
    <div class="Card">
      <div class="auctimg d-flex justify-content-center">
      <img class="m-auto img-fluid" src={"http://localhost:8080/img/" + coin.headfile} alt={coin.name} />
    </div>
    <div class="bottomText d-flex flex-wrap justify-content-between text-light overflow-hidden px-1">
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
      .Card  
        border: 1px solid black
        overflow: hidden
        border-radius: 0.25rem
      a
        color: white
        text-decoration: none
      .flexCard
        flex: 1 1 auto
        border-left: 1px solid white
        border-right: 1px solid white
      .Card
        height: 300px
        position: relative
      .auctimg
        background-color: #000
        height: 100%
        img
          height: 100%
          object-fit: cover
      .bottomText
        position: absolute
        top: calc(100% - 24px)
        width: 100%
        max-height: 24px
        background-color: #000000b3
  </style>
