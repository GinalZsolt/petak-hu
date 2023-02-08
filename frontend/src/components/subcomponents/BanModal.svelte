<script lang="ts">

export let User:any={}

function Ban(){}

</script>

<!-- Modal -->
<div class="modal fade" id="CoinMod" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">{User.username} felhasználó kitiltása</h1>
          <input type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          </div>
          <div class="modal-body">
            <form action="">
              <div class="mb-3">
                <label for="username" class="form-label">Email cím</label>
                <input type="text" bind:value={User.username} class="form-control" id="username" name="username" >
              </div> 
              <div class="mb-3">
                <label for="email" class="form-label">Email cím</label>
                <input type="email" bind:value={User.email} class="form-control" id="email" name="email" >
              </div>
              <div class="mb-3">
                <label for="datum" class="form-label">Felfüggesztés lejáratának dátuma</label>
                <input type="datetime-local" bind:value={User.datum} class="form-control" id="datum" name="datum" >
              </div>
            </form>
          </div>
          <div class="modal-footer d-flex justify-content-between">
          <button type="button" on:click={Ban} class="btn">Felfüggesztés</button>
        </div>
      </div>
    </div>
  </div>
  