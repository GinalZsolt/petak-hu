<script lang="ts">
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