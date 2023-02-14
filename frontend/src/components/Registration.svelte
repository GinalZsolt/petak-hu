<script lang="ts">
    import axios from 'axios';
    import sha256 from 'crypto-js/sha256';
    import ErrorAlert from './subcomponents/ErrorAlert.svelte';
    let User:any = {}

    let err1
    let err2
    let err3
    let err4
    let err5
    let pass1:string=""
    let pass2:string=""

    function register(){
        if(User.name==undefined||User.fullname==undefined||User.email==undefined||pass1==undefined||pass2==undefined)
        {
            err1.showError()
        }
        else
        {
            if(pass1!=pass2)
            {
                err2.showError()
            }
            else
            {
                if(!pass1.match((/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)))
                {
                    err3.showError()
                }
                else
                {
                    console.log(User)
                    User.passwd=sha256(pass1).toString()
                    axios.post("http://localhost:8080/api/users/register",User).then((res)=>{
                        err4.showError()
                    }).catch((err)=>{
                        if(err.response.status==400){
                            err5.showError();
                        }
                    })
                }
            }
            
        }
    }
    
</script>
<style lang="sass">
    $bg-card: #ffcc95
    .card-header, .card-footer
        background-color:$bg-card

</style>
<main>
    <form class="card mx-auto col-lg-6 col-md-8 col-11">
        <h3 class="card-header card-title">Regisztráció</h3>
        <div class="card-body">
            <h4>Fiókadatok</h4>
            <ErrorAlert bind:this={err1} Error={{id:"#emptyfields",text:"Nem töltöttél ki minden mezőt",error:true}}/>
            <ErrorAlert bind:this={err2} Error={{id:"#nomatch",text:"A két jelszó nem egyezik",error:true}}/>
            <ErrorAlert bind:this={err3} Error={{id:"#badpass",text:"Nem elég erős a jelszó",error:true}}/>
            <ErrorAlert bind:this={err4} Error={{id:"#success",text:"Sikeres regisztráció",error:false}}/>
            <ErrorAlert bind:this={err5} Error={{id:"#emailtaken",text:"Ez az email már foglalt",error:true}}/>
            <div class="mb-3">
                <label for="username" class="form-label">Felhasználónév<span class="text-danger">*</span></label>
                <input type="text" name="username" bind:value={User.name} class="form-control">
            </div>
            <div class="mb-3">
                <label for="fullname" class="form-label">Teljes név<span class="text-danger">*</span></label>
                <input type="text" name="fullname" bind:value={User.fullname} class="form-control">
            </div>
            <div class="mb-3">
                <label for="email">E-Mail cím<span class="text-danger">*</span></label>
                <input type="email" name="email" bind:value={User.email}  class="form-control">
            </div>
            <div class="mb-3">
                <label for="passwd">Jelszó<span class="text-danger">*</span></label>
                <input type="password" bind:value={pass1} name="passwd" class="form-control">
            </div>
            <div class="mb-3">
                <label for="passwdagain">Jelszó megerősítése<span class="text-danger">*</span></label>
                <input type="password" bind:value={pass2} name="passwdagain" class="form-control">
            </div>
            <hr>
            <h4>Kapcsolati információk</h4>
            <div class="mb-3">
                <label for="phone">Telefonszám</label>
                <input type="tel" bind:value={User.phone} name="phone" class="form-control">
            </div>
            <div class="mb-3">
                <label for="address">Cím</label>
                <input type="text" bind:value={User.address} name="address" class="form-control">
            </div>
            <span class="fw-bold text-danger">A csillaggal jelölt mezők kijelölése kötelező!</span>
        </div>
        <div class="card-footer">
            <button type="button" class="btn btn-success" on:click={register} >Regisztrálok</button>
        </div>
    </form>
</main>