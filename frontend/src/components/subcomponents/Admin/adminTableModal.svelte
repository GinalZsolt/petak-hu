<script lang="ts">
    import type { ModalData } from "../../../interfaces/Admin";
    import type { Statistics } from "../../../services/dbStatistics";
    import type { Banned } from "../../../services/dbUser";
    export let Data:ModalData
    
</script>
<style lang="ts"></style>
<div class="modal modal-lg" tabindex="-1" id="tableModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-primary bg-gradient text-light">
          <h5 class="modal-title">Statisztika</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {#if Data}
            {#await Data.promise}
            <div class="spinner"></div>
            {:then Statistics}
              <h2>ASDAS</h2>
            {/await}
          {/if}
        </div>
      </div>
    </div>
</div>
  