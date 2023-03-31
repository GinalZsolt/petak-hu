<main>
    <div class="col-11 mx-auto mt-3" id="cards">
        <h1>Üdv, {$userPerms.username}!</h1>
        <div class="row">
            <div class="col-md-6 col-lg-4">
                <DashboardCard CardData={cardata1} />
            </div>
            <div class="col-md-6 col-lg-4">
                <DashboardCard CardData={cardata4} />
            </div>
            <div class="col-md-6 col-lg-4">
                <DashboardCard CardData={cardata3} />
            </div>
            <div class="col-md-6 col-lg-12">
                <DashboardCard CardData={cardata2} />
            </div>
        </div>
    </div>
</main>
<style lang="sass">
    main
        display: flex
        justify-content: center
        align-items: center
</style>
<script lang="ts">
    import DashboardCard from "./subcomponents/DashboardCard.svelte";
    import { userPerms } from "../stores";
    let cardata1:any={
    title:"Profilom",
    icon: 'person-circle',
    href: '/profile/'+$userPerms.id,
    fromColor: '#0040ff',
    toColor: '#00248f'
    }
    let cardata4:any={
    title:"Katalógus",
    icon: 'database',
    href: '/catalogue/'+ $userPerms.id,
    fromColor: '#ff0000',
    toColor: '#8f0000'
    }
    let cardata3:any={
    title:"Fórumok",
    icon: 'chat-left',
    href: '/forums',
    fromColor: '#00ff19',
    toColor: '#008f14'
    }
    let cardata2:any={
    title:"Aukciók",
    icon: 'coin',
    href: '/auctions',
    fromColor: '#ffbf00',
    toColor: '#8f4b00'
}
</script>