<style lang="sass">
    .comment
        border:1px solid black
        border-radius:0.25rem
        background-color: #ffcc95
        padding:10px
        text-align: justify
    p
        margin-bottom:0
</style>

<script lang="ts">
    export let Data:any={}
</script>

<div class="comment col-lg-8 col-md-8 col-11 mx-auto mt-3" >
    <div><span>{Data.username}</span><span class="ms-3">{new Intl.DateTimeFormat('hu-HU').format(new Date(Data.date))}</span></div>
    <p>{Data.text}</p>
</div>
