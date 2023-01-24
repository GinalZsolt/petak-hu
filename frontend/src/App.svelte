<style lang="sass">
    .container-fluid
        flex: 1 1 auto
    .content
        display: flex
        flex-flow: column
        min-height: 100vh
</style>
<script lang="ts">
    import Navbar from './components/Navbar.svelte';
    import Footer from './components/Footer.svelte';
    import Dashboard from './components/subsites/Dashboard.svelte';
</script>
<div class="content">
    <Navbar/>
    <div class="container-fluid">
        <Dashboard/>
    </div>
    <Footer/>
</div>

