<script lang="ts">
    import axios from "axios"
    import ErrorAlert from "./subcomponents/ErrorAlert.svelte"
    import {Token, userPerms} from "../stores"
    import { GetPerms } from "../services/permissionGetter";
    import { router } from "tinro";
    let data:any = {}
    let err1
    let err2
    let err3
    async function login(){
        if(data.email==undefined||data.passwd==undefined)
        {
            err2.showError();
        }
        else
        {
            axios.post("http://localhost:8080/api/users/login",data).then(res=>
            {
                sessionStorage.setItem('petakhu', JSON.stringify({token:res.data.token})); 
                Token.update(token=>token = res.data);
                GetPerms($Token.token).then(data=>{
                    userPerms.update(perms=>data);
                })
            }).catch(err=>{
                if(err.response.status==400){
                    err1.showError();
                }
                else if(err.response.status==403){
                    err3.showError();
                }
            })
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
             <ErrorAlert bind:this={err1} Error={{id:"#badlogin",text:"Hibás bejeletkezési adatok!",error:true}}/>
             <ErrorAlert bind:this={err2} Error={{id:"#emptyfields",text:"Nem töltöttél ki minden mezőt",error:true}}/>
             <ErrorAlert bind:this={err3} Error={{id:"#banneduser",text:"Ez a felhasználó ki lett tiltva",error:true}}/>
        <form>
            <div class="mb-3">
              <label for="email" class="form-label">Email cím</label>
              <input type="email" bind:value={data.email} class="form-control" id="email" name="email" >
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Jelszó</label>
              <input type="password" bind:value={data.passwd} class="form-control" id="password" name="password">
            </div>
            <button type="button" class="btn" on:click={login}>Bejelentkezés</button>
          </form>
    </div>
</main>
