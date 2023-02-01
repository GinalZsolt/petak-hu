<main>
    <div class="d-flex justify-content-between col-11 mx-auto flex-wrap">
    </div>
    <div class="col-11 mx-auto">
        <DashboardCard CardData={cardata2} />
    </div>
</main>
<script lang="ts">
    import DashboardCard from "./subcomponents/DashboardCard.svelte";
    let cardata2:any={
    title:"Aukciók",
    icon: 'coin',
    href: '/auctions',
    fromColor: '#ffbf00',
    toColor: '#8f4b00'
}
</script>