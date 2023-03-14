<script lang="ts">
    import { onMount } from "svelte";
    import { Route, meta } from "tinro";
    import { GetPerms } from "../services/permissionGetter";
    import { userPerms, Routes, Token } from "../stores";
    import Lazyloading from "./lazyloading.svelte";
    
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
            <Route path={route.url}><Lazyloading component={import(route.component)}/></Route>
        {/if}
    {/each}
    <!--Paraméterezett Útvonalak-->
    <Route path="/auctions/:id"><Lazyloading component={()=>import('../components/AuctionPage.svelte')}/></Route>
    <Route path="/forums/:id"><Lazyloading component={()=>import('../components/Forum/BlogPost.svelte')}/></Route>
    <Route path="/profile/:id"><Lazyloading component={()=>import('../components/Profil.svelte')}/></Route>
    <Route path="/profilemod"><Lazyloading component={()=>import('../components/Profilmod.svelte')}/></Route>
    <Route path="/catalogue/:id"><Lazyloading component={()=>import('../components/Catalogue.svelte')}/></Route>
    <Route fallback redirect="/login"/>
        {#if $userPerms.permission==0}
        <Route path="/login"><Lazyloading component={()=>import('../components/Login.svelte')}/></Route>
        <Route path="/register"><Lazyloading component={()=>import('../components/Registration.svelte')}/></Route>
        {:else}
        <Route path="/login" redirect="/" />
        <Route path="/register" redirect="/" />
    {/if}
</Route>
{:else}
    <div class="spinner-grow" role="status" id="MainPageLoader"></div>
{/if}
