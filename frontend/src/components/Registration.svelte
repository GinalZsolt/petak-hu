<script lang="ts">
    import axios from 'axios';
    import sha256 from 'crypto-js/sha256';
    import ErrorAlert from './subcomponents/ErrorAlert.svelte';
    let User:any = {}
    let ErrorData = {
        id: "",
        text: "",
        error: false
    };
    let err;
    let pass1:string=""
    let pass2:string=""

    function badData(string:string){
        if (string)
        {
            string = string.trim();
        }
        return string==undefined||string==""
    }
    function SetError(id:string, message:string, isError:boolean){
        ErrorData.id = id;
        ErrorData.text = message;
        ErrorData.error = isError;
        err.showError();
    }

    function Register(){
        switch (true){
            case (badData(User.name)||badData(User.fullname)||badData(User.email)||badData(pass1)||badData(pass2)):
                SetError('emptyfields', 'Nem töltöttél ki minden mezőt!', true);
                break;
            case (!User.email.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi)):
                SetError('bademail', 'Az e-mail cím formátum nem megfelelő!', true);
                break;
            case (pass1!=pass2):
                SetError('passwdmismatch', 'A jelszavak nem egyeznek!', true);
                break;
            case (!pass1.match((/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/))):
                SetError('nonsecurepasswd', 'A jelszó nem elég biztonságos!', true);
                break;
            case (!badData(User.phone)):
                User.phone.match(/\+[0-9]{11}/g) ? TryRegister() : SetError('badPhone', 'A telefonszám nem megfelelő!', true);
                break;
            default: TryRegister();
        }
    }
    function TryRegister(){
        User.passwd = sha256(pass1).toString();
        axios.post("http://localhost:8080/api/users/register",User).then(()=>{
            SetError('success', 'Sikeres regisztráció', false);
        }).catch((error)=>{
            if (error.response.status==400){
                SetError('takenemail', 'Ez az e-mail cím már foglalt!', true);
            }
        });
    }
</script>
<style lang="sass">
    $bg-card: #ffcc95
    .card-header, .card-footer
        background-color:$bg-card
    main
        display: flex
        flex-flow: column
        justify-content: center
    .card-body
        max-height: 70vh
        overflow: auto
</style>
<main>
    <form class="card mx-auto col-lg-6 col-md-9 col-11">
        <h3 class="card-header card-title">Regisztráció</h3>
        <div class="card-body">
            <h4>Fiókadatok</h4>
            <ErrorAlert bind:this={err} Error={ErrorData}/>
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
                <div id="minpass" class="form-text">Min. 8 karakter, kis és nagybetű, szám</div>
            </div>
            <div class="mb-3">
                <label for="passwdagain">Jelszó megerősítése<span class="text-danger">*</span></label>
                <input type="password" bind:value={pass2} name="passwdagain" class="form-control">
            </div>
            <span class="fw-bold text-danger">A csillaggal jelölt mezők kijelölése kötelező!</span>
            <hr>
            <h4>Kapcsolati információk</h4>
            <div class="mb-3">
                <label for="phone">Telefonszám</label>
                <input type="tel" bind:value={User.phone} name="phone" class="form-control">
                <div id="phonehelp" class="form-text">Nemzetközi forma (+36301234567)</div>
            </div>
            <div class="mb-3">
                <label for="address">Cím</label>
                <input type="text" bind:value={User.address} name="address" class="form-control">
            </div>
        </div>
        <div class="card-footer">
            <button type="button" class="btn btn-success" on:click={Register} >Regisztrálok</button>
            
        </div>
    </form>
</main>