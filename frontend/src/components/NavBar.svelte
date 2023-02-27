<script lang="ts">
    import {active} from 'tinro';
    import type {User} from '../classes/User';
    import {userPerms, Routes} from '../stores';
    import {GetUserData} from '../services/dbUser';
    import { GetPerms } from '../services/permissionGetter';
    function LogOut():void{
      sessionStorage.removeItem('petakhu');
      GetPerms().then(res=>{
        userPerms.update(d=>res);
      });
      console.log('Bruh');
    }
</script>
    {#if $userPerms}
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Peták.hu</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              {#if $userPerms.permission==0}
                      <li class="nav-item"><a href="/login" class="nav-link" use:active exact>Bejelentkezés</a></li>
                      <li class="nav-item"><a href="/register" class="nav-link" use:active exact>Regisztráció</a></li>
              {/if}
                {#each $Routes as route}
                    {#if $userPerms.permission>=route.minPermission}
                        <li class="nav-item">
                            <a class="nav-link" href={route.url} use:active exact>{route.name}</a>
                        </li>
                    {/if}
                {/each}
            </ul>
            {#if $userPerms.username}
              <ul class="navbar-nav ms-auto me-2">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{$userPerms.username}</a>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <a href={"/profile/"+$userPerms.id} class="dropdown-item">Profilom</a>
                    </li> 
                    <li>
                      <a href={"/profilemod/"} class="dropdown-item">Profil módosítása</a>
                    </li>
                    <li>
                      <a href={"/catalogue/"+$userPerms.id} class="dropdown-item">Érmekatalógusom</a>
                    </li> 
                    <li>
                      <hr class="dropdown-divider">
                    </li>
                    <li>
                      <button class="dropdown-item" on:click={LogOut}>Kijelentkezés</button>
                    </li>
                  </ul>
                </li>
              </ul>
            {/if}
          </div>
        </div>
      </nav>
    {/if}