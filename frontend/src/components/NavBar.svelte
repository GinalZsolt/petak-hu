<Router url="/">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Peták.hu</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            {#each links as route}
                <li class="nav-item">
                    <Link to={route.url} class={"nav-link"}>{route.name}</Link>
                </li>
            {/each}
            </ul>
          </div>
        </div>
    </nav>
    {#each links as route}
        <Route path={route.url} component={route.component} />
    {/each}
</Router>

<script lang="ts">
    import {Routes} from '../stores';
    import {Router, Link, Route} from 'svelte-routing';
    
    let links = [];
    Routes.subscribe(items=>{
        links = items;
    });
</script>
<style lang="sass">
    main
        flex:1 1 auto
</style>