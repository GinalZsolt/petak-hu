<script lang="ts">
    import { onMount } from "svelte";
    import { Route, meta } from "tinro";
    import AuctionPage from "../components/AuctionPage.svelte";
    import Catalogue from "../components/Catalogue.svelte";
    import BlogPost from "../components/Forum/BlogPost.svelte";
    import Profil from "../components/Profil.svelte";
    import Login from "../components/Login.svelte";
    import Registration from "../components/Registration.svelte";
    import { GetPerms } from "../services/permissionGetter";
    import { userPerms, Routes, Token } from "../stores";
    import Profilmod from "../components/Profilmod.svelte";
    onMount(async ()=>{
        await GetPerms($Token.token).then(data=>{userPerms.update(d=>data)});
        console.log($userPerms);
    })
</script>
{#if $userPerms}
<Route>
    <!--Stores-ban található route-ok-->
    {#each $Routes as route }
        {#if $userPerms.permission>=route.minPermission}
            <Route path={route.url}><svelte:component this={route.component}/></Route>
        {/if}
    {/each}
    <!--Paraméterezett Útvonalak-->
    <Route path="/auctions/:id" let:meta><svelte:component this={AuctionPage} {...{ ID: meta.params.id }} /></Route>
    <Route path="/forums/:id" let:meta><svelte:component this={BlogPost} {...{ ID: meta.params.id }} /></Route>
    <Route path="/profile/:id" let:meta><svelte:component this={Profil} {...{ ID: meta.params.id }} /></Route>
    <Route path="/profilemod" ><svelte:component this={Profilmod}/></Route>
    <Route path="/catalogue/:id" let:meta><svelte:component this={Catalogue} {...{ ID: meta.params.id }} /></Route>
    <Route fallback redirect="/login"/>
    {#if $userPerms.permission==0}
        <Route path="/login"><svelte:component this={Login} /></Route>
        <Route path="/register"><svelte:component this={Registration} /></Route>
        {:else}
        <Route path="/login" redirect="/" />
        <Route path="/register" redirect="/" />
    {/if}
</Route>
{:else}
    <div class="spinner-grow" role="status" id="MainPageLoader"></div>
{/if}
