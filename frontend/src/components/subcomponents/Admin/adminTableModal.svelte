<script lang="ts">
    import { each } from "svelte/internal";
    import type { ModalData } from "../../../interfaces/Admin";
    import type { Statistics } from "../../../services/dbStatistics";
    import { GetBanned, type Banned } from "../../../services/dbUser";
    import moment from "moment";
    import { Delete } from "../../../services/dbQueries";
    import { Token } from "../../../stores";
    import ErrorAlert from "../ErrorAlert.svelte";
    export let Data:ModalData

    let err1

    async function unBan(ID){
        await Delete($Token.token,"moderations","ID",ID).then(()=>{
          err1.showError()
          Data.promise=GetBanned($Token.token)
        })
    }

</script>
<style lang="ts"></style>
<div class="modal modal-lg" tabindex="-1" id="tableModal">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-primary bg-gradient text-light">
          <h5 class="modal-title">Statisztika</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {#if Data}
          <h2>{Data.title}</h2> 
          <ErrorAlert bind:this={err1} Error={{id:"successful_delete",text:"Sikeresen törölve!",error:false}}/>
            {#await Data.promise}
            <div class="spinner"></div>
            {:then Statistics }
            
              {#if Data.title=="Kitiltott Felhasználók"}

                {#if Statistics.length==0}
                <h3 class="text-center text-danger p-3">Nincsen kitiltott felhasználó</h3>
                {:else}
                    <table class="table table-striped table-hover">
                      <thead>
                        <tr>
                            <th>#</th>
                            <th>Felhasználónév</th>
                            <th>E-mail</th>
                            <th>Kitiltás kezdete</th>
                            <th>Kitiltás vége</th>
                            <th>Kitiltás visszavonása</th>
                          </tr>
                        </thead>
                        <tbody>
                            {#each Statistics as person, index}
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{person.name}</td>
                                    <td>{person.email}</td>
                                    <td>{moment(person.startdate).format("YYYY-MM-DD")}</td>
                                    <td>{moment(person.banTime).format("YYYY-MM-DD")}</td>
                                    <td class="text-center">
                                      <button class="btn btn-warning" on:click={()=>{unBan(person.ID)}}>
                                        <i class="bi bi-person-check-fill"></i>
                                      </button>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                       
                    </table>
                {/if}

              {:else}
              {#if Statistics.length==0}
              <h3 class="text-center text-danger p-3">Jelenleg nincsenek aukciók</h3>
              {:else}
                  <table class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Cím</th>
                        <th>Érték</th>
                        <th>Lejárat</th>
                        <th>Állapot</th>
                      </tr>
                      </thead>
                      <tbody>
                          {#each Statistics as auction, index}
                              <tr>
                                <td>{index+1}</td>
                                <td>{auction.title}</td>
                                <td>{auction.price}</td>
                                <td>{new Intl.DateTimeFormat("hu-HU").format(new Date(auction.expiration))}</td>
                                <td class:text-danger='{new Date()>new Date(auction.expiration)}'>{new Date()>new Date(auction.expiration)?"Lezárva":"Folyamatban"}</td>
                              </tr>
                          {/each}
                      </tbody>
                      
                  </table>
              {/if}
              {/if}
            {/await}
          {/if}
        </div>
      </div>
    </div>
</div>
  