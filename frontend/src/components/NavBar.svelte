<script lang="ts">
    import { active } from 'tinro';
    import {Permission} from '../stores';
    import type {URL} from '../interfaces/URL';
    import {Routes} from '../stores';
    let Links:URL[] = $Routes;
    let userPermission = $Permission.permission;
    Permission.subscribe(data=>{
        userPermission = data.permission;
    })
    
</script>
<nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
        <a href="#" class="navbar-brand border-end border-dark border-2 pe-2">Peták.hu</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#petakNavbar"><i class="bi bi-list"></i></button>
        <div class="collapse navbar-collapse" id="petakNavbar">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                {#each Links as route}
                    {#if userPermission>=route.minPermission}
                        <li class="nav-item">
                            <a href={route.url} class="nav-link" use:active exact>{route.name}</a>
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
    </div>
</nav>