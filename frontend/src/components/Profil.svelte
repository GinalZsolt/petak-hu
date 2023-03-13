<script lang="ts">
    import { GetUserProfile } from "../services/dbUser";
    import { Token,userPerms } from '../stores';
    import ProfileCard from "./subcomponents/profileCard.svelte";
    export let ID;
    import {Patch} from "../services/dbQueries";
    import BanModal from "./subcomponents/BanModal.svelte";
    import ErrorAlert from "./subcomponents/ErrorAlert.svelte";

    let profile = GetUserProfile(ID, $Token.token);

    let err1
    let err2

    function Promote(){
    if ($userPerms.permission!=2) {
      Patch($Token.token,"users","ID",ID,{permission:"2"}).then((res)=>{
        err1.showError()
      })
    }
    else{
      err2.showError()
    }
  }

</script>


<main>
  
  <div class="col-lg-7 col-md-9 col-11 mx-auto">
    {#await profile}
    <div class="spinner-border"></div>
    {:then ProfileData}
      <BanModal User={ProfileData.user} />
      <ErrorAlert bind:this={err1} Error={{id:"promoted",text:"Sikeres Promoció!",error:false}}/>
      <ErrorAlert bind:this={err2} Error={{id:"promoted",text:"Ez a felhasználó már admin!",error:true}}/>
      <div class="profileheader mt-5">
        <div class="d-flex flex-row flex-wrap justify-content-between align-items-end">
          <div>
            <div class="profileimage rounded-circle">
              {#if ProfileData.user.imagefile!=null}
              <img src={'http://localhost:8080/img/'+ProfileData.user.imagefile} alt="" class="img-fluid">
              {:else}
              <img src="/tempProfile.jpg" alt="" class="img-fluid">
              {/if}
            </div>
            <h3 class="mb-0 mt-3">{ProfileData.user.name}</h3>
            <h4 class="text-muted mb-0">{ProfileData.user.email}</h4>
          </div>

          {#if ID!=$userPerms.id&&$userPerms.permission==2}
          <div class="dropdown">
            <button class="btn" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi-three-dots"></i></button> <!-- options button -->
            <ul class="dropdown-menu">
              <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#Ban">Kitiltás</button></li>
              <li><button class="dropdown-item" on:click={()=>{Promote()}}>Adminokhoz adás</button></li>
            </ul>
          </div>
          {/if}

        </div>
      </div>
      <hr>
      <h3>{ProfileData.user.name} zsetonjai</h3>
      <div class="coins mb-3">
          <div class="d-flex flex-row justify-content-between">
            {#if ProfileData.coins[0]}
              <ProfileCard coin={ProfileData.coins[0]} />
            {:else}
              <ProfileCard/>
            {/if}
            {#if ProfileData.coins[1]}
              <ProfileCard coin={ProfileData.coins[1]} />
            {:else}
              <ProfileCard />
            {/if}
            {#if ProfileData.coins[2]}
              <ProfileCard coin={ProfileData.coins[2]} />
            {:else}
              <ProfileCard />
            {/if}
          </div>
          <a class="btn" id="catalogueBtn" href={`/catalogue/${ProfileData.user.ID}`}>Teljes érmekatalógus megtekintése</a>
      </div>
      <h3>{ProfileData.user.name} aukciói</h3>
      <div class="auctions">
        {#each Array(Math.ceil(ProfileData.auctions.length/3)) as auction, i}
          <ProfileCard auction={ProfileData.auctions[i]} coin={ProfileData.coins.find(e=>e.ID==ProfileData.auctions[i].coinID)} />
        {/each}
      </div>
    {/await}
    
</main>


<style lang="sass">
  h3, h4
    cursor: default
  .auctions, .coins
    border: 1px solid black
    padding: 1rem
    border-radius: 0.25rem
  .img-fluid
    height: auto
    width: 100%
  .profileimage
    height: 150px
    width: 150px
    overflow: hidden
    border: 1px solid black
  .btn
    background-color: #f59445
    border: 0
  .btn:hover
    background-color: #f59445e0
    border: 0
  .btn:active
    background-color: #f59445
    box-shadow: 0 0 0 0.2rem #f594457f
    border: 0
  #catalogueBtn
    margin-top: 1rem
  #interactionbtn
    height: 100%
</style>