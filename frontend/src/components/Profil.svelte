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
        <div class="col-lg-9 d-flex flex-row tulajdonsagok">  
            <div class="rounded-circle border-dark border overflow-hidden"><img class="img-fluid mx-auto flexstart" src={profile.picture} alt=""></div> <!-- profile picture-->
            <div id="nevemail">
                <p>{profile.name}</p> <!-- profile name -->
                <p>{profile.email}</p> <!-- profile email -->
            </div>
        </div>
        <div id="buttons">
            <button class="btn">chat</button> <!-- chat button -->
            <button class="btn">°°°</button> <!-- options button -->
        </div>
    </div>
    <h2>{profile.name} katalógus</h2>
    <div class="katalogus rounded"> <!-- katalogus -->


        <button></button> <!-- teljes katalógus megtekintése -->
    </div>
    <h2>{profile.name} aukció</h2>
    <div class="katalogus rounded"> <!-- aukciók -->

    </div>
</main>

<style lang="sass">
    #profile
        display: flex
        flex-direction: row

    #Profile_pic
        width: 5vw
        height: 5vw

    .btn
        background-color: #ea9e60
    
    .katalogus
        margin: auto
        height: 20vh
        background-color: white
        border: 1px solid black
    
    .katalogusok
        margin: auto

    .tulajdonsagok
        display: flex   
        align-items: center
        margint-left: 0px

    #nevemail
        justify-self: center
        padding-left: 2vw

    main
        margin-left: 10vw
        margin-right: 10vw
    
    .flexstart
        justify-content: flex-start
    
    #profile #buttons
        justify-items: flex-end
        display: flex
        flex-direction: column
        padding-left: 15vw

    #profile #buttons button
        margin-bottom: 2vh
</style>