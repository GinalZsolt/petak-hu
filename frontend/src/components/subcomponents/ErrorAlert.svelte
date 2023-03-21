<div 
class="alert d-flex flex-row justify-content-between"
class:d-none={!visible}
class:alert-danger={Error.error}
class:alert-success={!Error.error}
role="alert" id={Error.id}>
    <div>{Error.text}</div>
    <button type="button" class="btn-close" on:click={()=>{hideError()}}></button>
</div> 


<script lang="ts">
    export let Error:any={}
    let visible:boolean = false
    function hideError(){
         visible = false;
    }
    export function showError(){
        visible = true;
    }
</script>