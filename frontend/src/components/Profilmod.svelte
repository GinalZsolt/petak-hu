<script lang="ts">
    let data:any = {}
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
        <form>
            <div class="mb-3">
                <label for="username" class="form-label">Felhasználónév <em>*</em> </label>
                <input type="text" bind:value={data.username} class="form-control" id="username" name="username" >
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
                <label for="password" class="form-label">Jelszó <em>*</em></label>
                <input type="password" bind:value={data.password} class="form-control" id="password" name="password">
            </div><div class="mb-3">
                <label for="newpassword" class="form-label">Jelszó Megerősítése<em>*</em></label>
                <input type="password" bind:value={data.newpassword} class="form-control" id="newpassword" name="newpassword">
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
            <input bind:value={data.file} class="form-control mb-3" name="file"  type="file" id="file">
            <button type="button" class="btn" on:click={()=>{}}>Megerősítés</button>
          </form>
    </div>
</main>
