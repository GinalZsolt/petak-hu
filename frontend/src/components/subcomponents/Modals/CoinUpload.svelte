<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import type { TagInterface, TagType } from "../../../interfaces/Tags";
    import {
        GetTagTypes,
        UploadCoin,
        UploadTag,
    } from "../../../services/dbCoin";
    import { Token } from "../../../stores";
    import { userPerms } from "../../../stores";
    import { UploadImages } from "../../../services/fileService";
    import ErrorAlert from "../ErrorAlert.svelte";
    const dispatch = createEventDispatcher();
    let err1,
        err2,
        err3,
        err4,
        err5;
    let tagtypes: TagType[];
    onMount(async () => {
        tagtypes = await GetTagTypes($Token.token);
    });
    let tagdel: boolean = true;
    let data: any = {};
    let newtag: TagInterface = {
        ID: 0,
        coinID: 0,
        description: "",
        name: "",
        color: "",
        categoryID: null,
    };
    let tags: TagInterface[] = [];

    function Delete(del) {
        tags.splice(
            tags.findIndex(
                (e) => e.name == del.name && e.description == del.description
            ),
            1
        );
        tags = tags;
    }

    function getname(id) {
        return tagtypes.find((e) => e.ID == id).name;
    }

    function getcolor(id) {
        return tagtypes.find((e) => e.ID == id).color;
    }

    function addTag() {
        newtag.description = newtag.description.trim();
        if (newtag.categoryID == 0 || newtag.description == "") {
            err2.showError();
        } else {
            tags = [
                ...tags,
                {
                    coinID: null,
                    description: newtag.description,
                    name: getname(newtag.categoryID),
                    color: getcolor(newtag.categoryID),
                    categoryID: newtag.categoryID,
                } as TagInterface,
            ];
            console.log(tags);
            newtag.description = "";
            newtag.categoryID = null;
        }
    }

    function missing() {
        return (
            data.name == undefined ||
            data.price == undefined ||
            data.heads == undefined ||
            data.tails == undefined ||
            data.description == undefined ||
            data.name == "" ||
            data.price <= 0 ||
            data.description == ""
        );
    }
    function TrimAll() {
        if (data.name) {
            data.name = data.name.trim();
        }
        if (data.description) {
            data.description = data.description.trim();
        }
        if (newtag.description) {
            newtag.description = newtag.description.trim();
        }
    }
    async function CoinUp() {
        TrimAll();
        if (!missing()) {
            let images = new FormData();
            images.append("head", data.heads[0]);
            images.append("tail", data.tails[0]);
            let uploadedimages = await UploadImages($Token.token, images);
            if (uploadedimages.head) {
                let Coin = {
                    name: data.name,
                    worth: data.price,
                    description: data.description,
                    userID: $userPerms.id,
                    headfile: uploadedimages.head[0].filename,
                    tailfile: uploadedimages.tail[0].filename,
                };
                let coinID = await UploadCoin(Coin, $Token.token).then(
                    (res) => res
                );
                tags.forEach(async (element) => {
                    let uploadableTag = {
                        coinID: coinID,
                        nameID: element.categoryID,
                        descID: element.description,
                    };
                    await UploadTag(
                        {
                            coinID: uploadableTag.coinID,
                            nameID: uploadableTag.nameID,
                            description: uploadableTag.descID,
                        },
                        $Token.token
                    );
                });
                data = {};
                newtagClear();
                tags = [];
                tags = tags;
                err3.showError();
                dispatch("success");
            }
            else{
                if (uploadedimages.code=="FILE_NOT_ACCEPTED"){
                    err4.showError();
                }
                if (uploadedimages.code="LIMIT_FILE_SIZE"){
                    err5.showError();
                }
            }
        } else {
            err1.showError();
        }
    }

    function newtagClear() {
        newtag.color = "";
        newtag.description = "";
        newtag.name = "";
        newtag.description = "";
    }
</script>

<!-- Modal -->
<div
    class="modal fade"
    id="CoinUpload"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
>
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                    Érme feltöltése
                </h1>
                <input
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                />
            </div>
            <div class="modal-body">
                <form action="">
                    <ErrorAlert
                        bind:this={err1}
                        Error={{
                            id: "emptyfileds",
                            text: "Nincs minden kitöltve!",
                            error: true,
                        }}
                    />
                    <ErrorAlert
                        bind:this={err3}
                        Error={{
                            id: "success",
                            text: "Sikeres feltöltés!",
                            error: false,
                        }}
                    />
                    <ErrorAlert
                    bind:this={err4}
                    Error={{
                        id:"filefail",
                        text: "A fájl típusa nem kép!",
                        error:true
                    }}
                    />
                    <ErrorAlert
                    bind:this={err5}
                    Error={{
                        id:"filefail",
                        text: "A fájl mérete túl nagy (>5MB)!",
                        error:true
                    }}
                    />
                    <div class="mb-3">
                        <label for="name" class="form-label">Érme neve</label>
                        <input
                            type="text"
                            bind:value={data.name}
                            class="form-control"
                            id="name"
                            name="name"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="description">Leírás</label>
                        <textarea
                            class="form-control"
                            bind:value={data.description}
                            id="description"
                            rows="5"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="price" class="form-label"
                            >Érme névleges értéke</label
                        >
                        <input
                            type="number"
                            bind:value={data.price}
                            class="form-control"
                            id="price"
                            name="price"
                        />
                    </div>
                    <div class="tag-creator row mb-3 col-12 mx-auto">
                        <ErrorAlert
                            bind:this={err2}
                            Error={{
                                id: "emptytag",
                                text: "Nincs minden kitöltve!",
                                error: true,
                            }}
                        />

                        <div class="col-5">
                            <label for="tagtype" class="form-label"
                                >Címke kategóriája</label
                            >
                            <select
                                bind:value={newtag.categoryID}
                                class="form-select"
                                name="tagtype"
                                id="tagtype"
                            >
                                <option selected value={null}
                                    >Válasszon...</option
                                >
                                {#if tagtypes}
                                    {#each tagtypes as tagtype}
                                        <option value={tagtype.ID}
                                            >{tagtype.name}</option
                                        >
                                    {/each}
                                {/if}
                            </select>
                        </div>
                        <div class="col-4">
                            <label for="tagcontent" class="form-label"
                                >Címke tartalma</label
                            >
                            <input
                                type="text"
                                bind:value={newtag.description}
                                class="form-control"
                                id="tagcontent"
                                name="tagcontent"
                            />
                        </div>
                        <button
                            type="button"
                            class="btn col-3"
                            on:click={addTag}>Hozzáadás</button
                        >
                    </div>
                    <div class="tag-container d-flex flex-wrap mb-3">
                        {#each tags as tag}
                            <div
                                style={"--color:" + tag.color}
                                class="tag m-auto mb-1"
                            >
                                <span>{tag.name}</span>:<span
                                    >{tag.description}</span
                                >
                                {#if tagdel}<input
                                        type="button"
                                        class="btn-close"
                                        on:click={() => {
                                            Delete(tag);
                                        }}
                                    />{/if}
                            </div>
                        {/each}
                    </div>
                    <div class=" mb-3">
                        <label for="fej">Fej:</label>
                        <input
                            class="form-control"
                            bind:files={data.heads}
                            accept="image/*"
                            name="fej"
                            type="file"
                            id="fej"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="iras">Írás:</label>
                        <input
                            class="form-control"
                            bind:files={data.tails}
                            accept="image/*"
                            name="iras"
                            type="file"
                            id="iras"
                        />
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn" on:click={CoinUp}
                    >Feltöltés</button
                >
            </div>
        </div>
    </div>
</div>

<style lang="sass">
    button
        background: #ea9e60
        border: 1px solid black
    button:hover
        background: #ea9e60
        border: 1px solid black
    textarea
        resize: none
    .tag-creator
        border: 2px solid black
        border-radius:0.25rem
        padding: 7px
    .tag
        background: var(--color)
        border-radius:0.5rem
        padding: 5px
        border: 1px solid black
    .modal-header
        background-color: #f59445
        background-image: linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))
</style>
