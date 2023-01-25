<script lang="ts">
    import axios from "axios"
    let data:any = {}
    function login(){
        if(data.email.value==""||data.password.value=="")
        {
            document.querySelector('#emptyfields').classList.add("d-flex")
            document.querySelector('#emptyfields').classList.remove("d-none")
        }
        else
        {
            if(true)
            {
                document.querySelector('#badlogin').classList.add("d-flex")
                document.querySelector('#badlogin').classList.remove("d-none")
            }
        }
    }
    function hideThis(mit:string){
        document.querySelector('#'+mit).classList.remove("d-flex")
        document.querySelector('#'+mit).classList.add("d-none")
    }
</script>

<style lang="sass">
#loginform
    padding: 20px
    border: 1px solid black
    border-radius:0.25rem
    background-color: #ffcc95
#badlogin, #emptyfields
    display: none
</style>

<!-- Content -->
<main>
    <div id="loginform" class="col-lg-6 col-md-8 col-11 mx-auto">
        <h2>Bejelentkezés</h2>
        <div class="alert alert-danger flex-row justify-content-between" role="alert" id="badlogin">
            <div><i class="bi bi-exclamation-triangle-fill"></i> Hibás felhasználónév vagy jelszó! <i class="bi bi-exclamation-triangle-fill"></i></div>
            <button type="button" class="btn-close" on:click={()=>{hideThis("badlogin")}}></button>
        </div>    
        <div class="alert alert-danger flex-row justify-content-between" role="alert" id="emptyfields">
            <div><i class="bi bi-exclamation-triangle-fill"></i> Nincs minden mező kitöltve! <i class="bi bi-exclamation-triangle-fill"></i></div>
        <div class="alert alert-danger flex-row justify-content-between" role="alert" id="emptyfields">
            <button type="button" class="btn-close" on:click={()=>{hideThis("")}}></button>
        </div>        
        <form>
            <div class="mb-3">
              <label for="email" class="form-label">Email cím</label>
              <input type="email" bind:value={data.email} class="form-control" id="email" name="email" >
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Jelszó</label>
              <input type="password" bind:value={data.email} class="form-control" id="password" name="email">
            </div>
            <button type="button" class="btn btn-outline-secondary" on:click={login}>Bejelentkezés</button>
          </form>
    </div>
</main>
