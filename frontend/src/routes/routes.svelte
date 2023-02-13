<script lang="ts">
    import { onMount } from "svelte";
    import { Route, meta } from "tinro";
    import AuctionPage from "../components/AuctionPage.svelte";
    import Catalogue from "../components/Catalogue.svelte";
    import BlogPost from "../components/Forum/BlogPost.svelte";
    import Profil from "../components/Profil.svelte";
    import { GetPerms } from "../services/permissionGetter";
    import { userPerms, Routes, Token } from "../stores";
    onMount(()=>{
        GetPerms($Token.token).then(data=>{userPerms.update(d=>data)});
    })
</script>
{#if $userPerms}
<Route>
    {#each $Routes as route }
        {#if $userPerms.permission>=route.minPermission}
            <Route path={route.url}><svelte:component this={route.component}/></Route>
        {/if}
    {/each}
    <Route path="/auctions/:id" let:meta><svelte:component this={AuctionPage} {...{ ID: meta.params.id }} /></Route>
    <Route path="/forums/:id" let:meta><svelte:component this={BlogPost} {...{ ID: meta.params.id }} /></Route>
    <Route path="/profile/:id" let:meta><svelte:component this={Profil} {...{ ID: meta.params.id }} /></Route>
    <Route path="/catalogue/:id" let:meta><svelte:component this={Catalogue} {...{ ID: meta.params.id }} /></Route>
    <Route fallback redirect="/login"/>
</Route>
{:else}
    <div class="spinner-grow" role="status" id="MainPageLoader"></div>
{/if}
