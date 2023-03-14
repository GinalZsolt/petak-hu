<script lang="ts">
    import { onMount } from "svelte";
    import ErrorAlert from './subcomponents/ErrorAlert.svelte';
    import { GetUserData } from "../services/dbUser";
    import { userPerms, Token } from "../stores";
    import { Patch } from "../services/dbQueries";
    import sha256 from "crypto-js/sha256"
    import { UploadImage } from "../services/fileService";
    let data:any={}
    onMount(async()=>{
        GetUserData($userPerms.id,$Token.token).then(res=>{
            let dt:any={}
            console.log(res)
            dt=res[0]
            console.log(dt)
            console.log(data)
            data.name=dt.name
            data.email=dt.email
            data.fullname=dt.fullname
            data.address=dt.address
            data.phone=dt.phone
        })
    })

    let err1
    let err2
    let err3
    let err4
    let err5
    let pass1:string=""
    let pass2:string=""
    let pfp

    function missing(){
        return data.name==undefined||data.name==""||data.fullname==undefined||data.fullname==""||pass1==undefined||pass1==""||pass2==undefined||pass2==""
    }

    async function Update(){
        if(missing()){
            err1.showError()
        }
        else
        {
            if(pass1!=pass2){
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
                    if(data.phone!=undefined||data.phone!=""){
                        if (!data.phone.match(/[+][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/)) {
                            err5.showError()
                        }
                        else{
                            let userdata={
                            name:data.name,
                            fullname:data.fullname,
                            phone:(data.phone==undefined||data.phone=="")?null:data.phone,
                            imagefile:null,
                            address:(data.address==undefined||data.address=="")?null:data.address,
                            passwd:sha256(pass1).toString()
                        }
                        let upload = new FormData();
                        if(pfp!=undefined)  {
                            upload.append('image', pfp[0]);
                            await UploadImage($Token.token,upload).then(res=>{
                                userdata.imagefile = res.filename
                            })
                        }
                        await Patch($Token.token,"users","ID",$userPerms.id,userdata).then(res=>{
                            err4.showError()
                        })
                        }
                    }
                    else{
                        let userdata={
                            name:data.name,
                            fullname:data.fullname,
                            phone:(data.phone==undefined||data.phone=="")?null:data.phone,
                            imagefile:null,
                            address:(data.address==undefined||data.address=="")?null:data.address,
                            passwd:sha256(pass1).toString()
                        }
                        let upload = new FormData();
                        if(pfp!=undefined)  {
                            upload.append('image', pfp[0]);
                            await UploadImage($Token.token,upload).then(res=>{
                                userdata.imagefile = res.filename
                            })
                        }
                        await Patch($Token.token,"users","ID",$userPerms.id,userdata).then(res=>{
                            err4.showError()
                        })
                    }
                }
            }
        }
    }


</script>
<style lang="sass">
    #modform
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
    em
        color: red
</style>

<!-- Content -->
<main>
    <div id="modform" class="col-lg-6 col-md-8 col-11 mx-auto">
        <h2>Profil Módosítása</h2>
        <ErrorAlert bind:this={err1} Error={{id:"emptyfields",text:"Nem töltöttél ki minden mezőt",error:true}}/>
        <ErrorAlert bind:this={err2} Error={{id:"nomatch",text:"A két jelszó nem egyezik",error:true}}/>
        <ErrorAlert bind:this={err3} Error={{id:"badpass",text:"Nem elég erős a jelszó",error:true}}/>
        <ErrorAlert bind:this={err4} Error={{id:"success",text:"Sikeres módosítás",error:false}}/>
        <ErrorAlert bind:this={err5} Error={{id:"badphone",text:"A telefonszám nem megfelelő! (+36301234567)",error:true}}/>
        <form>
            <div class="mb-3">
                <label for="username" class="form-label">Felhasználónév <em>*</em> </label>
                <input type="text" bind:value={data.name} class="form-control" id="username" name="username" >
            </div>
            <div class="mb-3">
                <label for="fullname" class="form-label">Teljes név <em>*</em> </label>
                <input type="text" bind:value={data.fullname} class="form-control" id="fullname" name="fullname" >
            </div>
              <div class="mb-3">
                <label for="username" class="form-label">Email cím <em>*</em> </label>
                <input type="email" disabled bind:value={data.email} class="form-control" id="email" name="email" >
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
                <label for="cim" class="form-label">Cím</label>
                <input type="text" bind:value={data.address} class="form-control" id="address" name="address">
            </div>
            <div class="mb-3">
                <label for="telefon" class="form-label">Telefon</label>
                <input type="text" bind:value={data.phone} class="form-control" id="phone" name="phone">
            </div>
            <p class="text-muted">A <em>*</em>-gal jelölt mezők kitöltése kötelező!</p>
            <input bind:files={pfp} accept="image/*" class="form-control mb-3" name="file"  type="file" id="file">
            <button type="button" class="btn" on:click={()=>{Update()}}>Megerősítés</button>
          </form>
    </div>
</main>
