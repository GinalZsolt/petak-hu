<script lang="ts">
    let profile={
        picture: "/test.png",
        name: "test",
        email: "test@test.com",
        coin_list: ["test, test2", "test3"],
        auction_list: ["test", "test2"]
    }

</script>

<main>
    <div id="profile">  <!-- profile -->
        <div class="col-lg-9 mx-auto d-flex flex-row justify-content-between">  
            <div class="rounded-circle border-dark border overflow-hidden"><img class="img-fluid mx-auto" src={profile.picture} alt=""></div> <!-- profile picture-->
            <div>
                <p></p> <!-- profile name -->
                <p></p> <!-- profile email -->
            </div>
        </div>
        <div id="buttons">
            <button class="btn">chat</button> <!-- chat button -->
            <button class="btn">°°°</button> <!-- options button -->
        </div>
    </div>
    <div> <!-- katalogus -->

        <button></button> <!-- teljes katalógus megtekintése -->
    </div>
    <div> <!-- aukciók -->

    </div>
</main>

<style lang="sass">
    #profile
        display: flex
        flex-direction: row
    #Profile_pic
        width: 5vw
        height: 5vw
    #profile #buttons

    #btn
        background-color: #ea9e60


</style>