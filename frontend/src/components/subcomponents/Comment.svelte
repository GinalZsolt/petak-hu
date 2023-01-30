<style lang="sass">
    .comment
        border:1px solid black
        border-radius:0.25rem
        background-color: #ffcc95
        padding:20px
</style>

<script lang="ts">
    export let Data:any={}
</script>

<div class="comment col-lg-8 col-md-8 col-11 mx-auto">
    <div><span>{Data.username}</span><span class="ms-3">{Data.date}</span></div>
    <p>{Data.text}</p>
</div>
