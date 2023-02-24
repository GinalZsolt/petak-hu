<script lang="ts">
    import AdminboardCard from "./subcomponents/AdminboardCard.svelte";



</script>
<style lang="sass">

</style>

<main>
    <h2>Adminisztráció</h2>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <AdminboardCard CardData={{modalName:"latogatok",title:"Látogatók száma",icon:"person",fromColor:"#ea9e60",toColor:"#eb6a00"}} />
            </div>
            <div class="col-6">
                <AdminboardCard CardData={{modalName:"ermek",title:"Érmék",icon:"coin",fromColor:"#ea9e60",toColor:"#eb6a00"}} />
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <AdminboardCard CardData={{modalName:"tiltott",title:"Kitiltott Felhasználók",icon:"person-exclamation",fromColor:"#ea9e60",toColor:"#eb6a00"}} />
            </div>
            <div class="col-6">
                <AdminboardCard CardData={{modalName:"aukciok",title:"Aukciók",icon:"database",fromColor:"#ea9e60",toColor:"#eb6a00"}} />
            </div>
        </div>
    </div>
</main>