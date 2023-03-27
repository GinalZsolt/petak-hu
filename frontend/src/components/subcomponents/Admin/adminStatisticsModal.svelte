<script lang="ts">
    import type { ModalData } from "../../../interfaces/Admin";
    import Chart from "./chart.svelte";
    export let Data:ModalData
    
</script>
<style lang="sass">
.modal-header
  background-color: #f59445
  background-image: linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))  
</style>
<div class="modal modal-lg" tabindex="-1" id="statisticsModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header text-light">
          <h5 class="modal-title">Statisztika</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {#if Data}
            {#await Data.promise}
            <div class="spinner"></div>
            {:then Statistics}
              <Chart Data={Statistics} />
            {/await}
          {/if}
        </div>
      </div>
    </div>
</div>
  