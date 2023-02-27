<script lang="ts">
    import type { Coin } from '../../interfaces/Coin';
    export let Coin: Coin;
  </script>
  <a href="/" class="flexCard"><div class="Card">
    <div class="auctimg d-flex justify-content-center">
      <img
        class="m-auto img-fluid"
        src={"/" + Coin.headfile}
        alt={Coin.name}
      />
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
    export let Coin:any={}
    console.log(Coin)
</script>

<style lang="sass">
    .coinname
        background-color: #B1B2B5
</style>

<div class="col-lg-4 col-md-6 col-12 element">
    <img src={"http://localhost:8080/img/"+Coin.headfile} class="card-img-top image img-fluid mx-auto" alt="...">
    <p class="coinname card-text w-100 ps-2">{Coin.name}</p>
</div>
