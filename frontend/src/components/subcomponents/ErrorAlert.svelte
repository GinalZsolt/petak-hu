<div class={visible ? "alert alert-danger d-flex flex-row justify-content-between" : "d-none"} role="alert" id={Error.id}>
    <div><i class="bi bi-exclamation-triangle-fill"></i>{Error.text} <i class="bi bi-exclamation-triangle-fill"></i></div>
    <button type="button" class="btn-close" on:click={()=>{hideError()}}></button>
</div> 


<script lang="ts">
    function hideError(){
         visible = false;
    }
    export function showError(){
        visible = true;
    }
    let visible = false;
    export let Error:any={}
    
</script>