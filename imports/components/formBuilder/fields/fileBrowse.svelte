<script>
    /**
     * File input component for text or image types.
     *
     * @memberOf Components:Form
     * @function fileBrowse
     * @locus Client
     * @augments fieldWrapper
     *
     * @param {Object} field
     * @param {Object} field.params (text) - {format: "text", type: ["json", "text.*"]},
     * @param {Object} field.params (image) -   { format: "image", type: ["image.*"],
     *                                            croppie: {viewport: {width: 450, height: 150, type: 'square'} }
     *                                          }
     *
     * @emits 'on-inputentry' {value: {src, name}, error: false}
     *
     */

    //* common props from parent
    export let field = {};

    //* special case for importing large json files
    import {userLoggedIn, userExtras} from '/imports/client/systemStores'

    //* support functions
    import {documents} from '/imports/both/systemGlobals'
    import {fileReader} from '/imports/client/setup/textCommon'
    import Crop_Image from '/imports/components/widgets/croppie.svelte'
    import {getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    let formText = getContext("formText");


    //* local reactive variable
    let inValue = {};

    let icon_img = "";
    let icon_txt = "";

    let hasCroppie = !!field.params.croppie;
    let showCroppie = false;
    let showCropArea = false;

    let showModal = false;

    let showDelete = false;
    let showTxtImg = false;
    let messages = "";
    let format = "none";

    let errmsg = {
        file_too_long:   fileReader.file_too_long.replace("getImageSize", Math.round( documents.MAX_IMAGE_SIZE / 1024) ),
        file_wrong_type: fileReader.file_wrong_type,
    }

    $: setValue(field.value);



    //* functions that mutate local variables
    function setValue(val){
        inValue = val;

        messages = field.value.name;
        icon_img = field.value.src;
        showTxtImg = !!(field.value.src && field.params.format !== "image");
        format = field.params.format;
        showDelete = false;
    }

    function setfile(ev) {
        let files = ev.target.files;

        if (files.length > 0) {
            let file = files[0];

            //* basic file checks
            let isMatch = field.params.type.some(function (rx) {
                let type = RegExp(rx);
                return type.test(file.type);
            });

            if (!isMatch) {
                format = "none";
                messages = errmsg.file_wrong_type + file.type;
                return;
            }

            //* JSON files are a special case
            let processJson = file.type.includes("json") && file.size < 512 * 1024 * 1024;
            processJson = processJson && $userExtras && ($userExtras.admin || $userExtras.role._id === "administrator");

            if (!processJson && file.size > documents.MAX_IMAGE_SIZE) {
                format = "none";
                messages = errmsg.file_too_long + Math.round(file.size / 1024) + "KB";
                return;
            }

            //* get file data and maintain parent context
            format = field.params.format;
            let reader = new FileReader();

            reader.onload = () => {
                if (field.params.format === "image") {
                    showTxtImg = false;
                    icon_img = reader.result;

                } else {
                    showTxtImg = true;
                    showCroppie = false;
                }

                messages = file.name;
                inValue = {name: file.name, src: reader.result};

                dispatch('on-inputentry', {value: inValue, error: false} );
            };

            if (field.params && field.params.format) {
                (field.params.format === "image") ? reader.readAsDataURL(file) : reader.readAsText(file);
            } else {
                console.warn("Cannot read parms", field.params);
            }
        }
    }

    //* show / hide the delete file icon
    function deleteLeave() {
        showDelete = false;
    }

    //* on click of delete file icon, reset the field data
    function deleteInfo() {
        icon_img = "";
        icon_txt = "";
        showDelete = false;
        showTxtImg = false;
        messages = "";
        inValue = {name: "", src: "", size: 0};

        dispatch('on-inputentry', {value: inValue, error: false} );
    }

    function cropImage() {
        showCropArea = !showCropArea;
        showCroppie = !showCroppie;
    }

    function result(output) {
        icon_img = output.detail;
        inValue.src = output.detail;
        showCropArea = false;
        showCroppie = false;

        dispatch('on-inputentry', {value: inValue, error: false} );
    }

    function showFileImage(){
        showModal = true;
    }

    function hideModal(){
        showModal = false;
    }

</script>


<div class="field has-addons">

    <div class="control">
        <div class="button is-primary is-height-browse">
            <span class="icon-bg-folder is-medium"></span>

            <input type="file" class="input file-input add-cursor" on:input="{setfile}">
        </div>
    </div>


    <div class="control is-expanded">
        <div class="button is-height-browse is-file-name">

            <div class="w-100 d-flex justify-content-between align-items-center">
                {#if format === 'text' && showTxtImg}
                    <span class="icon-bg-file is-large"></span>
                {/if}

                {#if format === 'image'}
                    <img class="file-icon-img-src"
                         src="{icon_img}"
                         title="image file"
                         style=""
                         alt=""
                         on:click="{showFileImage}">
                {/if}

                <div class="is-message-area">{@html messages}</div>

                {#if messages}
                    <div class="icon-delete is-align-self-flex-end" on:click="{deleteInfo}">
                        <span class="icon-bg-trash is-medium"></span>
                    </div>
                {/if}
            </div>

        </div>
    </div>

    {#if hasCroppie}
        <div class="control">
            <div class="button is-primary is-height-browse is-last-item" on:click="{cropImage}">
                <span class="icon-bg-crop is-medium"></span>
            </div>
        </div>
    {/if}
</div>

{#if hasCroppie && showCroppie}
    <Crop_Image
            url="{icon_img}"
            options="{field.params && field.params.croppie ? field.params.croppie : {} }"
            on:croppie-result={result}/>
{/if}

<div class="modal {showModal ? 'is-active': ''}">
    <div class="modal-background"></div>
    <div class="modal-card">

        <header class="modal-card-head">
            <p class="modal-card-title" style="width:90%;">{messages}</p>
            <button class="delete" on:click|preventDefault="{hideModal}" aria-label="close"></button>
        </header>

        <section class="modal-card-body">
            <img class="show-modal-image" src="{icon_img}" title="" alt="">
        </section>
    </div>
</div>





<style>
    .file-icon-img-src {
        max-width: none;
        max-height: 4rem;
        cursor: pointer;
    }

    .icon-delete {
        font-size: 1rem;
        height: 1rem;
        color: #D81B60;
        cursor: pointer;
        margin-bottom: 0.5rem;
    }

    .is-height-browse {
        height: 6rem;
    }

    .is-file-name {
        width: 100%;
        cursor: default;
        text-align: left;
    }

    .is-message-area {
        width: 100%;
        height: 6rem;
        padding-left: 1rem;
        overflow: auto;
        white-space: normal;
        word-break: break-word;
    }

    .is-last-item {
        border-top-right-radius: 4px !important;
        border-bottom-right-radius: 4px !important;
    }

    .show-modal-image {
        width: 100%;
    }

</style>
