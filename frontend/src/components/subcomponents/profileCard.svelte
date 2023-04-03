<script lang="ts">
    import type { Auction } from "../../interfaces/Auction";
    import type { Coin } from "../../interfaces/Coin";
    export let coin: Coin | undefined;
    export let auction: Auction | undefined;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sendCoin() {
        dispatch('modcoin', {
			Coin: coin
		});
	}

</script>
<style lang="sass">
    .card, .empty
        height: 175px
        position: relative
        width: calc(33% - 1.25rem)
        overflow: hidden
    .card
        background-color: #000000
        display: flex
        align-items: center
        justify-content: center
        cursor: pointer
        img
            height: 100%
    .bottomText
        width: 100%
        position: absolute
        top: calc(100% - 1.5rem)
        background-color: #000000af
        color: white
</style>


{#if auction}
<a href={`/auctions/${auction.ID}`} class="card" on:click={sendCoin}>
    <div>
        {#if coin}
        <img src={`http://localhost:8080/img/${coin.headfile}`} alt="">
        {/if}
    </div>
    <div class="bottomText">
        <span>{auction ? auction.title : coin.name}</span>
        
    </div>
</a>
{:else if coin}
<div class="card" data-bs-target="#coinmodal" data-bs-toggle="modal" on:click={sendCoin} on:keypress={()=>{}}>
    <div>
        <img src={`http://localhost:8080/img/${coin.headfile}`} alt="">
    </div>
    <div class="bottomText">
        <span>{auction ? auction.title : coin.name}</span>

        </div>
    </div>
    {:else}
<div class="empty"></div>
{/if}