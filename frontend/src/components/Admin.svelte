<script lang="ts">
    import { onMount } from "svelte";
    import {Token} from '../stores';
    import type {ModalData} from '../interfaces/Admin';
    import { getCoinAmountStats, getCoinWorthStats } from "../services/dbStatistics";
    import AdminboardCard from "./subcomponents/Admin/AdminboardCard.svelte";
    import AdminStatisticsModal from "./subcomponents/Admin/adminStatisticsModal.svelte";
    let statisticsModalData:ModalData;
    function DetermineStatistic(event){
        switch(event.detail.title){
            case "Látogatók száma": {
                statisticsModalData = {
                    promise: getCoinAmountStats($Token.token),
                    title:'Coinis'
                }
            }
        }
    }


</script>
<style lang="sass">

</style>

<main>
    <h2>Adminisztráció</h2>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <AdminboardCard on:clicked={DetermineStatistic} CardData={{title:"Látogatók száma",icon:"person",fromColor:"#ea9e60",toColor:"#eb6a00"}} />
            </div>
            <div class="col-6">
                <AdminboardCard CardData={{title:"Érmék",icon:"coin",fromColor:"#ea9e60",toColor:"#eb6a00"}} />
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <AdminboardCard CardData={{title:"Kitiltott Felhasználók",icon:"person-exclamation",fromColor:"#ea9e60",toColor:"#eb6a00"}} />
            </div>
            <div class="col-6">
                <AdminboardCard CardData={{title:"Aukciók",icon:"database",fromColor:"#ea9e60",toColor:"#eb6a00"}} />
            </div>
        </div>
    </div>
    <AdminStatisticsModal Data={statisticsModalData} />
</main>