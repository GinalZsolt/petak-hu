<script lang="ts">
    import { onMount } from "svelte";
    import ErrorAlert from './subcomponents/ErrorAlert.svelte';
    import { GetUserData } from "../services/dbUser";
    import { userPerms, Token } from "../stores";
    import { Patch } from "../services/dbQueries";
    import sha256 from "crypto-js/sha256"
    import { DeleteImage, UploadImage } from "../services/fileService";
    import type { User } from "../interfaces/User";


    //On page load, get the user's profile data.
    onMount(async()=>{
        user = (await GetUserData($userPerms.id, $Token.token))[0];
    })
    
    //Used variables
    let err;
    let errormessage = {
        text: "",
        id: "",
        error: false
    };
    let user: User;
    let pass1:string=""
    let pass2:string=""
    let pfp:FileList;

    //boolean function,
    //returns true if any text is either non-existent,
    //or empty.
    function missing(data:User){
        if (data.address){
            data.address = data.address.trim();
        }
        if (data.fullname){
            data.fullname = data.fullname.trim();
        }
        if (data.name){
            data.name = data.name.trim();
        }
        return data.name==undefined
             ||data.name==""
             ||data.fullname==undefined
             ||data.fullname==""
             ||pass1==undefined
             ||pass1==""
             ||pass2==undefined
             ||pass2==""
    }

    //The alert's function.
    function setError(id:string, text:string, error:boolean){
        errormessage = {
            id: id,
            error: error,
            text: text
        };
        err.showError();
    }

    /*The function for modifying the user's data.
    * If there are empty fields, or the requirements are not met, then throw the error for the user.
    * Otherwise If the user has set a phone number, then throw the proper error for the user.
    * If everything is OK, then send the data to the backend.
    */
    function Update(data:User){
        switch (true){
            case missing(data): 
                setError('nofields', 'Nincs minden kötelező mező kitöltve!', true);
                break;
            case pass1!=pass2:
                setError('badpass', 'A jelszavak nem egyeznek!', true);
                break;
            case !pass1.match((/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)):
                setError('badsecurity', 'A jelszó nem elég biztonságos!', true);
                break;
            case data.phone!=undefined && data.phone != "":
                if (!data.phone.match(/[+][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/))
                {
                    setError('badphone', 'A telefonszám nem felel meg a formátumnak!', true);
                    break;
                }
                else {
                    TryUpdate(data);
                    break;
                }
            default: 
                TryUpdate(data);
                break;
        }
    }
    /*
    * The function for calling the backend.
    * If the user has chosen a file, then try uploading the file.
    * If it succeeds, it will try to upload the data otherwise it will upload data without the image.
    */

    async function TryUpdate(data:User){
        
        if (pfp && pfp.length>0){
            await uploadProfilePic(data);
        }
        
        user.passwd = sha256(pass1).toString();

        Patch($Token.token, 'users', 'ID', $userPerms.id, data).then(()=>{
            setError('success','Sikeres profilmódosítás', false)
        })
        .catch(()=>{
            setError('servererror','Szerverhiba történt, kérem szóljon a fejlesztőknek!', true);
        })
    }
    
    async function uploadProfilePic(data:User){
        let upload;
        await DeleteImage($Token.token, data.imagefile).then(res=>res).catch(err=>err);
            let formdata = new FormData();
            formdata.append('image', pfp[0]);
            upload = await UploadImage($Token.token, formdata);
            data.imagefile = upload.filename
            if (upload.status == 500){
                setError('fileerror', 'A fájl nem megfelelő (mérete túl nagy [>5MiB], vagy nem kép)!',true);
            }
    }
</script>
<style lang="sass">
    $bg-card: #ffcc95
    .card-header
        background-color: $bg-card
    em
        color: red
    form
        max-height: 70vh
        overflow: auto
</style>

<!-- Content -->
<main>
    {#if user}
    <div class="mt-3 col-lg-6 col-md-8 col-11 mx-auto card">
        <h2 class="card-header">Profil Módosítása</h2>
        <div class="card-body">
            <ErrorAlert bind:this={err} Error={errormessage}/>
            <form>
                <div class="mb-3">
                    <label for="username" class="form-label">Felhasználónév <em>*</em> </label>
                    <input type="text" bind:value={user.name} class="form-control" id="username" name="username" >
                </div>
                <div class="mb-3">
                    <label for="fullname" class="form-label">Teljes név <em>*</em> </label>
                    <input type="text" bind:value={user.fullname} class="form-control" id="fullname" name="fullname" >
                </div>
                  <div class="mb-3">
                    <label for="username" class="form-label">Email cím <em>*</em> </label>
                    <input type="email" disabled bind:value={user.email} class="form-control" id="email" name="email" >
                </div>
                <div class="mb-3">
                    <label for="pass1" class="form-label">Jelszó <em>*</em></label>
                    <input type="password" bind:value={pass1} class="form-control" id="pass1" name="pass1">
                    <div id="minpass" class="form-text">Min. 8 karakter, kis és nagybetű, szám</div>
                </div><div class="mb-3">
                    <label for="pass2" class="form-label">Jelszó Megerősítése<em>*</em></label>
                    <input type="password" bind:value={pass2} class="form-control" id="pass2" name="pass2">
                </div>
                <div class="mb-3">
                    <label for="file" class="form-label">Profilkép</label>
                    <input bind:files={pfp} accept="image/*" class="form-control mb-3" name="file"  type="file" id="file">
                </div>
                <p class="text-muted">A <em>*</em>-gal jelölt mezők kitöltése kötelező!</p>
                <hr>
                <div class="mb-3">
                    <label for="cim" class="form-label">Cím</label>
                    <input type="text" bind:value={user.address} class="form-control" id="address" name="address">
                </div>
                <div class="mb-3">
                    <label for="telefon" class="form-label">Telefon</label>
                    <input type="text" bind:value={user.phone} class="form-control" id="phone" name="phone">
                    <div id="phonehelp" class="form-text">Nemzetközi forma (+36301234567)</div>
                </div>
                
                
            </form>
        </div>
        <div class="card-footer">
            <button type="button" class="btn" on:click={()=>{Update(user)}}>Megerősítés</button>
        </div>
    </div>
    {/if}
</main>
