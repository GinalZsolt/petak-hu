<style lang="sass">
    .comment
        border:1px solid black
        border-radius:0.25rem
        background-color: #ffcc95
</style>

<script lang="ts">
    export let Data:any={}
</script>

<div class="comment">
    <div><span>{Data.username}</span><span>{Data.date}</span></div>
    <p>{Data.text}</p>
</div>