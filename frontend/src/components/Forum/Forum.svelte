<style lang="sass">
    #contentholder
        border:1px solid black
        border-radius:0.25rem
        background-color: #ffcc95
    .btn
        background-color: #e99d60
</style>
<script lang="ts">
    export let Data:any={}
</script>


<main>

    <h1 class="text-center">{Data.title}</h1>
    <div id="contentholder" class="col-lg-8 col-md-8 col-11 mx-auto mb-3 p-3">
        {#each Data.posts as post}
            <div class="post d-flex justify-content-between align-items-center">
                <span>{post.title}</span>
                <div class="d-md-none d-flex flex-column ">
                    <span>{post.date}</span>
                    <span>{post.author}</span>
                </div>
                <span class="d-none d-md-block">{post.date}</span>
                <span class="d-none d-md-block">{post.author}</span>
            </div>
            <hr class="w-100">
        {/each}
    </div>

    <div class="mx-auto w-100 d-flex justify-content-center">
        <div>
            <button class="btn border-dark me-2"><i class="bi bi-arrow-left" /></button> {Data.thispage} / {Data.totalpages} <button class="btn border-dark me-2"><i class="bi bi-arrow-right" /></button>
        </div>
    </div>

</main>