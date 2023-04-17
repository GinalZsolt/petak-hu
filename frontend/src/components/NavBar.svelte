<script lang="ts">
    import {active, router} from 'tinro';
    import {userPerms, Routes} from '../stores';
    import { GetPerms } from '../services/permissionGetter';
    function LogOut():void{
      sessionStorage.removeItem('petakhu');
      GetPerms().then(res=>{
        userPerms.update(d=>res);
      });
    }
    function GoToMyProfile(){
      router.goto('/dashboard');
      router.goto('/profile/'+$userPerms.id);
    }
</script>
<style lang="sass">
  nav
    background-color: #f59445
</style>
    {#if $userPerms}
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Peták.hu</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              {#if $userPerms.permission==0}
                      <li data-bs-toggle="collapse" data-bs-target="#navbarNav" class="nav-item"><a href="/login" class="nav-link" use:active exact>Bejelentkezés</a></li>
                      <li data-bs-toggle="collapse" data-bs-target="#navbarNav" class="nav-item"><a href="/register" class="nav-link" use:active exact>Regisztráció</a></li>
              {/if}
                {#each $Routes as route}
                    {#if $userPerms.permission>=route.minPermission && route.showInNavbar == true}
                        <li class="nav-item" >
                            <a data-bs-toggle="collapse" data-bs-target="#navbarNav" class="nav-link" href={route.url} use:active exact>{route.name}</a>
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
                      <a data-bs-toggle="collapse" data-bs-target="#navbarNav" href={"/profile/"+$userPerms.id} class="dropdown-item">Profilom</a>
                    </li> 
                    <li>
                      <a data-bs-toggle="collapse" data-bs-target="#navbarNav" href={"/profilemod/"} class="dropdown-item">Profil módosítása</a>
                    </li>
                    <li>
                      <a data-bs-toggle="collapse" data-bs-target="#navbarNav" href={"/catalogue/"+$userPerms.id} on:click={GoToMyProfile} class="dropdown-item">Érmekatalógusom</a>
                    </li> 
                    <li>
                      <hr class="dropdown-divider">
                    </li>
                    <li>
                      <button data-bs-toggle="collapse" data-bs-target="#navbarNav" class="dropdown-item" on:click={LogOut}>Kijelentkezés</button>
                    </li>
                  </ul>
                </li>
              </ul>
            {/if}
          </div>
        </div>
      </nav>
    {/if}