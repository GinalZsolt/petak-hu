<script lang="ts">
    import {userPerms} from '../stores';
</script>
<style lang="sass">
    #heading
        height: 50vh
        background: rgb(235,106,0)
        background: linear-gradient(45deg, rgba(235,106,0,1) 0%, rgba(216,140,80,1) 100%)
    h1
        font-size: 5rem
    p
        font-size: 1.25rem
    .btn-success
        background: var(--bs-success)
</style>
<main class="container-fluid">
    <div id="heading" class=" row align-items-center">
        <div>
            <h1 class="text-center">Peták.hu</h1>
            {#if $userPerms.permission==0}
                <div class="w-100">
                    <a href="/login" class="d-block w-50 mx-auto btn btn-success">Bejelentkezés <i class="bi bi-box-arrow-in-right"></i></a>
                </div>
            {/if}
        </div>
    </div>
    <div>
        <div class="row mt-3">
            <div class="col-12 col-md-6 d-flex">
                <img class="mx-auto img-fluid mb-3" src="MÉE.jpg" alt="">
            </div>
            <p class="col-12 col-md-6 my-auto">A Peták.hu egy gyújtői és aukciós oldal, melyet elsősorban a Magyar Éremgyűjtők Egyesületének tagjai számára fejlesztettünk ki. Ide minden gyűjtő feltöltheti érméit, kereshet köztük, elküldheti katalógusát ismerőseinek illetve a már meglévő érméit aukcióra bocsáthatja.  </p>
        </div>
        <hr>
        <div class="row">
            <p class="my-auto col-12 col-md-6">Az oldal könnyen kezelhető, akár telefonról is, ennek köszönhetően bármikor hozzáférhet katalógusához. Ebben segítséget nyújt az oldal tetején elhelyezett kereső sáv, melyben az érme neve és címkéi alapján is kereshet. Innen a katalógusból tudja feltöltött érméit módosítani, aukcióra bocsátani illetve törölni.</p>
            <div class="col-12 col-md-6 d-flex">
                <img class="mx-auto img-fluid" src="/pic1.png" alt="Katalógus">
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12 col-md-6 d-flex">
                <img class="img-fluid mx-auto" src="/forum.png" alt="Fórum">
            </div>
            <p class="my-auto col-12 col-md-6">Ezek mellett az oldal rendelkezik egy fórum felülettel is, ahol a tagok egymástól segítséget kérhetnek egyes érmék beazonosításában, értékenek megállapításában vagy esetleg más-más érmékkel kapcsolatos témákról is tudnak társalgást folytatni.</p>
        </div>
        <hr>
        <div class="row mb-3">
            <p class="my-auto col-12 col-md-6">Ha a felhasználók szeretnék eladni érméiket, ezt aukciók segítségével tehetik meg, amiben az oldalunk segít. Az aukciós fülön láthatják a legfrissebb aukciókat, vagy a kereső sáv segítségevel találhatják meg az általuk keresett érmét.</p>
            <div class="col-12 col-md-6 d-flex">
                <img class="img-fluid" src="/aukcio.png" alt="Aukció">
            </div>
        </div>
    </div>
</main>
<footer class="text-white bg-dark text-center py-1">Készítette: KoZiGi &copy;{new Date().getFullYear()}.</footer>