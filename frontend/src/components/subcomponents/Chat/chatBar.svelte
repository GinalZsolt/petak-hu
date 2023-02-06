<div class="user">
    <div class="rounded-circle profilepic px-1 px-md-none">
        <img src={Profile.picUrl} alt={Profile.name} class="mx-auto">
    </div>
    <p class="d-none d-md-block">{Profile.name}</p>
</div>

<style lang="sass">
    .profilepic
        img
            border-radius: 100%
            border: 1px solid var(--bs-dark)
            max-height: 100%
            width: 100%
    .user
        max-height: 100px
        display: flex
        align-items: center
        p
            margin: 0

</style>
<script lang="ts">
    export let Profile:ProfileData;
    interface ProfileData{
        name:string;
        picUrl:string;
    }
</script>