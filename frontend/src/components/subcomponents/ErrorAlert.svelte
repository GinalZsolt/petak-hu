<div 
    class="{visible ? "alert d-flex flex-row justify-content-between" : "d-none"}{Error.error?"alert-danger":"alert-success"}" 
    role="alert" id={Error.id}
>
    <div>{Error.text}</div>
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