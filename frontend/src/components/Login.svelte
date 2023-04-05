<script lang="ts">
    import axios from "axios"
    import ErrorAlert from "./subcomponents/ErrorAlert.svelte"
    import {Token, userPerms} from "../stores"
    import { GetPerms } from "../services/permissionGetter";
    import sha256 from 'crypto-js/sha256';


    let data:any = {}
    let error;
    let errormsg = {
        text: "",
        id: "",
        error: false
    }

    function setError(id:string, text:string, _error:boolean){
        errormsg.id = id;
        errormsg.text = text;
        errormsg.error = _error;
        error.showError();
    }
    function setToken(response){
        sessionStorage.setItem('petakhu', JSON.stringify({token:response.data.token})); 
        Token.update(token=>token = response.data);
            GetPerms($Token.token).then(data=>{
                userPerms.update(()=>data);
        });
    }
    function login(){
        if(data.email==undefined||data.passwd==undefined || data.email == "" || data.passwd == "")
        {
            setError('emptyfields', 'Nem töltött ki minden mezőt!', true);
        }
        else
        {
            let logindata={"email":data.email,"passwd":sha256(data.passwd).toString() }
            axios
            .post("http://localhost:8080/api/users/login",logindata)
                .then(res=>{
                    setToken(res);
                })
                .catch(err=>{
                    switch (err.response.status){
                        case 400:
                            setError('badcreds', 'Rossz adatok!', true);
                            break;
                        case 403:
                            setError('banned', 'Sajnos ki van tiltva!', true);
                            break;
                        }
                });
        }
    }
</script>

<style lang="sass">
#loginform
    padding: 20px
    border: 1px solid black
    border-radius:0.25rem
    background-color: #ffcc95
main
    display: flex
    flex-flow: column
    justify-content: center
</style>

<!-- Content -->
<main>
    <div id="loginform" class="col-lg-6 col-md-8 col-11 mx-auto">
        <h2>Bejelentkezés</h2>
             <ErrorAlert bind:this={error} Error={errormsg}/>
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
