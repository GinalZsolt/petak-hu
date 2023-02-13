<div 
class={visible ? "alert d-flex flex-row justify-content-between" : "d-none"}
class:alert-danger={danger}
class:alert-success={success}
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
    let danger:boolean=Error.error
    let success:boolean=!Error.error
    
</script>