<script lang="ts">
    import { each } from "svelte/internal";
    import type { ModalData } from "../../../interfaces/Admin";
    import type { Statistics } from "../../../services/dbStatistics";
    import type { Banned } from "../../../services/dbUser";
    import moment from "moment";
    import { Delete } from "../../../services/dbQueries";
    import { Token } from "../../../stores";
    import ErrorAlert from "../ErrorAlert.svelte";
    export let Data:ModalData

    async function unBan(ID){
        await Delete($Token.token,"moderations","ID",ID).then(

        )
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
            {#await Data.promise}
            <div class="spinner"></div>
            {:then Statistics }
                 <ErrorAlert bind:this={err1} Error={{id:"badlogin",text:"Hibás bejeletkezési adatok!",error:true}}/>

                <table class="table table-striped table-hover">
                    <thead>
                        <th>#</th>
                        <th>Felhasználónév</th>
                        <th>E-mail</th>
                        <th>Kitiltás kezdete</th>
                        <th>Kitiltás vége</th>
                        <th>Kitiltás visszavonása</th>
                    </thead>
                    <tbody>
                        {#each Statistics as person, index}
                            <tr>
                                <td>{index+1}</td>
                                <td>{person.name}</td>
                                <td>{person.email}</td>
                                <td>{moment(person.startdate).format("YYYY-MM-DD")}</td>
                                <td>{moment(person.banTime).format("YYYY-MM-DD")}</td>
                                <td class="text-center"><button class="btn btn-warning" on:click={unBan(person.ID)}><i class="bi bi-person-check-fill"></i></button></td>
                            </tr>
                        {/each}
                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
            {/await}
          {/if}
        </div>
      </div>
    </div>
</div>
  