<script lang="ts">
    import {active} from 'tinro';
    import {userPerms, Routes} from '../stores';
</script>

<nav>
    {#if $userPerms}
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Peták.hu</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                {#each $Routes as route}
                    {#if $userPerms.permission>=route.minPermission}
                        <li class="nav-item">
                            <a class="nav-link" href={route.url} use:active exact>{route.name}</a>
                        </li>
                    {/if}
                {/each}
            </ul>
          </div>
        </div>
      </nav>
    {/if}
</nav>