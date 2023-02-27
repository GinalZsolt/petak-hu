<main>
    <div class="d-flex justify-content-between col-11 mx-auto flex-wrap">
    </div>
    <div class="col-11 mx-auto">
        <h1>Üdv, {user}!</h1>
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
<script lang="ts">
    import DashboardCard from "./subcomponents/DashboardCard.svelte";
    import { userPerms,Token} from "../stores";
    import { GetUserData } from "../services/dbUser";
    import { onMount } from "svelte";
    let user = "";
    onMount(async ()=>{
        await GetUserData($userPerms.id,$Token.token).then((res)=>{
            user=res[0].name
        })
    })
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