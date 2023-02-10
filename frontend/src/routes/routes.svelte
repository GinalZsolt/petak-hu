<script lang="ts">
    import {meta, Route} from 'tinro';
    import {onMount} from 'svelte';
    import { Routes, Token, Permission } from '../stores';
    import type { URL } from '../interfaces/URL';
    import Profil from '../components/Profil.svelte';
    import Catalogue from '../components/Catalogue.svelte';
    import AuctionPage from '../components/AuctionPage.svelte';
    import BlogPost from '../components/Forum/BlogPost.svelte';
    import { GetPerms } from '../services/permissionGetter';
    let routes:Array<URL>;
    let permission = $Permission.permission;
    Permission.subscribe(data=>{
        permission = data.permission;
    })
    onMount(async ()=>{
        let tkn = await GetPerms($Token.token);
        Permission.update(perm=>tkn);
    })
    Routes.subscribe(data=>{
        routes = data;
    });
</script>


{#each routes as route}
    {#if permission>=route.minPermission}
        <Route path={route.url}><svelte:component this={route.component}/></Route>
    {/if}
{/each}

<Route path="/profile/:id" let:meta><Profil ID={meta.params.id}/></Route>
<Route path="/catalogue/:id" let:meta><Catalogue ID={meta.params.id}/></Route>
<Route path="/auction/:id" let:meta><AuctionPage ID={meta.params.id}/></Route>

{#if permission>=1}
<Route path="/forums/:id" let:meta><BlogPost ID={meta.params.id}/></Route>
{/if}