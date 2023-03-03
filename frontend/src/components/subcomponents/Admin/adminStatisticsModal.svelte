<script lang="ts">
    import type { ModalData } from "../../../interfaces/Admin";
    import type { CoinAmountStatistic, CoinWorthStatistic } from "../../../services/dbStatistics";

    
    export let Data:ModalData
    
</script>
<style lang="ts"></style>
<div class="modal modal-lg" tabindex="-1" id="statisticsModal">
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
            <p>Modal body text goes here.</p>
            {/await}
          {/if}
        </div>
      </div>
    </div>
</div>
  