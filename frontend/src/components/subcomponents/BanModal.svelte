<script lang="ts">

export let User:any={}

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
           
        </div>
        <div class="modal-footer d-flex justify-content-between">
            <button type="button" class="btn">Feltöltés</button>
        </div>
      </div>
    </div>
  </div>
  