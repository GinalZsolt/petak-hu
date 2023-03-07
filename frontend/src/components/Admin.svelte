<script lang="ts">
    import { onMount } from "svelte";
    import {Token} from '../stores';
    import type {ModalData} from '../interfaces/Admin';
    import { getCoinAmountStats, getCoinWorthStats } from "../services/dbStatistics";
    import AdminboardCard from "./subcomponents/Admin/AdminboardCard.svelte";
    import AdminStatisticsModal from "./subcomponents/Admin/adminStatisticsModal.svelte";
    import { GetBanned } from "../services/dbUser";
    import { Title } from "chart.js/dist";
    let statisticsModalData:ModalData;
    let TableModalData:ModalData;


    onMount(async()=>{
        console.log(await GetBanned($Token.token))
    })

    function DetermineStatistic(event){
        console.log(event.detail);
        switch(event.detail.title){
            case "Érmék": {
                statisticsModalData = {
                    promise: getCoinAmountStats($Token.token),
                    title:'Érmék'
                }
                break;
            }
            case "Érmék értéke":{
                statisticsModalData = {
                    promise: getCoinWorthStats($Token.token),
                    title:"Érmék értéke"
                }
                break;
            }
            case "Kitiltott Felhasználók":{
                TableModalData={
                    promise:GetBanned($Token.token),
                    title:"Kitiltott Felhasználók"
                }
                break;
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
                <AdminboardCard on:clicked={DetermineStatistic} CardData={{title:"Érmék",icon:"person",fromColor:"#ea9e60",toColor:"#eb6a00",modaltype:"statistics"}} />
            </div>
            <div class="col-6">
                <AdminboardCard on:clicked={DetermineStatistic} CardData={{title:"Érmék értéke",icon:"coin",fromColor:"#ea9e60",toColor:"#eb6a00",modaltype:"statistics"}} />
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <AdminboardCard on:clicked={DetermineStatistic} CardData={{title:"Kitiltott Felhasználók",icon:"person-exclamation",fromColor:"#ea9e60",toColor:"#eb6a00",modaltype:"table"}} />
            </div>
            <div class="col-6">
                <AdminboardCard on:clicked={DetermineStatistic} CardData={{title:"Aukciók",icon:"database",fromColor:"#ea9e60",toColor:"#eb6a00",modaltype:"table"}} />
            </div>
        </div>
    </div>
    <AdminStatisticsModal Data={statisticsModalData} />
</main>