<script>
    /**
     * File input component for text or image types.
     *
     * @module fileBrowse
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {String} error - class to show a field in error
     * @param {String} className
     * @param {Object} field
     * @param {Object} field.params (text) - {format: "text", type: ["json", "text.*"]},
     * @param {Object} field.params (image) -   { format: "image", type: ["image.*"],
     *                                            croppie: {viewport: {width: 450, height: 150, type: 'square'} }
     *                                          }
     * @param fieldText {Object}
     *
     * @fires on-inputentry
     *
     */

    //* common props from parent
    export let field = {};
    export let error = {};
    export let fieldText;

    let className;
    // noinspection ReservedWordAsName
    export { className as class };

    //* special case for importing large json files
    import {userExtras} from '/imports/client/systemStores'

    //* language common text
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';

    //* support Functions
    import {documents} from '/imports/both/systemGlobals';
    import Crop_Image from '/imports/Components/widgets/croppie.svelte';
    import {getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    const label = fieldText?.label ?? "n/a";
    let fileReader = i18n( getContext("commonText") ?? field.fileReader ?? {}, "fileReader", $lang);


    //* local reactive variable
    let inValue = {};

    let icon_img = "";
    let icon_txt = "";

    let hasCroppie = !!field.params.croppie;
    let showCroppie = false;
    let showCropArea = false;

    let showModal = ".hide-modal";

    let showDelete = false;
    let showTxtImg = false;
    let messages = "";
    let format = "none";

    let errmsg = {
        file_too_long:   fileReader?.file_too_long ? fileReader.file_too_long.replace("getImageSize", Math.round( documents.MAX_IMAGE_SIZE / 1024) ) : "n/a",
        file_wrong_type: fileReader?.file_wrong_type ? fileReader.file_wrong_type : "n/a",
    }

    $: setValue(field.value);


    //* Functions that mutate local variables
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

                    if(field.params?.resizeWidth){
                        let image = new Image();

                        image.onload = async () => {
                            icon_img = resizeImage(image, field.params.resizeWidth);
                            inValue = {name: file.name, src: icon_img};

                            /**
                             * @event on-inputentry
                             * @type {object} - {value: keyValue, error: false}
                             */
                            dispatch('on-inputentry', {value: inValue, error: false} );
                        }

                        image.src = reader.result;

                    }else{
                        icon_img = reader.result;
                    }

                } else {
                    showTxtImg = true;
                    showCroppie = false;
                }

                messages = file.name;
                inValue = {name: file.name, src: icon_img};

                /**
                 * @event on-inputentry
                 * @type {object} - {value: keyValue, error: false}
                 */
                dispatch('on-inputentry', {value: inValue, error: false} );
            };

            if (field.params && field.params.format) {
                (field.params.format === "image") ? reader.readAsDataURL(file) : reader.readAsText(file);
            } else {
                console.warn("Cannot read params", field.params);
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

        /**
         * @event on-inputentry
         * @type {object} - {value: keyValue, error: false}
         */
        dispatch('on-inputentry', {value: inValue, error: false} );

        //** clear input value initial state
        const input = document.getElementById(className);
        input.value = "";
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

        /**
         * @event on-inputentry
         * @type {object} - {value: keyValue, error: false}
         */

        dispatch('on-inputentry', {value: inValue, error: false} );
    }

    function showFileImage(){
        showModal = "show-modal";
    }

    function hideModal(){
        showModal = "hide-modal";
    }

    function resizeImage(image, resizeWidth) {
        //*** use canvas element to resize the image
        const canvas = document.createElement('canvas');
        const width = image.width;
        const height = image.height;
        const ratio = height / width;
        const max_width = Math.min(width, resizeWidth ?? 400);

        canvas.width = max_width;
        canvas.height = max_width * ratio;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, max_width, max_width * ratio);
        ctx.drawImage(image, 0, 0, max_width, max_width * ratio);

        let resizedImage = canvas.toDataURL("image/jpeg");

        canvas.remove();

        return resizedImage;
    }


</script>



<div class="field--file-browse has-field-addons {className}  {field.css || ''}" id="{field.field}">

    <button type="button"  class="is-primary is-height-browse" title="{field.field}">
        <span class="icon-bg-folder is-medium"></span>

        <input id="{className}" type="file" class="input file-input" on:input="{setfile}" aria-label="load file">
    </button>

    <label class="is-height-browse is-file-name">
        <span>{label}</span>

        <span class="file-area">
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

            <span class="is-message-area">{@html messages}</span>

            {#if messages}
                <span class="has-text-danger add-cursor" on:click="{deleteInfo}">
                    <span class="icon-bg-trash is-medium"></span>
                </span>
            {/if}
        </span>
    </label>

    {#if hasCroppie}
        <button type="button" class="is-primary is-height-browse" on:click="{cropImage}" title="crop image">
            <span class="icon-bg-crop is-medium"></span>
        </button>
    {/if}
</div>

{#if hasCroppie && showCroppie}
    <Crop_Image
            url="{icon_img}"
            options="{field.params && field.params.croppie ? field.params.croppie : {} }"
            on:croppie-result={result}/>
{/if}




{#if format === 'image'}

    <div id="{'modal_' + field.field}" class="modal-overlay {showModal}">
        <div class="modal">
            <article class="modal-card">
                <header>
                    <h2>{messages}</h2>

                    <button type="button" class="delete" on:click="{hideModal}"></button>
                </header>

                <div>
                    <img class="show-modal-image" src="{icon_img}" title="" alt="inputted image">
                </div>
            </article>
        </div>
    </div>

{/if}



<style>

    .is-height-browse {
        height: 6rem;
        padding: 0;
    }

    .file-area {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        width: 100%;
    }

    .file-input {
        height: 6rem !important;
        width: 3rem;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        outline: none;
        cursor: pointer;
    }

    .file-icon-img-src {
        width: auto;
        max-height: 4rem;
        cursor: pointer;
        margin-left: 1rem;
    }

    .is-file-name {
        width: 100%;
        cursor: default;
        text-align: left;
    }

    .is-message-area {
        padding-left: 1rem;
        overflow: auto;
        white-space: normal;
        word-break: break-word;
    }

    .show-modal {
        visibility: visible;
        opacity: 1;
        position: fixed;
        z-index: 1000;
        height:auto;
    }

    .hide-modal {
        visibility: hidden;
        opacity: 0;
        position: relative;
        z-index: unset;
        height: 0;
    }

    .show-modal-image {
        width: 100%;
        object-fit: contain;
    }

</style>
