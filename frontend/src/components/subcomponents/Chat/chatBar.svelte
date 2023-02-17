<div class="user">
    <div class="rounded-circle profilepic p-1 px-md-none">
        <img src={Profile.picUrl} alt={Profile.name} class="mx-auto">
    </div>
    <p class={Profile.isOpen? "d-block":"d-none d-md-block"}>{Profile.name}</p>
</div>

<style lang="sass">
    .profilepic
        height: 100px
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
    .active
        background-color: blue
</style>
<script lang="ts">
    export let Profile:ProfileData;
    interface ProfileData{
        name:string;
        picUrl:string;
        isOpen:boolean;
    }
</script>