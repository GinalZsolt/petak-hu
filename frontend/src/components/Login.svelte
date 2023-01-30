<script lang="ts">
    import axios from "axios"
    import ErrorAlert from "./subcomponents/ErrorAlert.svelte";
    let data:any = {}
    let err1
    let err2
    function login(){

        if(data.email==undefined||data.password==undefined)
        {
            err2.showError()
        }
        else
        {
            if(true)
            {
                err1.showError()
            }
        }
    }
   
</script>

<style lang="sass">
#loginform
    padding: 20px
    border: 1px solid black
    border-radius:0.25rem
    background-color: #ffcc95
button
    background: #ea9e60
    border: 1px solid black
button:hover
    background: #ea9e60
    border: 1px solid black
</style>

<!-- Content -->
<main>
    <div id="loginform" class="col-lg-6 col-md-8 col-11 mx-auto">
        <h2>Bejelentkezés</h2>
             <ErrorAlert bind:this={err1} Error={{id:"#badlogin",text:"Hibás bejeletkezési adatok!"}}/>
             <ErrorAlert bind:this={err2} Error={{id:"#emptyfields",text:"Nem töltöttél ki minden mezőt"}}/>
        <form>
            <div class="mb-3">
              <label for="email" class="form-label">Email cím</label>
              <input type="email" bind:value={data.email} class="form-control" id="email" name="email" >
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Jelszó</label>
              <input type="password" bind:value={data.password} class="form-control" id="password" name="password">
            </div>
            <button type="button" class="btn" on:click={()=>{login()}}>Bejelentkezés</button>
          </form>
    </div>
</main>
