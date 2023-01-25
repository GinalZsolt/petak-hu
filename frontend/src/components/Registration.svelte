<script lang="ts">
    import sha256 from 'crypto-js/sha256';
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
            <div class="mb-3">
                <label for="username" class="form-label">Felhasználónév<span class="text-danger">*</span></label>
                <input type="text" name="username" class="form-control">
            </div>
            <div class="mb-3">
                <label for="fullname" class="form-label">Teljes név<span class="text-danger">*</span></label>
                <input type="text" name="fullname" class="form-control">
            </div>
            <div class="mb-3">
                <label for="email">E-Mail cím<span class="text-danger">*</span></label>
                <input type="email" name="email" class="form-control">
            </div>
            <div class="mb-3">
                <label for="passwd">Jelszó<span class="text-danger">*</span></label>
                <input type="password" name="passwd" class="form-control">
            </div>
            <div class="mb-3">
                <label for="passwdagain">Jelszó megerősítése<span class="text-danger">*</span></label>
                <input type="password" name="passwdagain" class="form-control">
            </div>
            <hr>
            <h4>Kapcsolati információk</h4>
            <div class="mb-3">
                <label for="phone">Telefonszám</label>
                <input type="tel" name="phone" class="form-control">
            </div>
            <div class="mb-3">
                <label for="address">Cím</label>
                <input type="text" name="address" class="form-control">
            </div>
            <span class="fw-bold text-danger">A csillaggal jelölt mezők kijelölése kötelező!</span>
        </div>
        <div class="card-footer">
            <input type="button" class="btn btn-success" value="Regisztrálok">
        </div>
    </form>
</main>